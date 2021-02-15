import React from 'react';


function Modal(props) {
  return (
    <section className='modal-container' style={props.style}>
    <div className='modal-heading'>
    <h1>Rules</h1>
    <div onClick={props.onClick} className='close-icon'>
    <img src='/images/icon-close.svg' alt='close'></img>
    </div>
    </div>
    
   
      <div className='image-rules'>
      <img src='/images/image-rules.svg' alt='rules' ></img>
      </div>
      
    </section>
  )
}

export default Modal;