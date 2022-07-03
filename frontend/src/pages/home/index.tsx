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
    return <>
        <img src={logo} id="logo" alt="logo" />
        <div id="result" className="result">{resultText}</div>
        <div id="input" className="input-box">
            <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text" />
            {/* <button className="btn" onClick={greet}>Greet</button> */}
            <Button type="primary" onClick={greet}>Greet</Button>
        </div>
    </>
}

export default Home
