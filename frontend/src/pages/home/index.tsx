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
// import MyDisclosure from './components/demo';

export default function Home() {
	const cardTitle = "ChitChat";
	const cardMsg = "You have a new message!"
	const logoRef = logo;
	return (
		<>
		<MyDisclosure/>
			<div className="container mx-4 my-2 px-4 py-2">
				<div className="decoration-clone  bg-gradient-to-b from-yellow-400 to-red-500">
					Home
				</div>
				<div className="box-border h-32 w-32 p-4 border-4">
					
				</div>
				<div className="box-content h-32 w-32 p-4 border-4">
					
				</div>

				<div className="container hover:text-red-500 hover:bg-yellow-50 ring-1">
					<div className="hover:scale-104 p-6 max-w-sm bg-slate-100 rounded-xl shadow-inner flex items-center space-x-4  hover:shadow-md ">
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
						<div className="">
							<div className="">
								<svg fill="currentColor" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
							</div>
							<input className="focus:ring-2 " />
							<a href="#" className=" visited:text-ellipsis ">
								Hover me
							</a>
							<button className="py-1  m-4 transform motion-safe:hover:scale-110 ring-1 disabled:opacity-50" disabled>
								submit
							</button>
							<input type="checkbox" alt='123' className="appearance-none checked:bg-blue-600 checked:border-collapse" />
						</div>

					</form>



				</div>
				<input type="checkbox" className="appearance-none checked:bg-blue-600 checked:border-collapse">
				</input>
			</div>

		</>
	)
}
