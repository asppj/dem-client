import { useState } from 'react';
import logo from '../../assets/images/logo-universal.png';
import './index.css';
import { Greet } from "../../../wailsjs/go/main/App";
import { Button } from 'antd'

// home
const Home = () => {
	const [resultText, setResultText] = useState("Please enter your name below 👇");
	const [name, setName] = useState('');
	const updateName = (e: any) => setName(e.target.value);
	const updateResultText = (result: string) => setResultText(result);

	function greet() {
		Greet(name).then(updateResultText);
	}
	return <div>
		<img src={logo} id="logo" alt="logo" />
		<div className="flex center">
			<div id="result" className="result">{resultText}</div>
			<div id="input" className="input-box ">
				<input id="name" className="input hover:bg-black-100" onChange={updateName} autoComplete="off" name="input" type="text" />
				{/* <button className="btn" onClick={greet}>Greet</button> */}
				<Button type="primary" onClick={greet}>Greet</Button>
			</div>
		</div>

	</div>
}

export default Home
