package cmdrunner

type ShellRunner interface {
	RunShell(shell string) (string, error)
	ReadFile(path string) (string, error)
	ExistFile(path string) (bool, error)
	Close() error
}

func NewRunner(hostName string) (ShellRunner, error) {
	if hostName != "" {
		return NewSSHRunner(hostName)
	}
	return NewLocalRunner()
}
