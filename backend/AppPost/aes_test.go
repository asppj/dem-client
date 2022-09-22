package apppost

import (
	"fmt"
	"testing"
)

func TestAesEncrypt(t *testing.T) {
	key := "yc94mjpoo0yozoct"
	input := "1663643945611PjDtQC"
	out, err := encrypt(input, key)
	if err != nil {
		t.Fatal(err)
	}
	fmt.Println(out)
	t.Log(out)
}
