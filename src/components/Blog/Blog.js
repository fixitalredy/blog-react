import { Route, Switch, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Main from '../../pages/Main/Main';
import Article from '../../pages/Article/Article';
import Header from '../Header/Header';
import SignUp from '../../pages/SignForms/SignUp';
import SignIn from '../../pages/SignForms/SignIn';
import Edit from '../../pages/SignForms/Edit';
import { authActions } from '../../store/authSlice';
import { fetchArticles } from '../../store/articlesSlice';
import newArticle from '../../pages/newArticle/newArticle';

import './Blog.scss';

function Blog() {
  const dispatch = useDispatch();
  // eslint-disable-next-line react-redux/useSelector-prefer-selectors

  useEffect(() => {
    if (localStorage.user) {
      dispatch(authActions.setLogged(true));
      dispatch(fetchArticles());
    } else {
      dispatch(authActions.setLogged(false));
      dispatch(fetchArticles());
    }
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
            <Route path="/new-article" component={newArticle} />
          </Switch>
        </div>
      </main>
    </div>
  );
}

export default Blog;
