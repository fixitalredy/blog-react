/* eslint-disable react-redux/useSelector-prefer-selectors */
import { Route, Switch, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Main from '../../pages/Main/Main';
import Article from '../../pages/Article/Article';
import Header from '../Header/Header';
import SignUp from '../../pages/SignForms/SignUp';
import SignIn from '../../pages/SignForms/SignIn';
import Edit from '../../pages/SignForms/Edit';
import { authActions } from '../../store/authSlice';
import { fetchArticles } from '../../store/articlesSlice';
import CreateArticle from '../../pages/Article/CreateArticle';
import EditArticle from '../../pages/Article/EditArticle';

import './Blog.scss';

function Blog() {
  const dispatch = useDispatch();
  const articlePost = useSelector((state) => state.articlesReducer.articlePost);
  const isLogged = useSelector((state) => state.authReducer.isLogged);
  useEffect(() => {
    if (localStorage.user) {
      dispatch(authActions.setLogged(true));
      dispatch(fetchArticles());
    } else {
      dispatch(authActions.setLogged(false));
      dispatch(fetchArticles());
    }
  }, [dispatch, articlePost, isLogged]);

  return (
    <div className="Blog">
      <Header />
      <main className="main">
        <div className="main__content">
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/articles" />} />
            <Route path="/articles" exact component={Main} />
            <Route path="/articles/:slug" exact component={Article} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/profile" component={Edit} />
            <Route path="/new-article" component={CreateArticle} />
            <Route path="/articles/:slug/edit" component={EditArticle} />
          </Switch>
        </div>
      </main>
    </div>
  );
}

export default Blog;
