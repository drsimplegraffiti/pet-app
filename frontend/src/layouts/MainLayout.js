import { Link, Outlet } from 'react-router-dom';
import './nav.css';
import { useState } from 'react';

export default function MainLayout() {
  //change navbar color onscroll
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 640) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener('scroll', changeBackground);

  return (
    <>
      <nav className={navbar ? 'nav-bar onscroll' : 'nav-bar'}>
        <ul>
          <li className="logo">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/drsimple/image/upload/v1662472046/vector_gv3npk.jpg"
                alt="animal"
                class="hero-img"
              />
            </Link>
          </li>

          {/* <li>
            <Link to="login"> Log In</Link>
          </li>
          <li>
            <Link to="signup"> Sign Up</Link>
          </li> */}
          <li>
            <Link to="upload">Upload </Link>
          </li>
          <li>
            <Link to="all-animals">Animals </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
