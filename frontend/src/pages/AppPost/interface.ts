
export namespace AppPostNS {
	export interface Header {
		key: string
		value: string
		checked: boolean
	}
	export interface Body {
		body: string
		encrypted: boolean
		secret: string
	}
	export interface Response {
		response: string
		decrypted?: boolean // true: 已解密
		fr?: boolean //true: 已格式化
	}
}
