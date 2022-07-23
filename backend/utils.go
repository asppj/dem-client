package backend

import (
	"github.com/mitchellh/go-homedir"
)

func init() {
	homedir.DisableCache = false
}

func AbsPath(path string) (string, error) {
	return homedir.Expand(path)
}
