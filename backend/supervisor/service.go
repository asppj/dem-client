package supervisor

import (
	"context"
	"fmt"
	"path"

	"github.com/asppj/dem-client/backend"
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

func (s *Service) Projects(confFile string) (Projects, error) {
	if !path.IsAbs(confFile) {
		var err error
		confFile, err = backend.AbsPath(confFile)
		if err != nil {
			return Projects{}, err
		}
	}
	tagOption := goconfig.NewSampleTagOption()
	tagOption.IDTag = "yaml"
	c := Projects{}
	err := goconfig.Load(&c, goconfig.Conf{
		FileDefaultFilename: confFile,
		FlagDisable:         true, // 禁用命令行参数
		EnvDisable:          true,
		TagOption:           tagOption,
	})
	if err != nil {
		s.logger.Error(fmt.Sprintf("load server file [%s] error: %v", confFile, err))
		return c, err
	}
	v := validator.New()
	if err = v.Struct(c); err != nil {
		s.logger.Error(fmt.Sprintf("validate server file [%s] error: %v", confFile, err))
		return c, err
	}
	return c, nil
}

func (s *Service) RunCmd(project string, hosts []string, ctl string) (out []string, err error) {
	defer func() {
		if e := recover(); e != nil {
			err = fmt.Errorf("recover:%+v:params:[%v,%v,%v]", e, project, hosts, ctl)
		}
	}()
	cmd, err := ParseCtl(project, ctl)
	if err != nil {
		return out, err
	}
	for i, host := range hosts {
		s.logger.Print(fmt.Sprintf(" %d/%d 项目：%s, host:%s, 执行命令：%s", i+1, len(hosts), project, host, cmd))
		ou, err := runShell(host, cmd)
		if err != nil {
			return out, err
		}
		out = append(out, ou)
	}
	return out, nil
}

func runShell(host, cmd string) (out string, err error) {
	runner, err := cmdrunner.NewRunner(host)
	if err != nil {
		return out, err
	}
	defer runner.Close()
	out, err = runner.RunShell(cmd)
	if err != nil {
		return out, err
	}
	return out, nil
}
