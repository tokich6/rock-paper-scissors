import './Footer.css';
import Button from '../Button/Button';



function Footer(props) {
  return (
    <footer>
      <Button text='Reset score' onClick={props.onReset} />
      <Button text='Rules' onClick={props.onModal} />
    </footer>
  )
}

export default Footer;