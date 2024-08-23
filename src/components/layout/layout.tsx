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

  const pageClasses = isMainPage ? 'page page--gray page--main' : 'page';

  return (
    <div className={pageClasses}>
      {!isLoginPage && <Header />}
      <main>{children}</main>
    </div>
  );
}

export default Layout;
