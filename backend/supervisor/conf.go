package supervisor

import (
	"bytes"
	"io"
	"os/exec"
)

type (
	CtlConf struct {
		Project string `json:"project"` // 项目名
		TailLog string `json:"tailLog" default:"sudo supervisorctl tail -f {{.project}}"`
		RunLog  string `json:"runLog" default:"tail -f /mnt/log/{{.project}}/app.log"`
		Restart string `json:"restart" default:"sudo supervisorctl restart {{.project}}"`
		Stop    string `json:"stop" default:"sudo supervisorctl stop {{.project}}"`
		Start   string `json:"start" default:"sudo supervisorctl start {{.project}}"`
		DryRun  string `json:"dryRun" default:"/var/{{.project}}/{{.project}} -c /var/{{.project}}/config.yaml -d"`
	}

	Projects struct {
		Supervisor []CtlConf `json:"supervisor"`
	}
)

func (CtlConf) RunCtl(ctl string) (out io.ReadCloser, err error) {
	buf := make([]byte, 1024)
	buff := bytes.NewBuffer(buf)
	cmd := exec.Command("openssl", opts...)
	cmd.Stdout, cmd.Stderr, cmd.Stdin = buff, buff, buff
}
