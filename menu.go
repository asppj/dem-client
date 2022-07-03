package main

import (
	"runtime"

	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/menu/keys"
)

func openFile(*menu.CallbackData) {

}
func AppMenu() *menu.Menu {
	appMenu := menu.NewMenu()
	FileMenu := appMenu.AddSubmenu("File")
	FileMenu.AddText("Open Config File", keys.CmdOrCtrl("o"), openFile)
	FileMenu.AddSeparator()
	FileMenu.AddText("New Tab", keys.CmdOrCtrl("n"), func(_ *menu.CallbackData) {
	})

	if runtime.GOOS == "darwin" {
		appMenu.Append(menu.EditMenu()) // on macos platform, we should append EditMenu to enable Cmd+C,Cmd+V,Cmd+Z... shortcut
	}
	return appMenu
}
