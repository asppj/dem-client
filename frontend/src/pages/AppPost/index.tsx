import { useState } from 'react'
import { Refresh } from '../svgs'
import CodeEditor, { ResponseView } from './code'
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
	const [headers, setHeaders] = useState<AppPostNS.Header[]>([{ key: "", value: "", checked: true }, { key: "", value: "", checked: true }, { key: "", value: "", checked: true }])
	// body
	const [body, setBody] = useState("{}")
	// response 
	const [response, setResponse] = useState<AppPostNS.Response>()
	// 发送请求
	// requestProcess 
	const [requestProcess, setRequestProcess] = useState(false);
	const requestClick = () => {
		console.log("click request", method, host, headers, body)
	}

	return (
		<div className="container w-full h-auto bg-gray-50 shadow-xl p-4 m-0">
			<div className="flex items-left flex-col gap-2">
				<div className="col-span-3 flex flex-row items-center hover:bg-gray-100 gap-1">
					<div className="hover:ring-1 rounded-md col-span-3">
						<SelectInput values={methods} select={(e) => { setMethod(e.target.value); }}></SelectInput>
					</div>
					<div className="grow">
						<div className="col-span-full sm:col-span-3 py-1.5">
							<input value={host} onChange={(e) => { setHost(e.target.value); }} id="website" type="text" placeholder="https://" className={inputClass} />
						</div>
					</div>
					<div className="flex flex-row flex-end justify-end p-4 ring-0 ">
						<button type="button" disabled={requestProcess} className=" flex flex-row space-x-2 p-2 pr-4 py-2 font-semibold border rounded border-blue-400-100 text-gray-800 hover:ring-2 hover:ring-blue-700 hover:ring-opacity-90 hover:bg-white-100 hover:text-black-800 hover:shadow-inherit disabled:bg-blue-200 disable:bg-opacity-30 disabled:text-white-500 disabled:border-slate-200 disabled:shadow-none disabled:ring-0"
							onClick={(e) => {
								setRequestProcess(true)
								requestClick()
								setTimeout(() => { setRequestProcess(false); }, 500);
							}}>
							<div className="flex-grow h-4 w-4 mr-1">
								{<p className={requestProcess ? "animate-spin scale-50" : "scale-75"}>
									<Refresh />
								</p>
								}
							</div>

							<p>
								Request
							</p>
						</button>
					</div>
				</div>
				<div className="flex flex-col xl:flex-row shadow-lg space-x-1 space-y-2 pl-1 ">
					<div className="xl:flex-1 xl:h-48 max-h-48 overflow-scroll p-3">
						<HeadersPost headers={headers} change={setHeaders} />
					</div>
					<div className="xl:flex-1 h-48 w-full rounded p-1  bg-opacity-10 ">
						<CodeEditor body={body} placeholder={"request body"} change={setBody} />
					</div>
				</div>
				<div className="p-3  shadow-xl rounded h-96 w-full">
					<CodeEditor body={response?.response || ""} placeholder={"response data"} change={() => { }} />
				</div>
			</div>
		</div >
	)
}

export default AppPost


