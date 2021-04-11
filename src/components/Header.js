import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <Link to="/" className="header__logo"></Link>
      <Link to="/sign-up" className="header__link">
        Регистрация
      </Link>
    </header>
  );
}

export default Header;
