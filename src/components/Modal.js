import { ReactComponent as CloseIcon } from '../assets/images/icon-close.svg';
import { ReactComponent as Rules } from '../assets/images/image-rules.svg';


function Modal(props) {
  return (
    <section className='modal-container' style={props.style}>
      <div className='modal-heading'>
        <h1>Rules</h1>
        <div onClick={props.onClick} className='close-icon'>
          <CloseIcon title='icon-close' />
        </div>
      </div>
      <div className='image-rules'>
        <Rules title='game rules' />
      </div>

    </section>
  )
}

export default Modal;