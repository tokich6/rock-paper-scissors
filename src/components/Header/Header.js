import './Header.css';
import Score from '../Score/Score';
import logo from '../../assets/images/logo.svg';
import logo_bonus from '../../assets/images/logo-bonus.svg';

const Header = ({score, isAdvanced}) => {
  return (
    <section className={`heading ${!isAdvanced ? 'heading-normal' : 'heading-advanced'}`}>
      <img  src={!isAdvanced ? logo : logo_bonus} alt='rock paper scissors'/>
      <Score score={score} />
    </section>
  )
}

export default Header;