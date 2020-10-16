import React, { useState} from 'react';
import randomWords from "random-words";
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import bg from "./bg.jpg";

function App() {
  //utils
  // eslint-disable-next-line no-unused-vars
  let interval;

  //states
  const [input, setInput] = useState("");
  const [value, setValue] = useState("3000");
  const [time, setTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentWord, setCurrentWord] = useState("");

  //funtions
  let currentCount = 0;
  const incrementTime = () => {
    currentCount++;
    setTime(currentCount);
  }


  const generateWords = () => {
    setCurrentWord(randomWords());
  }

  const incrementWordCount = () => {
    setInterval(() => {
      generateWords();
      setInput("");
      setWordCount(prev => prev + 1);
    }, value);
  }

  return (
    <div className="container-fluid" style={{
      width: "100vw",
      height: "100vh",
      backgroundImage: `url(${bg})`,
      backgroundPosition: "center",
      backgroundSize: "cover"
    }}>
      <nav className="navbar navbar-expandable-xs bg-inverse navbar-dark">
        <a href="/" className="navbar-brand">Typing <span role="img" aria-label="Brand">⌨</span> </a>
        <div className="navbar-expand">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="https://github.com/fuadop" target="_blank" rel="noopener noreferrer" className="nav-link text-light"><FontAwesomeIcon icon={faGithub} /></a>
            </li>
            <li className="nav-item">
              <a href="https://twitter.com/Fuadop2" target="_blank" rel="noopener noreferrer" className="nav-link text-light"><FontAwesomeIcon icon={faTwitter} /></a>
            </li>
            <li className="nav-item">
              <a href="https://www.facebook.com/fuad.olatunji.35/" target="_blank" rel="noopener noreferrer" className="nav-link text-light"><FontAwesomeIcon icon={faFacebook} /></a>
            </li>
          </ul>
        </div>
      </nav>
      <p className="alert alert-primary text-center">
        Enter Space after every complete word press <span role="img" aria-label="Notice">📢📢</span>
      </p>
      <p className="alert alert-warning text-center">
        Check out newer version at <a href="https://ttyping.netlify.app">https://ttyping.netlify.app</a>
      </p>
      <div className="container">
        <div className="row text-center">
          <div className="col-sm-4">
            <p className="display-4 text-light">{wordCount}</p>
            <p className="text-lead text-light">Words</p>
          </div>
          <div className="col-sm-4">
            <p className="display-4 text-light">{correctCount}</p>
            <p className="text-lead text-light">Correct</p>
          </div>
          <div className="col-sm-4">
            <p className="display-4 text-light">{time}</p>
            <p className="text-lead text-light">Seconds</p>
          </div>
        </div>
      </div>
      <div className="container">
        <label htmlFor="speed" className="text-light font-weight-bold">Select Speed(ms)</label>
        <select className="form-control" name="speed" value={value} onChange={(e) => setValue(e.target.value)}>
          <option>1000</option>
          <option>2000</option>
          <option>3000</option>
          <option>4000</option>
          <option>5000</option>
        </select>
      </div>
      <p className="display-4 text-light text-center">{currentWord}</p>
      <div className="container d-flex align-items-end justify-contents-center" style={{
        height: "20vh"
      }}>
        <input type="text" value={input} className="form-control p-3" onChange={
          (e) => {
            setInput(e.target.value);
            if (input === currentWord) {
              setCorrectCount(prev => prev + 1);
              setInput("");
            }
          }
        } />
      </div>
      <div className="text-center m-5">
        <button className="btn btn-outline-light timer-btn" onClick={
          (e) => {
            interval = setInterval(incrementTime, 1000);
            incrementWordCount();
          }
        }>Start</button>
        <a href="/" className="btn btn-outline-light timer-btn ml-5">Restart</a>
      </div>
    </div>
  )
}

export default App;
