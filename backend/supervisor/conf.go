package supervisor

type (
	CtlConf struct {
		Project   string   `json:"project"` // 项目名
		SecretKey string   `json:"secret_key"`
		Hosts     []string `json:"host" valid:"required"`
		TailLog   string   `json:"tailLog" default:"sudo supervisorctl tail -f {{.project}}"`
		RunLog    string   `json:"runLog" default:"tail -f /mnt/log/{{.project}}/app.log"`
		Restart   string   `json:"restart" default:"sudo supervisorctl restart {{.project}}"`
		Stop      string   `json:"stop" default:"sudo supervisorctl stop {{.project}}"`
		Start     string   `json:"start" default:"sudo supervisorctl start {{.project}}"`
		DryRun    string   `json:"dryRun" default:"/var/{{.project}}/{{.project}} -c /var/{{.project}}/config.yaml -d"`
	}

	Projects struct {
		Supervisor []CtlConf `json:"supervisor"`
	}
)
