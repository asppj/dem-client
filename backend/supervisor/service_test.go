package supervisor

import "testing"

func TestServiceLoadConf(t *testing.T) {
	s := NewService()
	confFiles := s.LoadConf()
	t.Logf("Load:%+v", confFiles)
	for _, confFile := range confFiles {
		projects, err := s.Projects(confFile)
		if err != nil {
			t.Fatal(err)
			return
		}
		t.Logf("Projects:%+v", projects)
		for _, project := range projects.Supervisor {
			cmd, err := ParseCmd(project, projects.AppCommand.Status)
			if err != nil {
				t.Fatal(err)
				return
			}
			out, err := s.RunCmd(project.Project, project.Hosts, cmd)
			if err != nil {
				t.Fatal(err)
				return
			}
			t.Logf("执行结果：%+v", out)
		}
	}
}
