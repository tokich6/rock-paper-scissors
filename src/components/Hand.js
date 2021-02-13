import React from 'react';

function Hand(props) {

  let className = `hand + ${props.type}`;
  let imgSrc = `/images/icon-${props.type}.svg`;

  return (
  <button className={className} onClick={()=> props.onClick(props.type) }>
    <img src={imgSrc} alt={props.type}></img>
  </button>)
}

export default Hand;