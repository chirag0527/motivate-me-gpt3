import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isChecked1, setIsChecked1] = useState(true)
  const [isChecked2, setIsChecked2] = useState(null)

  function handleChange1(e) {
    setIsChecked1(e.target.checked);
    setIsChecked2(!e.target.checked);
  }
  
  function handleChange2(e) {
    setIsChecked2(e.target.checked);
    setIsChecked1(!e.target.checked);
  }

  const callGenerateEndpoint1 = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const callGenerateEndpoint2 = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  function onUserChangedText(e){
    setUserInput(e.target.value)
  }

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>get <span>motivated</span></h1>
          </div>
          <div className="header-subtitle">
            <h2>Not feeling motivated today? Just write the task you wanna work on.</h2>
          </div>
        </div>
        <div className='prompt-container'>
          <textarea placeholder='read a new book' 
          className='prompt-box' 
          value = {userInput}
          onChange = {onUserChangedText}
          />
        </div>
        <form className='form'>
            <label className="checkbox-container" onChange={handleChange1}>🙂
                <input type="radio" name="choice" defaultChecked></input>
            </label>
            <label className="checkbox-container" onChange={handleChange2}>😠
                <input type="radio" name="choice"></input>
            </label>
        </form>
        <div className="prompt-buttons">
          <a
            className={isGenerating ? 'generate-button loading' : 'generate-button'}
            onClick={isChecked1?callGenerateEndpoint1:callGenerateEndpoint2}
          >
            <div className="generate">
            {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
            </div>
          </a>
        </div>
        {apiOutput && (
        <div className="output">
          <div className="output-header-container">
            <div className="output-header">
              <h3>Output</h3>
            </div>
          </div>
          <div className="output-content">
            <p>{apiOutput}</p>
          </div>
        </div>
        )}
      </div>
      <div className="badge-container">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <p>built with <span><u>buildspace</u></span></p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
