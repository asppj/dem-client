package supervisor

import (
	"io/fs"
	"io/ioutil"
	"os"
	"os/exec"
	"path"
	"strings"
)

func runCmd(cmd *exec.Cmd) error {
	if err := cmd.Run(); err != nil {
		return err
	}
	return nil
}

func runCmdShell(fileName string, content string) error {
	tempDir := os.TempDir()
	defer os.RemoveAll(tempDir)
	filePath := path.Join([]string{tempDir, fileName}...)
	err := ioutil.WriteFile(filePath, []byte(content), fs.ModePerm)
	if err != nil {
		return err
	}

	cmd := exec.Command("bash", filePath)
	cmd.Stdout, cmd.Stderr, cmd.Stdin = os.Stdout, os.Stderr, os.Stdin
	return runCmd(cmd)
}
func runCmds(cmds ...string) error {
	cmds = append([]string{"#!/bin/bash", "set -e"}, cmds...)
	return runCmdShell("run.sh", strings.Join(cmds, "\n"))
}
