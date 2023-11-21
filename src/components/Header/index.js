import './index.css'
import {MdHome} from 'react-icons/md'
import {FaEnvelope} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'

const Header = () => (
  <div className="header-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
      alt="website logo"
      className="website-logo"
    />
    <div className="header-icons-container">
      <MdHome className="home-icon" />
      <FaEnvelope className="home-icon" />
      <FiLogOut className="home-icon" />
    </div>
    <ul className="home-jobs-container">
      <li className="home-button">Home</li>
      <li className="home-button">Jobs</li>
    </ul>
    <button type="button" className="logout-button">
      Logout
    </button>
  </div>
)

export default Header
