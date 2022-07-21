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

func (s *SSHRunner) RunShell(shell string) (string, error) {
	out, err := s.remote.RemoteRun(shell)
	return string(out), err
}
func (s *SSHRunner) ReadFile(path string) (string, error) {
	out, err := s.remote.ReadFile(path)
	return string(out), err
}
func (s *SSHRunner) ExistFile(path string) (bool, error) {
	return s.remote.ExistFile(path)
}
