package cmdrunner

import (
	"testing"
	"time"
)

var (
	sshHost     = "ww.asppj.top"
	sshUser     = "root"
	sshPassword = ""
	// sshType     = "key"           // password 或者 key
	sshKeyPath = "~/.ssh/id_rsa" // ssh id_rsa.id 路径"
	sshPort    = "22"
)

func TestSSH(t *testing.T) {
	b, err := ReadFile(sshKeyPath)
	if err != nil {
		panic(err)
	}
	executor, err := NewSSH(sshHost, sshPort, sshUser, sshPassword, string(b))
	if err != nil {
		panic(err)
	}
	defer executor.Close()
	out, err := executor.ExistFile("/root/.viminfo")
	if err != nil {
		panic(err)
	}
	t.Log(out)
	err = executor.CreateFile("/root/remote-ssh.test", time.Now().Format("2006-01-02 15:04:05"))
	t.Log(err)
}

func TestCmdRunner(t *testing.T) {
	// sh := "uname -a"
	sh := "sudo supervisorctl status "
	cases := []string{
		"appserver-develop",
		"ali",
	}

	for _, hostName := range cases {
		host, err := NewRunner(hostName)
		if err != nil {
			t.Error(err)
			return
		}
		b, err := host.RunShell(sh)
		if err != nil {
			t.Error(err)
			return
		}
		Success("%s:%s\n", hostName, b)
		ok, err := host.ExistFile("/var/prometheus/prometheus")
		if err != nil {
			t.Error(err)
			return
		}
		Success("%s: 文件是否存在：%v\n", hostName, ok)
	}
}
