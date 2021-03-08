import './Footer.css';
import Button from '../Button/Button';



const Footer = ({ isAdvanced, onAdvanced, onReset, onModal }) => {
  return (
    <footer>
      <Button text={!isAdvanced ? 'advanced mode' : 'normal mode'} onClick={onAdvanced} />
      <div>
        <Button text='Reset score' onClick={onReset} />
        <Button text='Rules' onClick={onModal} />
          <a href='https://tonika.tech' target='blank'> &hearts;</a>
      </div>
    </footer>
  )
}

export default Footer;