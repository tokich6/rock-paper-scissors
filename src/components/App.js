import React, { useState, useEffect } from 'react';
import Header from './Header';
import Hand from './Hand';
import Modal from './Modal'
import Button from './Button';


function App() {

  const [score, setScore] = useState(0);
  const [playerSelection, setPlayerSelection] = useState('');
  const [computerSelection, setComputerSelection] = useState('');
  const [isWinner, setWinner] = useState(false);

  const [gameOn, setGameOn] = useState(false);
  const [isModalVisible, setModal] = useState(false);

  const computerOptions = ['rock', 'paper', 'scissors'];

  const showModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const getComputerSelection = () => {
    let random = computerOptions[Math.floor(Math.random() * computerOptions.length)];
    return setComputerSelection(random);
  }

  function playRound(hand) {
    setPlayerSelection(hand)
    getComputerSelection();
    setGameOn(true);
  }

  useEffect(() => {
    updateScore(playerSelection, computerSelection);
  }, [playerSelection, computerSelection]);

  function updateScore(player, computer) {
    if ((player === 'rock' && computer === 'scissors')
      || (player === 'scissors' && computer === 'paper')
      || (player === 'paper' && computer === 'rock')) {
      setWinner(true); // player wins
      setScore(prevScore => {
        return prevScore + 1;
      })
    } else if (player !== computer) { //if not the above and not equal, then comp wins
      console.log('comp wins!')
      setScore(prevScore => {
        return prevScore - 1;
      })

    } else { //player === computer or both are ''
        console.log('nothing changes');
        setScore(prevScore => {
          return prevScore;
        })
    }
  }

  function resetHands() {
    setPlayerSelection('');
    setComputerSelection('')
    isWinner && setWinner(false);
    setGameOn(false);
  }


  return (
    <div>
      <Header score={score} />
      <Modal onClick={closeModal} style={{ display: isModalVisible ? 'block' : 'none' }} />

      {
        !gameOn ?
          <section className='playground'>
            <div className='paper-scissors-div'>
              <Hand type='paper' onClick={playRound} />
              <Hand type='scissors' onClick={playRound} />
            </div>
            <div className='triangle'>
              <img src='/images/bg-triangle.svg' alt='triangle'></img>
            </div>
            <div className='rock-div'>
              <Hand type='rock' onClick={playRound} />
            </div>
          </section>
          :
          <section>
            <h1>You Picked</h1>
            <Hand type={playerSelection} />
            <h1>The house picked</h1>
            <Hand type={computerSelection} />
            <h1>{
              isWinner ? 'You win' : 'You lose'
            }</h1>
            <button onClick={resetHands}>Play again</button>
          </section>

      }

      <Button text='Rules' onClick={showModal} />
    </div>
  )
}

export default App;