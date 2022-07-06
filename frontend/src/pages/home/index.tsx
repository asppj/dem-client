import { useState } from 'react';
import logo from '../../assets/images/logo-universal.png';
import './index.css';
import { Greet } from "../../../wailsjs/go/main/App";
import { Button } from 'antd'

// // home
// const Home = () => {
// 	const [resultText, setResultText] = useState("Please enter your name below 👇");
// 	const [name, setName] = useState('');
// 	const updateName = (e: any) => setName(e.target.value);
// 	const updateResultText = (result: string) => setResultText(result);

// 	function greet() {
// 		Greet(name).then(updateResultText);
// 	}
// 	return <div>
// 		<img src={logo} id="logo" alt="logo" />
// 		<div className="flex center">
// 			<div id="result" className="result">{resultText}</div>
// 			<div id="input" className="input-box ">
// 				<input id="name" className="input hover:bg-black-100" onChange={updateName} autoComplete="off" name="input" type="text" />
// 				{/* <button className="btn" onClick={greet}>Greet</button> */}
// 				<Button type="primary" onClick={greet}>Greet</Button>
// 			</div>
// 		</div>

// 	</div>
// }

import React from 'react'

export default function Home() {
	const cardTitle = "ChitChat";
	const cardMsg = "You have a new message!"
	const logoRef = logo;
	return (
		<>
			<div className=" shadow-md h-10 py-2 line-center active:bg-slate-400">Home</div>

			<div className="container hover:text-red-500 hover:bg-yellow-50 ring-1">
				<div className="p-6 max-w-sm bg-slate-100 rounded-xl shadow-inner flex items-center space-x-4  hover:shadow-md ">
					<div className="flex-shrink-0">
						<img className="h-12 w-12" src={logoRef} alt="ChitChat Logo" />
					</div>
					<div className="group">
						<div className="group-hover:text-green-500  text-xl font-medium text-black">{cardTitle}</div>
						<p className="group-hover:text-green-500  text-gray-500">{cardMsg}</p>
					</div>
				</div>
				<div className="group-hover:text-green-500 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
					<div className="md:flex">
						<div className="md:flex-shrink-0">
							<img className="h-48 w-full object-cover md:h-full md:w-48" src={logoRef} alt="Man looking at item at a store" />
						</div>
						<div className="p-8">
							<div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
							<a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a>
							<p className="mt-2 text-gray-500">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
						</div>
					</div>
				</div>
				<form>
					<div className="text-gray-400 focus-within:text-gray-600">
						<div className="">
							<svg fill="currentColor"></svg>
						</div>
						<input className="focus:ring-2 focus:ring-gray-300 " />
					</div>
				</form>
			</div>

		</>
	)
}
