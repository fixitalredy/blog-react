import { Route, Switch, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchArticles } from '../../store/articlesSlice';
import Main from '../../pages/Main/Main';
import Article from '../../pages/Article/Article';
import Header from '../Header/Header';
import SignUp from '../../pages/SignForms/SignUp';
import SignIn from '../../pages/SignForms/SignIn';
import Edit from '../../pages/SignForms/Edit';
import { authActions } from '../../store/authSlice';

import './Blog.scss';

function Blog() {
  const dispatch = useDispatch();
  // eslint-disable-next-line react-redux/useSelector-prefer-selectors
  const isLogged = useSelector((state) => state.authReducer.isLogged);

  useEffect(() => {
    if (isLogged) {
      dispatch(authActions.setUser());
    }
  }, [dispatch, isLogged]);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.user) {
      dispatch(authActions.setLogged(true));
      dispatch(authActions.setUser(JSON.parse(localStorage.user)));
    } else dispatch(authActions.setLogged(false));
  }, [dispatch]);

  return (
    <div className="Blog">
      <Header />
      <main className="main">
        <div className="main__content">
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/articles" />} />
            <Route path="/articles" exact component={Main} />
            <Route path="/articles/:slug" component={Article} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/profile" component={Edit} />
          </Switch>
        </div>
      </main>
    </div>
  );
}

export default Blog;
