package supervisor

import (
	"bytes"
	"text/template"
)

type (
	CtlConf struct {
		TailLog string `yaml:"tailLog" default:"sudo supervisorctl tail  {{.Project}}"`
		RunLog  string `yaml:"runLog" default:"sudo tail /mnt/log/{{.Project}}/app.log"`
		Status  string `yaml:"status" default:"sudo supervisorctl status {{.Project}}"`
		Restart string `yaml:"restart" default:"sudo supervisorctl restart {{.Project}}"`
		Stop    string `yaml:"stop" default:"sudo supervisorctl stop {{.Project}}"`
		Start   string `yaml:"start" default:"sudo supervisorctl start {{.Project}}"`
		DryRun  string `yaml:"dryRun" default:"cd /var/{{.Project}}/ && sudo /var/{{.Project}}/{{.Project}} -c /var/{{.Project}}/config.yaml -d"`
		Version string `yaml:"version" default:"/var/{{.Project}}/{{.Project}} -v"`
	}
	Project struct {
		Project   string   `yaml:"project"  json:"project"` // 项目名
		SecretKey string   `yaml:"secret_key" json:"secret_key"`
		Hosts     []string `json:"hosts" yaml:"hosts"`
	}
	Projects struct {
		Supervisor []Project `yaml:"supervisor" json:"supervisor"`
		App        string    `yaml:"app" json:"app" default:"dem"`
		AppCommand CtlConf   `yaml:"appCommand" json:"appCommand"`
	}
)

func ParseCtl(project string, ctl string) (cmd string, err error) {
	return ParseCmd(Project{Project: project}, ctl)
}

func ParseCmd(project Project, ctl string) (cmd string, err error) {
	tmpl, err := template.New("demo1").Parse(ctl)
	if err != nil {
		return "", err
	}
	buf := make([]byte, 0, 1024)
	buff := bytes.NewBuffer(buf)
	err = tmpl.Execute(buff, project)
	if err != nil {
		return "", err
	}
	return buff.String(), nil
}
