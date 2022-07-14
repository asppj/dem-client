import React, { useState } from 'react'
import CodeHighlighter from './code'
import HeadersPost from './headers'
import { AppPostNS } from './interface'
import SelectInput from './select'



const methods = [
	"GET",
	"POST",
	"PUT",
	"PATCH",
	"HEAD",
	"DELETE",
]

const inputClass = "placeholder:text-slate-300 w-full font-normal rounded-md  border-gray-300 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

function AppPost() {
	// methods
	const [method, setMethod] = useState(methods[0])
	// hosts
	const [host, setHost] = useState("")
	// headers
	const [headers, setHeaders] = useState<AppPostNS.Header[]>([{ key: "", value: "", checked: true }])
	// body
	const [body, setBody] = useState("")
	// 发送请求
	// requestProcess 
	const [requestProcess, setRequestProcess] = useState(false);
	const requestClick = () => {
		console.log("click request", method, host, headers)
	}

	return (
		<div className="container w-4/5 h-auto bg-gray-50 shadow-xl p-4 m-0">
			<div className="flex items-left flex-col gap-2">
				<div className="col-span-3 flex flex-row items-center hover:ring-1 gap-1">
					<div className="hover:ring-1 rounded-md col-span-3">
						<SelectInput values={methods} select={(e) => { setMethod(e.target.value); }}></SelectInput>
					</div>
					<div className="grow">
						<div className="col-span-full sm:col-span-3 py-1.5">
							<input value={host} onChange={(e) => { setHost(e.target.value); }} id="website" type="text" placeholder="https://" className={inputClass} />
						</div>
					</div>
				</div>
				<div>
					<HeadersPost headers={headers} change={setHeaders} />
				</div>
				<div className="container p-1 h-32 rounded-xl  bg-opacity-10 shadow-gray-300 shadow-lg">
					<CodeHighlighter body={body} change={setBody} />
				</div>
				<div className="flex flex-row flex-end justify-end p-x-4 ring-1">
					<button className={requestProcess ? "btn" : "ring-1"} onClick={(e) => {
						setRequestProcess(true)
						requestClick()
						setRequestProcess(false)
					}}>
						Request
					</button>
				</div>
				<div className="ring-1">4</div>
				<div className="ring-1">5</div>
				<div className="ring-1">6</div>
				<div className="ring-1">7</div>
				<div className="ring-1">7</div>
				<div className="ring-1">7</div>
				<div className="ring-1">7</div>
				<div className="ring-1">7</div>
				<div className="ring-1">7</div>
			</div>
		</div >
	)
}

export default AppPost
