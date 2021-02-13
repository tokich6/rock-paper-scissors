import React from 'react';

function Score(props) {
  return (
    <section className='score'>
      <p>Score</p>
      <p>{props.score}</p>
    </section>
  )
}

export default Score;