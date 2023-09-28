import { Route, Switch, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchArticles } from '../../store/articlesSlice';
import Main from '../../pages/Main/Main';
import Article from '../../pages/Article/Article';
import Header from '../Header/Header';
import SignUp from '../../pages/SignForms/SignUp';
import SignIn from '../../pages/SignForms/SignIn';

import './Blog.scss';

function Blog() {
  const pageSelector = (state) => state.page;
  const page = useSelector(pageSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles(page));
  }, [dispatch, page]);

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
          </Switch>
        </div>
      </main>
    </div>
  );
}

export default Blog;

// / и /articles - список всех статей. При клике на заголовок - переход на страницу статьи. Кнопка лайка не активна, т.к. мы не авторизованы.
// /articles/{slug} - Просмотр статьи с полным текстом.
