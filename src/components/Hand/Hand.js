import React from 'react';
import './Hand.css';

function Hand(props) {

  let handStyle = `hand ${props.type} ${!props.isAdvanced ? 'hand-normal' : 'hand-advanced'}`;

  return (
    <React.Fragment>
      <button className={handStyle} onClick={() => props.onClick(props.type)} disabled={props.disabled}>
        <span className='img-wrapper'>
          <img src={props.src} alt={props.type} />
        </span>
      </button>

    </React.Fragment>
  )

}

export default Hand;