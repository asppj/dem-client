import { useState } from 'react'
import { MkCurl, AppPost as AppPostRequest, ParseCurl } from '../../../wailsjs/go/apppost/AppPost'
import { Refresh } from '../svgs'
import CodeEditor from './code'
import HeadersPost from './headers'
import { AppPostNS } from './interface'
import SelectInput from './select'
import { apppost } from '../../../wailsjs/go/models'
import ModalButton from './modal'
import { openNotificationWithIcon } from '@/utils/notice'

const methods = [
	"GET",
	"POST",
	"PUT",
	"PATCH",
	"HEAD",
	"DELETE",
]
// type NotificationType = 'success' | 'info' | 'warning' | 'error';

// const openNotificationWithIcon = (type: NotificationType, title: string, message: string) => {
// 	notification[type]({
// 		message: title,
// 		description: message,
// 	});
// };


const inputClass = "placeholder:text-slate-300 w-full font-normal rounded-md  border-gray-300 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

function AppPost() {
	// secret key
	const [secret, setSecret] = useState("")
	// methods
	const [method, setMethod] = useState(methods[0])
	// hosts
	const [host, setHost] = useState("")
	// headers
	const [headers, setHeaders] = useState<AppPostNS.Header[]>([{ key: "", value: "", checked: true }, { key: "", value: "", checked: true }, { key: "", value: "", checked: true }])
	// body
	const [body, setBody] = useState("{}")
	// response 
	// const [response, setResponse] = useState<AppPostNS.Response>({ response: "", is_json: false, headers: [] })
	const [response, setResponse] = useState<AppPostNS.Response>()
	// 显示curl
	const [curl, setCurl] = useState("")
	// 点击get curl
	const getCURL = () => {
		let paramHeaders = new Array<apppost.AppHeader>();
		headers.map((header) => header.checked && paramHeaders.push(new apppost.AppHeader({ key: header.key, value: header.value })))
		MkCurl(new apppost.AppPostParam({ method: method, url: host, body: body, headers: paramHeaders }), secret).then((res) => {
			console.log("mkcurl response:", res)
			setCurl(res.toString())
		}).catch((e) => {
			console.log("mkcurl error:", e)
			openNotificationWithIcon("error", "mkcurl", e)
		})
	}
	// 发送请求
	// requestProcess 
	const [requestProcess, setRequestProcess] = useState(false);
	const requestClick = () => {
		console.log("click request", method, host, headers, body)
		let paramHeaders = new Array<apppost.AppHeader>();
		headers.map((header) => header.checked && paramHeaders.push(new apppost.AppHeader({ key: header.key, value: header.value })))
		AppPostRequest(new apppost.AppPostParam({ method: method, url: host, body: body, headers: paramHeaders }), secret).then((res) => {
			console.log("res:", res)
			if ('response' in res) {
				console.log("res:", res.response, res.status_code)
				openNotificationWithIcon("success", "request成功", res.status_code.toString())
				setResponse({ response: res.response, is_json: res.is_json, headers: res.headers.map((item) => { return `${item.key}:${item.values.join(',')}` }) })
			} else {
				console.log("res:", res)
				openNotificationWithIcon("error", "request失败", res.toString())
			}
		}).catch((e) => {
			console.log("error:", e)
			openNotificationWithIcon("error", "request异常", e)
		})
	}
	// 粘贴curl语句
	const parseCurl = (text: string) => {
		console.log("粘贴:", text);
		if (text.length < 4) {
			return
		}
		if (!text.startsWith("curl")) {
			return
		}
		ParseCurl(text, secret).then((res) => {
			console.log("ParseCurl.res1:", res)
			if ('url' in res) {
				console.log("ParseCurl.res2:", res.url, res.method)
				setHost(res.url)
				setBody(res.body)
				setMethod(res.method)
				setHeaders(res.headers.map((item) => { return { key: item.key, value: item.value, checked: true } }))
				openNotificationWithIcon("success", "parse curl", text)
			} else {
				console.log("ParseCurl.res1.error:", res)
				openNotificationWithIcon("error", "request失败", "console打印了错误")
			}
		}).catch((e) => {
			console.log("error:", e)
			openNotificationWithIcon("error", "request异常", e)
		})
	}


	return (
		<div className="container-xl w-full h-auto bg-gray-50 shadow-xl p-4 m-0">
			<div className="flex items-left flex-col gap-2">
				<div className="col-span-3 flex flex-row items-center hover:bg-gray-100 gap-1">
					<div className="hover:ring-1 rounded-md col-span-3">
						<SelectInput values={methods} selected={method} select={(e) => { setMethod(e.target.value); }}></SelectInput>
					</div>
					<div className="grow">
						<div className="col-span-full sm:col-span-2 py-1.5">
							<input value={host} onChange={(e) => { setHost(e.target.value); parseCurl(e.target.value) }} id="website" type="text" placeholder="https://" className={inputClass} />
							{/* <Input value={host} onChange={(e) => { setHost(e.target.value); }} id="website" type="text" placeholder="https://" className={inputClass} /> */}
						</div>
					</div>
					<div className="flex flex-row flex-end justify-end p-4 ring-0">
						<button type="button" disabled={requestProcess} className=" flex flex-row h-10 p-2 font-semibold border-2 rounded border-blue-400-100 text-gray-800 hover:ring-2 hover:ring-blue-700 hover:ring-opacity-90 hover:bg-white-100 hover:text-black-800 hover:shadow-inherit disabled:bg-blue-200 disable:bg-opacity-30 disabled:text-white-500 disabled:border-slate-200 disabled:shadow-none disabled:ring-0"
							onClick={(e) => {
								setRequestProcess(true)
								requestClick()
								setTimeout(() => { setRequestProcess(false); }, 500);
							}}>
							<div className="flex-grow h-10">
								{<p className={requestProcess ? "animate-spin scale-50 items-center" : "scale-75 items-center"}>
									<Refresh />
								</p>
								}
							</div>
							{/* <p className="p-auto justify-center text-center center p-1 align-middle"> */}
							Request
							{/* </p> */}
						</button>
					</div>
					<div className="flex flex-row flex-end justify-end p-2 ring-0 ">
						<ModalButton onClick={() => getCURL()} text="curl" title="curl" context={curl}></ModalButton>
					</div>
					<div >
						<input className={inputClass} placeholder="secret" type="text" defaultValue={secret} onChange={(e) => { setSecret(e.target.value) }}></input>
					</div>
				</div>
				<div className="flex flex-col xl:flex-row shadow-lg space-x-1 space-y-2 pl-1 ">
					<div className="xl:flex-2 xl:h-48 max-h-48 overflow-scroll p-3">
						<HeadersPost headers={headers} change={setHeaders} />
					</div>
					<div className="xl:flex-1 h-48 w-full rounded p-1  bg-opacity-10 ">
						<CodeEditor body={body} placeholder={"request body"} change={setBody} />
					</div>
				</div>
				<div className="p-1  rounded h-96 w-full">
					<CodeEditor body={response?.response || ""} placeholder={"response data"} change={() => { }} />
					{/* <ResponseView body={response?.response || ""} placeholder={"response data"} /> */}
					{/* <JsonView body={response} placeholder={"response data"} /> */}
				</div>
			</div>
		</div >
	)
}

export default AppPost


