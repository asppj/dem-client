package supervisor

import (
	"context"

	"github.com/wailsapp/wails/v2/pkg/logger"
)

type Service struct {
	ctx    context.Context
	logger logger.Logger
}

func NewService() *Service {
	return &Service{ctx: context.Background(), logger: logger.NewDefaultLogger()}
}

func (s *Service) LoadConf() {
	s.logger.Print("Loading")
}
