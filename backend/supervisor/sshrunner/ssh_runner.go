package cmdrunner

import (
	"sync"
)

type SSHRunner struct {
	hostName string
	once     sync.Once
	remote   *RemoteSSH
}

func NewSSHRunner(hostName string) (*SSHRunner, error) {
	r := &SSHRunner{
		hostName: hostName,
	}
	if err := r.init(); err != nil {
		return r, err
	}
	return r, nil
}

func (s *SSHRunner) init() (err error) {
	if s.remote != nil {
		return nil
	}
	s.once.Do(func() {
		r, e := NewSSHByConf(s.hostName)
		if e != nil {
			err = e
			return
		}
		s.remote = r
	})
	return nil
}

func (s *SSHRunner) Close() error {
	if s == nil || s.remote == nil {
		return nil
	}
	return s.remote.Close()
}

func (s *SSHRunner) RunShell(shell string) ([]byte, error) {
	return s.remote.RemoteRun(shell)
}
func (s *SSHRunner) ReadFile(path string) ([]byte, error) {
	panic(nil)
}
func (s *SSHRunner) ExistFile(path string) (bool, error) {
	panic(nil)
}
