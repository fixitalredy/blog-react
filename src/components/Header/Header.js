import React from 'react';
import './Header.scss';

function ArticleList() {
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__title">Realworld Blog</h1>
        <button
          className="header__sign-button header__sign-button--in"
          type="button"
        >
          Sign In
        </button>
        <button
          className="header__sign-button header__sign-button--up"
          type="button"
        >
          Sign Up
        </button>
      </div>
    </header>
  );
}

export default ArticleList;
