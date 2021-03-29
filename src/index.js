import React, { useState } from "react";
import ReactDOM from "react-dom";
import Board from "./component/Board";
import "./index.css";

const Game = () => {
 
 const [boderState,setBoserState] = useState({
   height: 8,
   width:8,
   mine:10
 })

const changeLevel1 = () => {
  const state = {
    height : 8,
    width: 8,
    mine: 10
  }
  setBoserState(state)
  
}
const changeLevel2 = () => {
  const state = {
    height : 12,
    width: 12,
    mine: 20
  }
  setBoserState(state)
  
}
const changeLevel3 = () => {
  const state = {
    height : 15,
    width: 15,
    mine: 40
  }
  setBoserState(state)
  
}
// console.log(boderState)
  return (
    <div className="game">
      <div className = 'info'>
      <button onClick = {() => changeLevel1()}>beginner</button>
      <button onClick = {() => changeLevel2()}>middle</button>
      <button onClick = {() => changeLevel3()}>expert</button>
      </div>
      
      <Board boderState={boderState}  setBoserState = {setBoserState} />
      <br/>
      
    </div>
  );
};

ReactDOM.render(<Game />, document.getElementById("root"));
