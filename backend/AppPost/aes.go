package apppost

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"runtime"
)

func decrypt(input, secretsKey string) (out string, err error) {
	defer func() {
		fmt.Printf("input is:%s ,secret key is:%s\n", input, secretsKey)
		fmt.Printf("out is:%s \nerr:%v\n;", out, err)
	}()
	if secretsKey == "" {
		return input, nil
	}
	// json_str := bytes.NewBuffer(input).String()
	base64DeInput, err := base64.StdEncoding.DecodeString(input)
	if err != nil {
		return "", err
	}
	key := secretsKey
	cbcCipher, err := NewAesCrypter(key, Ecb, nil, "")
	if err != nil {
		return "", err
	}
	res, err := cbcCipher.Decrypt(string(base64DeInput))
	if err != nil {
		return "", err
	}
	return string(res.RByte), nil
}
func encrypt(input, secretsKey string) (out string, err error) {
	if secretsKey == "" {
		return input, nil
	}
	key := secretsKey
	cbcCipher, err := NewAesCrypter(key, Ecb, nil, "")
	if err != nil {
		return "", err
	}
	res, err := cbcCipher.Encrypt(string(input))
	if err != nil {
		return "", err
	}
	// json_str := bytes.NewBuffer(input).String()
	o := base64.StdEncoding.EncodeToString(res.RByte)
	return o, nil
}

type aesOption string

// aesOption cbc
var Cbc aesOption = "cbc"

// aesOption ecb
var Ecb aesOption = "ecb"

type aesCodingType string

// var AesByte aesCodingType = "byte"

// aesCodingType base64
var AesBase64 aesCodingType = "base64"

// aesCodingType hex
var AesHex aesCodingType = "hex"

type aesCrypter struct {
	key       string
	aesOption aesOption
	iv        []byte
	cType     aesCodingType
}

type aesCryptRes struct {
	RByte   []byte
	RBase64 string
	RHex    string
}

// New returns a new point aesCrypter.
// key is required, option is required, iv is option, cType is option, if cType is "", the result of cipher is []byte
func NewAesCrypter(key string, option aesOption, iv []byte, cType aesCodingType) (*aesCrypter, error) {
	if key == "" {
		return nil, fmt.Errorf("secret not found")
	}
	return &aesCrypter{
		key:       key,
		aesOption: option,
		iv:        iv,
		cType:     cType,
	}, nil
}

func (a *aesCrypter) cbcEncrypt(plain string) ([]byte, error) {
	block, err := aes.NewCipher([]byte(a.key))
	if err != nil {
		return nil, err
	}

	defer func() {
		if err := recover(); err != nil {
			switch err.(type) {
			case runtime.Error:
				fmt.Println("runtime err:", err, "Check that the key is correct")
			default:
				fmt.Println("error:", err)
			}
		}
	}()

	// 填充原文
	blockSize := block.BlockSize()

	rawData := PKCS5Padding([]byte(plain), blockSize)
	cipherText := make([]byte, blockSize+len(rawData))
	// block大小 16

	var iv []byte

	if len(a.iv) != 0 {
		if len(a.iv) != 16 {
			return nil, errors.New("The length of iv should be 16 ")
		} else {
			iv = a.iv
		}
	} else {
		iv = cipherText[:blockSize]
	}
	if _, err := io.ReadFull(rand.Reader, iv); err != nil {
		return nil, err
	}

	// block大小和初始向量大小一定要一致
	mode := cipher.NewCBCEncrypter(block, iv)
	mode.CryptBlocks(cipherText[blockSize:], rawData)

	return cipherText, nil
}

func (a *aesCrypter) cbcDecrypt(plain string) ([]byte, error) {
	block, err := aes.NewCipher([]byte(a.key))
	if err != nil {
		return nil, err
	}

	blockSize := block.BlockSize()

	encryptData := []byte(plain)
	if len(encryptData) < blockSize {
		return nil, errors.New("Cipher text too short ")
	}

	var iv []byte

	if len(a.iv) != 0 {
		if len(a.iv) != 16 {
			return nil, errors.New("The length of iv should be 16 ")
		} else {
			iv = a.iv
		}
	} else {
		iv = encryptData[:blockSize]
	}

	encryptData = encryptData[blockSize:]

	// CBC mode always works in whole blocks.
	if len(encryptData)%blockSize != 0 {
		return nil, errors.New("Cipher text is not a multiple of the block size ")
	}

	mode := cipher.NewCBCDecrypter(block, iv)

	// CryptBlocks can work in-place if the two arguments are the same.
	mode.CryptBlocks(encryptData, encryptData)
	// 解填充
	plainText, err := PKCS5UnPadding(encryptData)

	if err != nil {
		return nil, err
	}
	return plainText, nil
}

func (a *aesCrypter) ecbEncrypt(plain string) ([]byte, error) {

	block, _ := aes.NewCipher([]byte(a.key))
	data := []byte(plain)

	data = PKCS5Padding(data, block.BlockSize())
	encrypted := make([]byte, len(data))
	size := block.BlockSize()

	for bs, be := 0, size; bs < len(data); bs, be = bs+size, be+size {
		block.Encrypt(encrypted[bs:be], data[bs:be])
	}

	return encrypted, nil
}

func (a *aesCrypter) ecbDecrypt(plain string) ([]byte, error) {

	block, _ := aes.NewCipher([]byte(a.key))
	data := []byte(plain)
	decrypted := make([]byte, len(data))
	size := block.BlockSize()

	// 分组分块加密
	for bs, be := 0, size; bs < len(data); bs, be = bs+size, be+size {
		block.Decrypt(decrypted[bs:be], data[bs:be])
	}

	cipherText, err := PKCS5UnPadding(decrypted)
	if err != nil {
		return nil, errors.New("Unpadding failed. ")
	}

	return cipherText, nil
}

// Get the encrypted result of a point aesCryptRes after encrypting the string with the function of your choice
func (a *aesCrypter) Encrypt(plain string) (*aesCryptRes, error) {

	defer func() {
		if err := recover(); err != nil {
			switch err.(type) {
			case runtime.Error:
				fmt.Println("runtime err:", err, "Check that the input is correct")
			default:
				fmt.Println("error:", err)
			}
		}
	}()

	res := aesCryptRes{}

	var enByte []byte
	var err error

	switch a.aesOption {
	case Cbc:
		enByte, err = a.cbcEncrypt(plain)
	case Ecb:
		enByte, err = a.ecbEncrypt(plain)
	default:
		return nil, errors.New("The type of aes option is not valid. ")
	}

	if err != nil {
		return nil, err
	}

	switch a.cType {

	case AesBase64:
		str := base64.StdEncoding.EncodeToString(enByte)
		if err != nil {
			return nil, err
		}
		res.RBase64 = str
	case AesHex:
		str := hex.EncodeToString(enByte)
		if err != nil {
			return nil, err
		}
		res.RHex = str
	default:
		res.RByte = enByte
	}

	return &res, nil

}

// Get the decrypted result of a point aesCryptRes after decrypting the string with the function of your choice
func (a *aesCrypter) Decrypt(plain string) (*aesCryptRes, error) {

	defer func() {
		if err := recover(); err != nil {
			switch err.(type) {
			case runtime.Error:
				fmt.Println("runtime err:", err, "Check that the input is correct")
			default:
				fmt.Println("error:", err)
			}
		}
	}()

	res := aesCryptRes{}

	var deByte []byte
	var err error

	switch a.aesOption {
	case Cbc:
		deByte, err = a.cbcDecrypt(plain)
	case Ecb:
		deByte, err = a.ecbDecrypt(plain)
	default:
		return nil, errors.New("The type of aes option is not valid. ")

	}
	if err != nil {
		return nil, fmt.Errorf("AES %s decrypt failure: %w", a.aesOption, err)
	}

	switch a.cType {
	case AesBase64:
		str := base64.StdEncoding.EncodeToString(deByte)
		if err != nil {
			return nil, err
		}
		res.RBase64 = str
	case AesHex:
		str := hex.EncodeToString(deByte)
		if err != nil {
			return nil, err
		}
		res.RHex = str
	default:
		res.RByte = deByte
	}

	return &res, nil
}

// It is unpopulated using pkcs5
func PKCS5UnPadding(origData []byte) ([]byte, error) {
	length := len(origData)
	unPadding := int(origData[length-1])

	if unPadding >= length {
		return nil, errors.New("")
	}
	return origData[:(length - unPadding)], nil
}

// It is populated using pkcs5
func PKCS5Padding(cipherText []byte, blockSize int) []byte {
	padding := blockSize - len(cipherText)%blockSize
	padText := bytes.Repeat([]byte{byte(padding)}, padding)
	return append(cipherText, padText...)
}
