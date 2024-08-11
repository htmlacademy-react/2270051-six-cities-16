import {Link} from 'react-router-dom';
import Logo from '../../components/logo/logo';
import {logout} from '../../store/user-slice';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {AppRoute, AuthorizationStatus} from '../../const';

function Header() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const authorizationUser = useAppSelector((state) => state.user.authorizationUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.AUTH ? (
                <>
                  <li className="header__nav-item user">
                    <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img src={authorizationUser?.avatarUrl} alt="User avatar" />
                      </div>
                      <span className="header__user-name user__name">{authorizationUser?.email}</span>
                      <span className="header__favorite-count">3</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link to="/" className="header__nav-link" onClick={handleLogout}>
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </>
              ) : (
                <li className="header__nav-item user">
                  <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
