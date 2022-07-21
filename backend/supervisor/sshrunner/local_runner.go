package cmdrunner

import (
	"os"
	"os/exec"
)

type LocalRunner struct {
}

func NewLocalRunner() (*LocalRunner, error) {
	return &LocalRunner{}, nil
}

func (s *LocalRunner) Close() error {
	return nil
}

func (s *LocalRunner) RunShell(shell string) (string, error) {
	cmd := exec.Command("bash", shell)
	cmd.Stderr, cmd.Stdin = os.Stderr, os.Stdin
	out, err := cmd.Output()
	return string(out), err
}
func (s *LocalRunner) ReadFile(path string) (string, error) {
	out, err := ReadFile(path)
	return string(out), err
}
func (s *LocalRunner) ExistFile(path string) (bool, error) {
	_, err := os.Stat(path)
	if err != nil {
		if os.IsNotExist(err) {
			return false, nil
		}
		return false, err
	}
	return true, nil
}
