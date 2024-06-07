import { Link } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
  return (
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/forum">Forum</Link>
      <Link to="/repo">Source</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default NavBar;