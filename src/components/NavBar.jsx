import './NavBar.css'
import {Link} from "react-router-dom";

export const NavBar = () => {

  return (
    <div className='nav-bar'>
      <Link to={'/'}>
        <span className='nav-bar__title'>Podcaster</span>
      </Link>
    </div>
  )
}