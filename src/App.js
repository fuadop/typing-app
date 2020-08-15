import React, {useState, useEffect} from 'react';
import {get} from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faGithub, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Loader from './Loader';

function App() {
  //utils
  const bg = "./bg.jpg";
  const url = "https://random-word-api.herokuapp.com/all";

  //states
  const [input, setInput] = useState("");
  const [value, setValue] = useState("3000");
  const [time, setTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //funtions
  let currentCount =0;
  let clear;
  const incrementTime = ()=>{
    currentCount++;
    setTime(currentCount);
  }

  const getArray = async ()=>{
    const res = await get(url);
    setWords(res.data);
    console.log(res.data);
    setIsLoading(false);
  }

  const generateWords = ()=>{
    const index = Math.floor(Math.random()*178187);
    setCurrentWord(words[index]);
  }

  const incrementWordCount =()=>{
    setInterval(()=>{
      generateWords();
      setInput("");
      setWordCount(prev => prev+1);
    },value);
  }

  //init state
  useEffect(()=>{
    getArray();
  },[]);

  if(isLoading){
    return(
      <div className="container-fluid d-flex" style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
      }} >
        <div className="container m-auto">
          <Loader/>
        </div>
        <div className="container ml-auto mb-auto">
          <Loader/>
        </div>
      </div>
    )
  }else{
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
                <a href="https://github.com/fuadop" target="_blank" rel="noopener noreferrer" className="nav-link text-light"><FontAwesomeIcon icon={faGithub}  /></a>
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
          <select className="form-control" name="speed" value={value} onChange={(e)=>setValue(e.target.value)}>
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
          <input type="text" value= {input} className="form-control p-3" onChange={
            (e) => {
              setInput(e.target.value);
              if(input == currentWord){
                setCorrectCount(prev => prev+1);
                setInput("");
              }
            }
          }/>
        </div>
        <div className="text-center m-5">
        <button className="btn btn-outline-light timer-btn" onClick = {
          (e)=>{
            clear = setInterval(incrementTime,1000);
            incrementWordCount();
          }
        }>Start</button>
        <a href="/" className="btn btn-outline-light timer-btn ml-5">Restart</a>
        </div>
      </div>
    )
  }
}

export default App;
