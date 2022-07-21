package cmdrunner

import (
	"fmt"

	au "github.com/logrusorgru/aurora"
)

type Logger interface {
	Success(format string, a ...interface{})
	Failed(format string, a ...interface{})
	Doing(format string, a ...interface{})
	Result(format string, a ...interface{})
}

func Success(format string, a ...interface{}) {
	if format != "" {
		fmt.Printf(au.Green("✅ successfully %s\n").String(), fmt.Sprintf(format, a...))

	}
	fmt.Println("✅ successfully")
}
func ExampleSucceed() {
	Success("build")
	// Output: ✅successfully build
}

func Failed(format string, a ...interface{}) {
	fmt.Printf("❌failed:-->>\n%s\n", au.Red(fmt.Sprintf(format, a...)))
	return
}

func Doing(format string, a ...interface{}) {
	fmt.Printf("⛵%s️\n", au.Cyan(fmt.Sprintf(format, a...)))
}

func Result(format string, a ...interface{}) {
	fmt.Printf("💬\n%s\n💯\n", au.BgBlack(fmt.Sprintf(format, a...)))
}
