import React, { useState, useEffect } from 'react';
// components
import Header from './components/Header/Header';
import Hand from './components/Hand/Hand';
import Modal from './components/Modal/Modal'
import Button from './components/Button/Button';
import Footer from './components/Footer/Footer';
// images
import paper from './assets/images/icon-paper.svg';
import rock from './assets/images/icon-rock.svg';
import scissors from './assets/images/icon-scissors.svg';
import lizard from './assets/images/icon-lizard.svg';
import spock from './assets/images/icon-spock.svg';
import { ReactComponent as Rules } from './assets/images/image-rules.svg';
import { ReactComponent as AdvancedRules } from './assets/images/image-rules-bonus.svg';
import './App.css';


function App() {

  const [score, setScore] = useState(sessionStorage.getItem('localStorageScore') || 0)
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [playerSelection, setPlayerSelection] = useState('');
  const [computerSelection, setComputerSelection] = useState('');
  const [isWinner, setWinner] = useState('');

  const [gameOn, setGameOn] = useState(false);
  const [isCompSelectionBlank, setIsCompSelectionBlank] = useState(true);
  const [showOutcome, setShowOutcome] = useState(false);
  const [isModalVisible, setModal] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('localStorageScore', score);
  }, [score]);

  useEffect(() => {
    setTimeout(() => {
      return updateScore(playerSelection, computerSelection);
    }, 5000)
  }, [playerSelection, computerSelection]);


  const playRound = hand => {
    setPlayerSelection(hand)
    getComputerSelection();
    setGameOn(true);
    setTimeout(() => {
      return setIsCompSelectionBlank(false)
    }, 4000)
    setTimeout(() => {
      return setShowOutcome(true)
    }, 5000)
  }

  const getComputerSelection = () => {
    let computerOptions = [];
    if (!isAdvanced) {
      computerOptions = ['rock', 'paper', 'scissors'];
    } else {
      computerOptions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    }
    let random = computerOptions[Math.floor(Math.random() * computerOptions.length)];
    return setComputerSelection(random);
  }

  const pickHand = hand => {
    if (hand === 'scissors') {
      return scissors;
    } else if (hand === 'rock') {
      return rock;
    } else if (hand === 'paper') {
      return paper;
    } else if (hand === 'lizard') {
      return lizard;
    } else {
      return spock;
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

  const updateScore = (player, computer) => {
    if ((player === 'rock' && computer === 'scissors')
      || (player === 'scissors' && computer === 'paper')
      || (player === 'paper' && computer === 'rock')
      || (player === 'rock' && computer === 'lizard')
      || (player === 'lizard' && computer === 'spock')
      || (player === 'spock' && computer === 'scissors')
      || (player === 'spock' && computer === 'rock')
      || (player === 'scissors' && computer === 'lizard')
      || (player === 'lizard' && computer === 'paper')
      || (player === 'paper' && computer === 'spock')) {
      setWinner('player');
      setScore(prevScore => {
        return ++prevScore;
      })
    } else if (player !== computer) { //if not the above and not equal, then comp wins
      setWinner('computer');
      setScore(prevScore => {
        return --prevScore;
      })
    } else { //player === computer or both are ''
      setWinner('draw');
      setScore(prevScore => {
        return prevScore;
      })
    }
  }

  const resetGame = () => {
    setPlayerSelection('');
    setComputerSelection('')
    setWinner('');
    setShowOutcome(false);
    setIsCompSelectionBlank(true);
    setGameOn(false);
  }

  // modal & footer props
  const showModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const toggleAdvancedMode = () => {
    if (!isAdvanced) {
      setIsAdvanced(true);
    } else {
      setIsAdvanced(false);
    }
  }

  const resetScore = () => {
    sessionStorage.setItem('localStorageScore', 0);
    setScore(0);
  }


  return (
    <React.Fragment>
      <Header score={score} isAdvanced={isAdvanced} />
      <Modal onClick={closeModal} imgSrc={!isAdvanced ? <Rules /> : <AdvancedRules />} style={{ display: isModalVisible ? 'grid' : 'none' }} />

      {
        !gameOn ?
          <section className={`playground ${!isAdvanced ? 'playground-normal' : 'playground-advanced'}`}>
            {
              !isAdvanced ?
                <React.Fragment>
                  <Hand type='paper' onClick={playRound} src={paper} isAdvanced={isAdvanced} />
                  <Hand type='scissors' onClick={playRound} src={scissors} isAdvanced={isAdvanced} />
                  <Hand type='rock' onClick={playRound} src={rock} isAdvanced={isAdvanced} />
                </React.Fragment>
                :
                <React.Fragment>
                  <Hand type='spock' onClick={playRound} src={spock} isAdvanced={isAdvanced} />
                  <Hand type='scissors' onClick={playRound} src={scissors} isAdvanced={isAdvanced} />
                  <Hand type='paper' onClick={playRound} src={paper} isAdvanced={isAdvanced} />
                  <Hand type='lizard' onClick={playRound} src={lizard} isAdvanced={isAdvanced} />
                  <Hand type='rock' onClick={playRound} src={rock} isAdvanced={isAdvanced} />
                </React.Fragment>
            }
          </section>
          :
          <section className='hand-selections'>
            <div className='player-selection'>
              <h1>You Picked</h1>
              <figure className={isWinner === 'player' ? 'winner' : ''} >
                <Hand type={playerSelection} src={pickHand(playerSelection)} disabled />
              </figure>
            </div>

            {
              showOutcome &&
              <div className='outcome'>
                <h1 className='outcome-heading'>{
                  getWinner()
                }</h1>
                <Button onClick={resetGame} text='Play again'></Button>
              </div>
            }

            <div className='house-selection'>
              <h1>The house picked</h1>
              {
                isCompSelectionBlank ? <Hand type='blank' src='' disabled />
                  :
                  <figure className={isWinner === 'computer' ? 'winner' : ''}>
                    <Hand type={computerSelection} src={pickHand(computerSelection)} disabled />
                  </figure>
              }
            </div>
          </section>
      }

      <Footer onReset={resetScore} onModal={showModal} onAdvanced={toggleAdvancedMode} isAdvanced={isAdvanced} />

    </React.Fragment>
  )
}

export default App;