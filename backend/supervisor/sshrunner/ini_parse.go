package cmdrunner

import (
	"gopkg.in/ini.v1"
)

type IniParser struct {
	confFile *ini.File // config reader
}

type IniParserError struct {
	errorInfo string
}

func NewIniParse(content string) (*IniParser, error) {
	p := &IniParser{}
	err := p.Load(content)
	return p, err
}
func (e *IniParserError) Error() string { return e.errorInfo }

func (p *IniParser) Load(content string) error {
	conf, err := ini.Load(content)
	if err != nil {
		p.confFile = nil
		return err
	}
	p.confFile = conf
	return nil
}

func (p *IniParser) GetString(section, key string) string {
	if p.confFile == nil {
		return ""
	}

	s := p.confFile.Section(section)
	if s == nil {
		return ""
	}

	return s.Key(key).String()
}

func (p *IniParser) GetInt32(section, key string) int32 {
	if p.confFile == nil {
		return 0
	}

	s := p.confFile.Section(section)
	if s == nil {
		return 0
	}

	v, _ := s.Key(key).Int()

	return int32(v)
}

func (p *IniParser) GetUint32(section, key string) uint32 {
	if p.confFile == nil {
		return 0
	}
	s := p.confFile.Section(section)
	if s == nil {
		return 0
	}

	v, _ := s.Key(key).Uint()

	return uint32(v)
}

func (p *IniParser) GetInt64(section, key string) int64 {
	if p.confFile == nil {
		return 0
	}

	s := p.confFile.Section(section)
	if s == nil {
		return 0
	}

	v, _ := s.Key(key).Int64()
	return v
}

func (p *IniParser) GetUint64(section, key string) uint64 {
	if p.confFile == nil {
		return 0
	}

	s := p.confFile.Section(section)
	if s == nil {
		return 0
	}

	v, _ := s.Key(key).Uint64()
	return v
}

func (p *IniParser) GetFloat32(section, key string) float32 {
	if p.confFile == nil {
		return 0
	}

	s := p.confFile.Section(section)
	if s == nil {
		return 0
	}

	v, _ := s.Key(key).Float64()
	return float32(v)
}

func (p *IniParser) GetFloat64(section, key string) float64 {
	if p.confFile == nil {
		return 0
	}

	s := p.confFile.Section(section)
	if s == nil {
		return 0
	}

	v, _ := s.Key(key).Float64()
	return v
}

func (p *IniParser) Sections() []*ini.Section {
	return p.confFile.Sections()
}
