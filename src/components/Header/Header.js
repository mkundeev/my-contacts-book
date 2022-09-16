import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/selectors';
import UserMenu from 'components/UserMenu';
import s from './Header.module.css';

export default function Header() {
  const isLogin = useSelector(getIsLoggedIn);
  const activeLink = ({ isActive }) => (isActive ? s.linkActive : s.link);

  return (
    <>
      <header className={s.header}>
        <div className={s.logo}>
          <span className={s.logoSpan}>Phone</span>book
        </div>
        <div className={s.hederLinkWrap}>
          {!isLogin ? (
            <ul className={s.hederList}>
              <li className={s.hederListItem}>
                <NavLink to="/authorization" className={activeLink}>
                  Log In
                </NavLink>
              </li>
              <li className={s.hederListItem}>
                <NavLink to="/registration" className={activeLink}>
                  Registration
                </NavLink>
              </li>
            </ul>
          ) : (
            <UserMenu />
          )}
        </div>
      </header>
      <div className={s.headerBottomLine}></div>
    </>
  );
}
