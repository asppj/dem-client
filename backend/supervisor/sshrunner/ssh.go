package cmdrunner

import (
	"fmt"
	"net"
	"strings"
	"time"

	"golang.org/x/crypto/ssh"
)

type RemoteSSH struct {
	remote *ssh.Client
}

func secureHostKey() ssh.HostKeyCallback {
	return func(hostname string, remote net.Addr, key ssh.PublicKey) error {
		return nil
	}
}
func NewSSH(hostname, port, username, password, sshPrivateRsa string) (*RemoteSSH, error) {
	config := &ssh.ClientConfig{
		Timeout:         3 * time.Second, // ssh 连接time out 时间一秒钟, 如果ssh验证错误 会在一秒内返回
		User:            username,
		HostKeyCallback: secureHostKey(), // 自定义校验
		// HostKeyCallback: hostKeyCallBackFunc(h.Host),
	}
	if password != "" {
		config.Auth = []ssh.AuthMethod{ssh.Password(password)}
	} else {
		signer, err := ssh.ParsePrivateKey([]byte(sshPrivateRsa))
		if err != nil {
			return nil, err
		}
		config.Auth = []ssh.AuthMethod{ssh.PublicKeys(signer)}
	}

	// dial 获取ssh client
	addr := fmt.Sprintf("%s:%s", hostname, port)
	sshClient, err := ssh.Dial("tcp", addr, config)
	if err != nil {
		return nil, err
	}
	return &RemoteSSH{
		remote: sshClient,
	}, nil
}

func NewSSHByConf(host string) (c *RemoteSSH, err error) {
	mc, err := parseSSHConf(sshConfigPath)
	if err != nil {
		return
	}
	conf, ok := mc[host]
	if !ok {
		return nil, fmt.Errorf("file > %s 没有找到 %s", sshConfigPath, host)
	}
	rsa, err := ReadFile(conf.IdentityFile)
	if err != nil {
		return nil, fmt.Errorf("read %s failed:%v", conf.IdentityFile, err.Error())
	}
	return NewSSH(conf.HostName, conf.Port, conf.User, conf.Password, string(rsa))
}

func (s *RemoteSSH) Close() error {
	if s == nil || s.remote == nil {
		return nil
	}
	return s.remote.Close()
}

func (s *RemoteSSH) RemoteRun(cmd string) ([]byte, error) {
	// 创建ssh-session
	session, err := s.remote.NewSession()
	if err != nil {
		return nil, err
	}
	defer session.Close()
	// 执行远程命令
	combo, err := session.CombinedOutput(cmd)
	if err != nil {
		return nil, err
	}
	return combo, nil
}

// ExistFile 判断远程文件存在
func (s *RemoteSSH) ExistFile(filePath string) (bool, error) {
	out, err := s.RemoteRun(fmt.Sprintf("ls -l %s", filePath))
	if err != nil {
		return false, err
	}
	if out != nil {
		if strings.HasPrefix(string(out), "-") {
			return true, nil
		}
		return true, fmt.Errorf(string(out))
	}
	return false, nil
}

// ExistDir 判断文件夹存在
func (s *RemoteSSH) ExistDir(dirPath string) (bool, error) {
	out, err := s.RemoteRun(fmt.Sprintf("ls -l %s", dirPath))
	if err != nil {
		return false, err
	}
	if out != nil {
		if strings.HasPrefix(string(out), "d") {
			return true, nil
		}
		return true, fmt.Errorf(string(out))
	}
	return false, nil
}

const (
	createDirSh = `#!/bin/bash
set -e
if [ ! -d %s ];then
	mkdir -r %s
fi
`
	createFileSh = `#!/bin/bash
set -e
if [ ! -f %s ];then
	touch %s
	cat > %s <<EOF
%s
EOF
fi`
	readFileSh = `#!/bin/bash
set -e
if [ -f %s ];then
	for  i  in  $(cat %s)
	do
		echo $i
	done
fi
`
	replaceFileSh = `#!/bin/bash
set -e
if [ ! -f %s ]; then
 touch %s
fi
cat > %s <<EOF
%s
EOF
`
	hasCmdSh = `#!/bin/bash
set -e
if [ -x $(command -v %s)];then
	echo 1
	return
fi
echo 0
`
	statusSh  = `sudo supervisorctl status %s`
	startSh   = `sudo supervisorctl start %s`
	stopSh    = `sudo supervisorctl stop %s`
	restartSh = `sudo supervisorctl restart %s`
	updateSh  = `sudo supervisorctl update`
)

func (s *RemoteSSH) CreateDir(dirPath string) error {
	sh := fmt.Sprintf(createDirSh, dirPath, dirPath)
	Doing(sh)
	out, err := s.RemoteRun(sh)
	if err != nil {
		return err
	}
	Success(string(out))
	return nil
}

func (s *RemoteSSH) CreateFile(filePath, content string) error {
	sh := fmt.Sprintf(createFileSh, filePath, filePath, filePath, content)
	Doing(sh)
	out, err := s.RemoteRun(sh)
	if err != nil {
		return err
	}
	Success(string(out))
	return nil
}

// ReadFile 不适合大文件读取
func (s *RemoteSSH) ReadFile(filePath string) ([]byte, error) {
	// 创建ssh-session
	session, err := s.remote.NewSession()
	if err != nil {
		return nil, err
	}
	defer session.Close()

	cmd := fmt.Sprintf(readFileSh, filePath, filePath)
	out, err := session.CombinedOutput(cmd)

	return out, err
}

// ReplaceFile 不存在就创建
func (s *RemoteSSH) ReplaceFile(filePath, content string) error {
	cmd := fmt.Sprintf(replaceFileSh, filePath, filePath, filePath, content)
	out, err := s.RemoteRun(cmd)
	if err != nil {
		return err
	}
	Success(string(out))
	return nil
}

func (s *RemoteSSH) HasCmd(action string) (bool, error) {
	cmd := fmt.Sprintf(hasCmdSh, action)
	out, err := s.RemoteRun(cmd)
	if err != nil {
		return false, err
	}
	if strings.TrimSpace(string(out)) == "1" {
		// Success("已安装：%s 命令", action)
		return true, nil
	}
	Failed("未安装命令:%s", action)
	return false, nil
}

func (s *RemoteSSH) CtlStatus(program string) (string, error) {
	cmd := fmt.Sprintf(statusSh, program)
	b, err := s.RemoteRun(cmd)
	if err != nil {
		return "", err
	}
	return string(b), err
}

func (s *RemoteSSH) CtlStart(program string) (string, error) {
	cmd := fmt.Sprintf(startSh, program)
	b, err := s.RemoteRun(cmd)
	if err != nil {
		return "", err
	}
	return string(b), err
}

func (s *RemoteSSH) CtlStop(program string) (string, error) {
	cmd := fmt.Sprintf(stopSh, program)
	b, err := s.RemoteRun(cmd)
	if err != nil {
		return "", err
	}
	return string(b), err
}
func (s *RemoteSSH) CtlRestart(program string) (string, error) {
	cmd := fmt.Sprintf(restartSh, program)
	b, err := s.RemoteRun(cmd)
	if err != nil {
		return "", err
	}
	return string(b), err
}
func (s *RemoteSSH) CtlUpdate() (string, error) {
	b, err := s.RemoteRun(updateSh)
	if err != nil {
		return "", err
	}
	return string(b), err
}
