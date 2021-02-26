import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Hand from './components/Hand/Hand';
import Modal from './components/Modal/Modal'
import Button from './components/Button/Button';
import Footer from './components/Footer/Footer';
import paper from './assets/images/icon-paper.svg';
import rock from './assets/images/icon-rock.svg';
import scissors from './assets/images/icon-scissors.svg';



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
      return scissors
    } else if (hand === 'rock') {
      return rock;
    } else {
      return paper;
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
  const playerCircleBackground = () => {
    let className = ''
    if (isWinner === 'player') {
      className += 'winner'
    }
    return className;
  }
  const compCircleBackground = () => {
    let className = '';
    if (isWinner === 'computer') {
      className += 'winner'
    }
    return className;
  }

  return (
    <React.Fragment>
      <Header score={score} />
      <Modal onClick={closeModal} style={{ display: isModalVisible ? 'grid' : 'none' }} />

      {
        !gameOn ?
          <section className='playground'>
            <Hand type='paper' onClick={playRound} src={paper} />
            <Hand type='scissors' onClick={playRound} src={scissors} />
            <Hand type='rock' onClick={playRound} src={rock} />
          </section>

          :
          <section className='hand-selections'>

            <div className='player-selection'>
              <h1>You Picked</h1>
              <figure className={playerCircleBackground()}>
                <Hand type={playerSelection} src={pickHand(playerSelection)} disabled />
              </figure>
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
              <figure className={compCircleBackground()}>
                <Hand type={computerSelection} src={pickHand(computerSelection)} disabled />
              </figure>
            </div>
          </section>

      }
      <Footer onReset={resetScore} onModal={showModal} />

    </React.Fragment>
  )
}

export default App;