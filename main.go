package main

import (
	"embed"

	"github.com/asppj/dem-client/backend"
	apppost "github.com/asppj/dem-client/backend/AppPost"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
)

//go:embed frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()
	// Create application with options
	err := wails.Run(&options.App{
		Title:             "Dem Client",
		Width:             1280,
		Height:            980,
		DisableResize:     false,
		Fullscreen:        false,
		Frameless:         false,
		MinWidth:          1024,
		MinHeight:         768,
		MaxWidth:          1280,
		MaxHeight:         1024,
		StartHidden:       false,
		HideWindowOnClose: false,
		BackgroundColour:  &options.RGBA{R: 0, G: 0, B: 0, A: 255},
		AlwaysOnTop:       false,
		Menu:              AppMenu(),
		Assets:            assets,
		// BackgroundColour:  &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:     app.Startup,
		OnShutdown:    app.Shutdown,
		AssetsHandler: backend.NewAssetHandler(),
		Bind: []interface{}{
			app,
			&apppost.AppPost{},
		},
	})

	if err != nil {
		println("Error:", err)
	}
}
