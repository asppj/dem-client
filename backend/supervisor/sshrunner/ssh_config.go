package cmdrunner

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path"
	"strings"
)

type sshConf struct {
	Host           string
	HostName       string
	User           string
	Password       string
	Port           string
	IdentityFile   string
	IdentitiesOnly string
}

const sshConfigPath = "~/.ssh/config"

func newSSHConf(conf map[string]string) (p sshConf, err error) {
	p.Port = "22" // 默认值
	b, err := json.Marshal(conf)
	if err != nil {
		return
	}
	err = json.Unmarshal(b, &p)
	return
}

func ReadFile(filePath string) ([]byte, error) {
	if strings.HasPrefix(filePath, "~") {
		home, err := os.UserHomeDir()
		if err != nil {
			return nil, fmt.Errorf("get home failed:%v", err.Error())
		}
		filePath = strings.Replace(filePath, "~", home, 1)
	}
	if !path.IsAbs(filePath) {
		return nil, fmt.Errorf("请使用绝对路径")
	}
	return ioutil.ReadFile(filePath)
}

func parseSSHConf(filePath string) (map[string]sshConf, error) {
	const argLen = 2
	p := make(map[string]sshConf)
	content, err := ReadFile(filePath)
	if err != nil {
		return p, fmt.Errorf("open %s falied :%v", filePath, err)
	}
	hostConf := make(map[string]string)
	addFunc := func(m map[string]string) error {
		if host, ok := m["Host"]; ok {
			conf, errLine := newSSHConf(m)
			if errLine != nil {
				return errLine
			}
			p[host] = conf
		}
		return nil
	}
	for i, line := range strings.Split(string(content), "\n") {
		if line = strings.TrimSpace(line); line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		args := strings.SplitN(line, " ", argLen)

		if len(args) != argLen {
			return nil, fmt.Errorf("file > %s line %d 格式错误", filePath, i+1)
		}
		if args[0] == "Host" {
			err = addFunc(hostConf)
			if err != nil {
				return p, err
			}
			hostConf = make(map[string]string)
		}
		hostConf[args[0]] = args[1]
	}
	err = addFunc(hostConf)
	if err != nil {
		return p, err
	}
	return p, err
}
