import React from 'react'
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
	return (
		<div className="container w-4/5 h-auto bg-gray-50 shadow-xl p-4 m-0">
			<div className="flex items-left flex-col gap-2">
				<div className="col-span-3 flex flex-row items-center ring-1 gap-1">
					<div className="ring-1 rounded">
						<SelectInput  values={methods}></SelectInput>
					</div>
					<div className="grow ring-1">1					</div>
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
