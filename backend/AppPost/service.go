package apppost

import (
	"context"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
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
	code, headers, response, err := param.request(secret)
	if err != nil {
		return AppPostResponse{}, fmt.Errorf("request err:%v", err)
	}
	res, err := decrypt(response, secret)
	if err != nil {
		return AppPostResponse{}, fmt.Errorf("decrypt err:%v", err)
	}
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
