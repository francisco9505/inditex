import './NavBar.css'
import {Link} from "react-router-dom";
import {Loader} from "./Loader.jsx";

export const NavBar = ({isLoading}) => {

  return (
    <div className='nav-bar'>
      <Link to={'/'}>
        <span className='nav-bar__title'>Podcaster</span>
      </Link>
      {isLoading && <Loader/>}
    </div>
  )
}