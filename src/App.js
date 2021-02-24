import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hand from './components/Hand';
import Modal from './components/Modal'
import Button from './components/Button';
import { ReactComponent as Triangle } from './assets/images/bg-triangle.svg';
import { ReactComponent as Paper } from './assets/images/icon-paper.svg';
import { ReactComponent as Rock } from './assets/images/icon-rock.svg';
import { ReactComponent as Scissors } from './assets/images/icon-scissors.svg';


function App() {

  const [score, setScore] = useState(sessionStorage.getItem('localStorageScore') || 0)
  const [playerSelection, setPlayerSelection] = useState('');
  const [computerSelection, setComputerSelection] = useState('');
  const [isWinner, setWinner] = useState('');

  const [gameOn, setGameOn] = useState(false);
  const [showOutcome, setShowOutcome] = useState(false);
  const [isModalVisible, setModal] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('localStorageScore', score);
  }, [score]);

  useEffect(() => {
    setTimeout(() => {
      return updateScore(playerSelection, computerSelection);
    }, 1000)
  }, [playerSelection, computerSelection]);

  const showModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const computerOptions = ['rock', 'paper', 'scissors'];
  const getComputerSelection = () => {
    let random = computerOptions[Math.floor(Math.random() * computerOptions.length)];
    return setComputerSelection(random);
  }

  function playRound(hand) {
    setPlayerSelection(hand)
    getComputerSelection();
    setGameOn(true);
    setTimeout(() => {
      return setShowOutcome(true)
    }, 1000)
  }

  function updateScore(player, computer) {
    if ((player === 'rock' && computer === 'scissors')
      || (player === 'scissors' && computer === 'paper')
      || (player === 'paper' && computer === 'rock')) {
      setWinner('player'); // player wins
      setScore(prevScore => {
        return ++prevScore;
      })
    } else if (player !== computer) { //if not the above and not equal, then comp wins
      console.log('computer');
      setWinner('computer');
      setScore(prevScore => {
        return --prevScore;
      })
    } else { //player === computer or both are ''
      console.log('nothing changes');
      setWinner('draw');
      setScore(prevScore => {
        return prevScore;
      })
    }
  }

  const pickHand = hand => {
    if (hand === 'scissors') {
      return <Scissors />
    } else if (hand === 'rock') {
      return <Rock />;
    } else {
      return <Paper />
    }
  }

  const getWinner = () => {
    if (isWinner === 'player') {
      return 'You win';
    } else if (isWinner === 'computer') {
      return 'You lose';
    } else {
      return "It's a draw";
    }
  }

  const resetHands = () => {
    setPlayerSelection('');
    setComputerSelection('')
    setWinner('');
    setShowOutcome(false);
    setGameOn(false);
  }

  const resetScore = () => {
    sessionStorage.setItem('localStorageScore', 0);
    setScore(0);
  }


  return (
    <React.Fragment>
      <Header score={score} />
      <main className='main-container'>
        <Modal onClick={closeModal} style={{ display: isModalVisible ? 'block' : 'none' }} />

        {
          !gameOn ?
            <section className='playground'>
              <div className='paper-scissors-div'>
                <Hand type='paper' onClick={playRound} src={<Paper />} />
                <Hand type='scissors' onClick={playRound} src={<Scissors />} />
              </div>
              <div className='triangle'>
                <Triangle title='triangle' />
              </div>
              <div className='rock-div'>
                <Hand type='rock' onClick={playRound} src={<Rock />} />
              </div>
            </section>

            :
            <section className='hand-selections'>
            
              <div className='player-selection'>
              <h1>You Picked</h1>
                <Hand type={playerSelection} src={pickHand(playerSelection)} disabled />
              </div>
              {
                showOutcome &&
                <div className='outcome'>
                  <h1 className='outcome-heading'>{
                    getWinner()
                  }</h1>
                  <Button onClick={resetHands} text='Play again'></Button>
                </div>
              }
             
              <div className='house-selection'>
              <h1>The house picked</h1>
                <Hand type={computerSelection} src={pickHand(computerSelection)} disabled />
              </div>
            </section>

        }
      </main>

      <footer>
        <Button text='Reset score' onClick={resetScore} />
        <Button text='Rules' onClick={showModal} />
      </footer>

    </React.Fragment>
  )
}

export default App;