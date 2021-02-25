import './Header.css';
import Score from '../Score/Score';
import logo from '../../assets/images/logo.svg';

function Header(props) {
  return (
    <section className='heading'>
      {/* <Logo title='logo'/> */}
      <img  src={logo} alt='rock paper scissors'/>
      <Score score={props.score} />
    </section>
  )
}

export default Header;