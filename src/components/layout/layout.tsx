import React from 'react';
import {useLocation} from 'react-router-dom';
import Header from '../header/header';
import {AppRoute} from '../../const';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({children}: LayoutProps) {
  const location = useLocation();

  const isMainPage = location.pathname === AppRoute.Root;
  const isLoginPage = location.pathname === AppRoute.Login;
  const isOfferPage = location.pathname === AppRoute.Offer;

  let pageClasses = 'page';

  if (isMainPage) {
    pageClasses += ' page--gray page--main';
  }

  if (isLoginPage) {
    pageClasses += ' page--gray page--login';
  }

  if (isOfferPage) {
    pageClasses += ' page__main--offer';
  }

  return (
    <div className={pageClasses}>
      {!isLoginPage && <Header />}
      {children}
    </div>
  );
}

export default Layout;
