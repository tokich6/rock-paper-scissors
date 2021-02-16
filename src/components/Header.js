import Score from './Score';
import { ReactComponent as Logo } from '../assets/images/logo.svg';

function Header(props) {
  return (
    <section className='heading'>
      <Logo title='logo'/>
      <Score score={props.score} />
    </section>
  )
}

export default Header;