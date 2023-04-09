import { useState } from 'react';
import { Link, useLocation, Routes, Route} from 'react-router-dom';
import logo from '../images/mesto-logo.png';

function Header({ logout, isLoggedIn, userEmail }) {

  const [menuButtonActive, setMenuButtonActive] = useState(false);

  const location = useLocation();

  const handleMenu = () => {
    setMenuButtonActive(!menuButtonActive);
  }

  return (
        <header className="header">
          <nav className="header__nav">
            <div className={`header__wrapper ${location.pathname === '/' ? "header__wrapper_column" : 'header__wrapper_row'}`}>
              <div className="header__logo-wrapper">
                <Link to="/" className="header__brand">
                  <img src={logo} alt="Логотип Место, Росссия" className="header__logo" />
                </Link>
                {isLoggedIn && (
                  <button
                    className={menuButtonActive ? 
                      "header__menu-button header__menu-button_active" : 
                      "header__menu-button"}
                    type="button"
                    onClick={handleMenu}
                  />
                )}
              </div>
                <Routes>
                  <Route path='/sign-up' element={!isLoggedIn && (
                    <Link to="/sign-in" className="header__auth-link">Войти</Link>
                  )}/>
                  <Route path='/sign-in' element={!isLoggedIn && (
                    <Link to="/sign-up" className="header__auth-link">Регистрация</Link>
                  )}/>
                  <Route path="/" element={isLoggedIn && (
                    <div className={menuButtonActive ? "header__menu header__menu_open" : "header__menu"}>
                    <p className="header__email">{userEmail}</p>
                        <button onClick={logout} className="header__auth-link header__auth-link_logout">
                            Выйти
                        </button>
                    </div>
                  )}/>
                </Routes>
            </div>
          </nav>
        </header>
  );
};

export default Header;