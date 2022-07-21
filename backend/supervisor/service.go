package supervisor

import (
	"context"
	"fmt"

	cmdrunner "github.com/asppj/dem-client/backend/supervisor/sshrunner"
	"github.com/asppj/goconfig"
	"github.com/go-playground/validator/v10"
	"github.com/wailsapp/wails/v2/pkg/logger"
)

var (
	projectDem = []string{
		"~/.dem/appserver.prod.yaml",
		"~/.dem/appserver.dev.yaml",
	}
)

type Service struct {
	ctx      context.Context
	logger   logger.Logger
	projects Projects
}

func NewService() *Service {
	return &Service{ctx: context.Background(), logger: logger.NewDefaultLogger()}
}

// LoadConf 返回配置文件
func (s *Service) LoadConf() []string {
	return projectDem
}

func (s *Service) Projects(confFile string) ([]CtlConf, error) {
	tagOption := goconfig.NewSampleTagOption()
	tagOption.IDTag = "yaml"
	c := &Projects{}
	err := goconfig.Load(c, goconfig.Conf{
		FileDefaultFilename: confFile,
		FlagDisable:         true, // 禁用命令行参数
		TagOption:           tagOption,
	})
	if err != nil {
		panic(fmt.Errorf("load server file [%s] error: %v", confFile, err))
	}
	v := validator.New()
	if err = v.Struct(c); err != nil {
		panic(fmt.Errorf("validate server file [%s] error: %v", confFile, err))
	}
	return c.Supervisor, nil
}

func (s *Service) RunCmd(project string, hosts []string, cmd string) (out []string, err error) {
	for i, host := range hosts {
		s.logger.Print(fmt.Sprintf(" %d/%d 项目：%s, host:%s, 执行命令：%s", i+1, len(hosts), project, host, cmd))
		runner, err := cmdrunner.NewRunner(host)
		if err != nil {
			return out, err
		}
		ou, err := runner.RunShell(cmd)
		if err != nil {
			return out, err
		}
		out = append(out, ou)
	}
	return out, nil
}
