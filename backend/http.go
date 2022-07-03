package backend

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func NewAssetHandler() http.Handler {
	engine := gin.Default()
	engine.Any("/:action", func(ctx *gin.Context) {
		action := ctx.Param("action")
		fmt.Printf("path:%s,action:%s,method,%s,remote:%s\n", ctx.Request.URL.Path, action, ctx.Request.Method, ctx.Request.RemoteAddr)
		ctx.JSON(
			http.StatusOK,
			gin.H{
				"URL":        ctx.Request.URL,
				"Method":     ctx.Request.Method,
				"Action":     action,
				"RemoteAddr": ctx.Request.RemoteAddr,
			})
		return
	})
	return engine
}
