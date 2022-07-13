import React, { useState } from 'react'
import SelectInput from './select'


const methods = [
	"GET",
	"POST",
	"PUT",
	"PATCH",
	"HEAD",
	"DELETE",
]

function AppPost() {

	const [method, setMethod] = useState(methods[0])
	const [host,setHost]=useState("")
	return (
		<div className="container w-4/5 h-auto bg-gray-50 shadow-xl p-4 m-0">
			<div className="flex items-left flex-col gap-2">
				<div className="col-span-3 flex flex-row items-center hover:ring-1 gap-1">
					<div className="hover:ring-1 rounded-md col-span-3">
						<SelectInput values={methods} select={(e) => { console.log(e) }}></SelectInput>
					</div>
					<div className="grow">
						<div className="col-span-full sm:col-span-3 py-1.5">
							<input value={host} onChange={(e)=>{setHost(e.target.value);console.log(e)}} id="website" type="text" placeholder="https://" className="focus:placeholder:text-slate-300 w-full font-normal rounded-md  border-gray-300 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
						</div>
					</div>
				</div>

				<div className="ring-1">2</div>
				<div className="ring-1">3</div>
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
		</div>
	)
}

export default AppPost
