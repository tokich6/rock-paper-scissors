import React from 'react';

function Button(props) {
  return (
    <button className='btn' onClick={props.onModal}
    >{props.text}</button>
  )
}

export default Button;