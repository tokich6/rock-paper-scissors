import React, { useState } from 'react';
import Header from './Header';
import Hand from './Hand';
import Modal from './Modal'
import Button from './Button';


function App() {

  const [score, setScore] = useState(0);

  let playerSelection = '';
  let computerSelection = '';
  const computerOptions = ['rock', 'paper', 'scissors'];

  function getComputerSelection() {
    computerSelection = computerOptions[Math.floor(Math.random() * computerOptions.length)]
  }
  function playRound(hand) {
    playerSelection = hand;
    console.log(`Player selected: ${playerSelection}`)
    getComputerSelection();
    console.log(`Computer selected: ${computerSelection}`);
    updateScore(playerSelection, computerSelection)
  }
  function updateScore(playerSelection, computerSelection) {
    if ((playerSelection === 'rock' && computerSelection === 'scissors')
      || (playerSelection === 'scissors' && computerSelection === 'paper')
      || (playerSelection === 'paper' && computerSelection === 'rock')) {
      console.log('player wins + 1')
      setScore(prevScore => {
        return prevScore + 1;
      })
    } else if (playerSelection === computerSelection){
      console.log('even')
    } else {
      console.log('computer wins')
      setScore(prevScore => {
        return prevScore - 1;
      })
    }
  }

  function showModal(){
    console.log('rules clicked')
  }


  return (
    <div>
      <Header score={score} />
      {/* <Modal /> */}

      <img src='/images/bg-triangle.svg' alt='triangle'></img>
      <section className='playground'>
        <Hand type='paper' onClick={playRound} />
        <Hand type='scissors' onClick={playRound} />
        <Hand type='rock' onClick={playRound} />
      </section>
     <Button text='Rules' onModal={showModal}/>
    </div>


  )
  // Score
  // Rules

  // You Picked
  // The House Picked

  // You Win
  // You Lose

  // Play Again
}

export default App;