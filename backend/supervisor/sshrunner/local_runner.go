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

func (s *LocalRunner) RunShell(shell string) ([]byte, error) {
	cmd := exec.Command("bash", shell)
	cmd.Stderr, cmd.Stdin = os.Stderr, os.Stdin
	return cmd.Output()
}
func (s *LocalRunner) ReadFile(path string) ([]byte, error) {
	return ReadFile(path)
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
