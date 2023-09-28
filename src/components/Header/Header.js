import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';

function ArticleList() {
  return (
    <header className="header">
      <div className="header__content">
        <NavLink to="/articles" className="header__title">
          Realworld Blog
        </NavLink>
        <NavLink
          to="/sign-in"
          className="header__sign-button header__sign-button--in"
          type="button"
        >
          Sign In
        </NavLink>
        <NavLink
          to="/sign-up"
          className="header__sign-button header__sign-button--up"
          type="button"
        >
          Sign Up
        </NavLink>
      </div>
    </header>
  );
}

export default ArticleList;
