import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {useNavigate, Link} from 'react-router-dom';
import Logo from '../../components/logo/logo';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {isValidPassword} from './utils';
import {login} from '../../store/user-slice';
import {AppRoute, AuthorizationStatus, LOGIN_FAILED_MESSAGE, PASSWORD_ERROR_MESSAGE} from '../../const';
import {clearError, setError} from '../../store/actions';

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const error = useAppSelector((state) => state.user.error);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }
  }, [authorizationStatus, navigate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValidPassword(password)) {
      dispatch(setError(PASSWORD_ERROR_MESSAGE));
      return;
    }
    dispatch(clearError());
    dispatch(login({ email, password }))
      .then(() => {
        navigate(AppRoute.Root);
      })
      .catch(() => {
        dispatch(setError(LOGIN_FAILED_MESSAGE));
      });
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#" method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              {error && <p className="login__error">{error}</p>}
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Root}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
