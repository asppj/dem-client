import React, { useEffect, useState } from 'react'
import { Minus, Plus } from '../svgs'
import { AppPostNS } from './interface'


function HeadersPost(props: { headers: AppPostNS.Header[], change: (headers: AppPostNS.Header[]) => void }) {
	const rowClass = "flex flex-row gap-0 justify-start p-1 m-0 align-left"
	const inputClass = "h-8 m-1 flex-1 placeholder:text-slate-300 font-sm rounded-md  border-gray-300 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
	// const inputClass = ""
	const checkClass = "flex flex-center align-baseline"
	const clickClass = "flex flex-row hover:bg-blue-50  shadow-sm px-1 py-1.5 mt-1"
	const placeholderKey = "Context-Type"
	const placeholderValue = "application/json"
	const placeholderClass = "placeholder:placeholder-gray-300 placeholder:bg-white-200 placeholder:focus:placeholder-gray-100 border-gray-300 border border-rounded rounded-md"

	// 联动调用父子组件change
	const changeHeader = (value: AppPostNS.Header[]) => {
		props.change([...value])
	}
	// 增加header
	const clickPlus = () => {
		console.log("plus")
		const headers = props.headers;
		headers.push({ key: "", value: "", checked: true })
		changeHeader(headers)
	}
	// 删除header
	const clickMinus = (index: number) => {
		console.log("minus")
		let headers = props.headers;
		changeHeader(headers.filter((header, idx) => {
			return idx !== index
		}))
	}
	// 选中 header
	const clickHeader = (index: number, checked: boolean) => {
		let headers = props.headers;
		headers[index].checked = checked
		changeHeader(headers)
	}
	// change key 
	const changeKey = (index: number, key: string) => {
		let headers = props.headers;
		headers[index].key = key
		changeHeader(headers)
	}
	// change value
	const changeValue = (index: number, value: string) => {
		let headers = props.headers;
		headers[index].value = value
		changeHeader(headers)
	}
	return (
		<div className="w-full h-full">
			{
				props.headers.map((header, index) => {
					return (
						<div className={rowClass} key={`index-${index}`}>
							<div className={checkClass}>
								<input type="checkbox" className="rounded m-auto hover:ring-1 hover:bg-slate-100" defaultChecked={header.checked} onChange={(e) => {
									console.log("点击checked", e)
									clickHeader(index, e.target.checked)
								}}></input>
							</div>
							<div className={inputClass}>
								<input type="text" className={placeholderClass} placeholder={placeholderKey} defaultValue={header.key} onChange={(e) => { changeKey(index, e.target.value) }}></input>
							</div>
							<div className={inputClass}>
								<input type="text" className={placeholderClass} placeholder={placeholderValue} defaultValue={header.value} onChange={(e) => { changeValue(index, e.target.value) }}></input>
							</div>
							<div className="flex-1 flex flex-row flex-shrink">
								{/* 最后一行才有plus */}
								{
									index === props.headers.length - 1 && (
										<div onClick={clickPlus}  >
											<div className={clickClass}>
												<Plus ></Plus>
											</div>
										</div>
									)
								}
								{/* 只有一行没有minus */}
								{
									props.headers.length != 1 && (
										<div onClick={() => { clickMinus(index) }}>
											<div className={clickClass}>
												<Minus ></Minus>
											</div>
										</div>
									)

								}
							</div>
						</div>
					)
				})
			}
		</div>
	)
}

export default HeadersPost
