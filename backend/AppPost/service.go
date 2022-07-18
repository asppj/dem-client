package apppost

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/antlabs/pcurl"
)

type AppPost struct {
	ctx context.Context
}

type AppHeader struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

type ResponseHeader struct {
	Key    string   `json:"key"`
	Values []string `json:"values"`
}
type AppPostParam struct {
	Method  string      `json:"method"`
	URL     string      `json:"url"`
	Headers []AppHeader `json:"headers"`
	Body    string      `json:"body"`
}

func (a AppPostParam) request(secret string) (code int, headers []ResponseHeader, response string, err error) {
	body, err := encrypt(a.Body, secret)
	if err != nil {
		return 0, nil, "", fmt.Errorf("Failed to encrypt:%v", err)
	}

	req, err := http.NewRequest(a.Method, a.URL, strings.NewReader(body))
	if err != nil {
		return 0, nil, "", fmt.Errorf("Failed to new request: %v", err)
	}
	for _, header := range a.Headers {
		if header.Key != "" && header.Value != "" {
			req.Header.Add(header.Key, header.Value)
		}
	}
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return 0, nil, "", fmt.Errorf("Failed to request.Do:%v", err)
	}
	defer res.Body.Close()
	data, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return 0, nil, "", fmt.Errorf("Failed to io.read")
	}
	headers = make([]ResponseHeader, 0)

	for k, vs := range res.Header {
		headers = append(headers, ResponseHeader{
			Key:    k,
			Values: vs,
		})
	}
	return res.StatusCode, headers, string(data), nil
}

type AppPostResponse struct {
	StatusCode int              `json:"status_code"`
	Headers    []ResponseHeader `json:"headers"`
	IsJson     bool             `json:"is_json"` // true 返回json格式
	Response   string           `json:"response"`
}

func (a *AppPost) AppPost(param AppPostParam, secret string) (AppPostResponse, error) {
	if err := recoverMiddleware(); err != nil {
		return AppPostResponse{}, err
	}
	code, headers, response, err := param.request(secret)
	if err != nil {
		return AppPostResponse{}, fmt.Errorf("request err:%v", err)
	}
	res, err := decrypt(response, secret)
	if err != nil {
		return AppPostResponse{}, fmt.Errorf("decrypt err:%v", err)
	}
	log.Default().Println()
	// if secret !="" 加密body,解密response
	return AppPostResponse{
		StatusCode: code,
		Response:   res,
		Headers:    headers,
		IsJson:     jsonContentType(headers),
	}, nil
}

func jsonContentType(headers []ResponseHeader) bool {
	for _, header := range headers {
		if strings.ToLower(header.Key) == "content-type" {
			for _, element := range header.Values {
				if strings.HasPrefix(strings.ToLower(element), "application/json") {
					return true
				}
			}
		}
	}
	return false
}

// 拼接curl
func (a *AppPost) MkCurl(param AppPostParam, secret string) (curl string, err error) {
	if err := recoverMiddleware(); err != nil {
		return "", err
	}
	curl = fmt.Sprintf("curl --request '%s' '%s'", param.Method, param.URL)
	for _, header := range param.Headers {
		if header.Key != "" && header.Value != "" {
			curl += fmt.Sprintf(" -H '%s:%s'", header.Key, header.Value)
		}
	}
	if param.Body != "" {
		data, err := encrypt(param.Body, secret)
		if err != nil {
			return curl, err
		}
		curl += fmt.Sprintf(" --data '%s'", data)
	}
	return
}
func (a *AppPost) ParseCurl(text, secret string) (param AppPostParam, err error) {
	if err := recoverMiddleware(); err != nil {
		return param, err
	}
	req, err := pcurl.ParseAndRequest(text)
	if err != nil {
		fmt.Printf("err:%s\n", err)
		return
	}
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		return
	}
	headers := make([]AppHeader, 0)
	for key, values := range req.Header {
		for _, value := range values {
			headers = append(headers, AppHeader{
				Key:   key,
				Value: value,
			})
		}
	}
	param = AppPostParam{
		Method:  req.Method,
		URL:     req.URL.String(),
		Headers: headers,
		Body:    string(body),
	}
	return
}

func recoverMiddleware() error {
	if err := recover(); err != nil {
		return fmt.Errorf("recover middleware: %v", err)
	}
	return nil
}
