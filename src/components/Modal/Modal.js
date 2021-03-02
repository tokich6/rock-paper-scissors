import './Modal.css';
import { ReactComponent as CloseIcon } from '../../assets/images/icon-close.svg';


const Modal = ({style, onClick, imgSrc }) => {
  return (
    <section className='modal-container' style={style}>
      <div className='modal-heading'>
        <h1>Rules</h1>
        <div onClick={onClick} className='close-icon'>
          <CloseIcon title='icon-close' />
        </div>
      </div>
      <div className='image-rules'>
        {imgSrc}
      </div>

    </section>
  )
}

export default Modal;