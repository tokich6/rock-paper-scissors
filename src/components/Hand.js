import React from 'react';

function Hand(props) {

  let handStyle = `hand + ${props.type}`;

  return (
    <React.Fragment>
      <button className={handStyle} onClick={() => props.onClick(props.type)}>
        {props.src}
      </button>
    </React.Fragment>
  )

}

export default Hand;