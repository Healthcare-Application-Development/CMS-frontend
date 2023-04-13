import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './Header.css'
import { constants } from '../../constants';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const onLogout = () => {
    localStorage.removeItem("user")
    navigate("/")
  }
    return (
      <div className='fixed w-[100%] z-99999'>
        <Navbar expand="lg" className='navbar-bg'>
          <Navbar.Brand className='navbar-brand-style text-white'>{constants.REACT_APP_NAV_BRAND}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className='nav-collapse-style'>
            <Nav className='nav-style'>
              {user && <Nav.Link onClick={() => onLogout()} className='nav-link-style'>
                <img src={`/${constants.REACT_APP_NAV_LOGOUT_IMG}.png`} alt={constants.REACT_APP_NAV_LOGOUT_IMG} className='nav-img-style'/>
              </Nav.Link>}
              {/* <Nav.Link href="#settings" className='nav-link-style'>
              <img src="/settings.png" alt={constants.REACT_APP_NAV_SETTINGS_IMG} className='nav-img-style'/>
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
      </Navbar>
      </div>
    );
}

export default Header;