import { Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchArticles } from '../../store/articlesSlice';
import Main from '../../pages/Main/Main';
import Article from '../../pages/Article/Article';
import Header from '../Header/Header';

import './Blog.scss';

function Blog() {
  const pageSelector = (state) => state.page;
  const page = useSelector(pageSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch, page]);
  return (
    <div className="Blog">
      <Header />
      <main className="main">
        <div className="main__content">
          <Route path="/articles">
            <Main />
          </Route>
          <Route path="/articles/1">
            <Article />
          </Route>
        </div>
      </main>
    </div>
  );
}

export default Blog;

// / и /articles - список всех статей. При клике на заголовок - переход на страницу статьи. Кнопка лайка не активна, т.к. мы не авторизованы.
// /articles/{slug} - Просмотр статьи с полным текстом.
