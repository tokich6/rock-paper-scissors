import React from 'react';
import Score from './Score';

function Header(props) {
  return (
    <section className='heading'>
      <header>
      <img src='/images/logo.svg' alt='logo'></img>
      </header>
      <Score score={props.score}/>
    </section>
  )
}

export default Header;