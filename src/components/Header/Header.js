import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ArticleList() {
  const logedPersonSelector = (state) => state.authReducer.logedPerson;
  const logedPerson = useSelector(logedPersonSelector);
  return (
    <header className="header">
      <div className="header__content">
        <NavLink to="/articles" className="header__title">
          Realworld Blog
        </NavLink>
        {logedPerson ? (
          <div className="header__profile">
            <NavLink
              to="/new-article"
              className="header__sign-button header__new-article"
              type="button"
            >
              Create article
            </NavLink>
            <div className="article__name name">{logedPerson.username}</div>
            <img
              className="article__avatar avatar"
              src={`${logedPerson.image}`}
              width="50"
              height="50"
              alt="avatar"
            />
            <NavLink
              to="/new-article"
              className="header__sign-button header__logout"
              type="button"
            >
              Logout
            </NavLink>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
}

export default ArticleList;
