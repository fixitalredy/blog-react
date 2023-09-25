import React from 'react';
import { useSelector } from 'react-redux/';
import { uid } from 'uid';

import './ArticleList.scss';
import ArticleItem from './ArticleItem/ArticleItem';

function ArticleList() {
  const articlesSelector = (state) => state.articles;
  const articles = useSelector(articlesSelector);

  return (
    <article className="articles">
      {articles.map((article) => (
        <ArticleItem
          key={uid()}
          title={article.title}
          description={article.description}
          favoritesCount={article.favoritesCount}
          tagList={article.tagList}
          author={article.author}
          createdAt={article.createdAt}
          slug={article.slug}
        />
      ))}
    </article>
  );
}

export default ArticleList;
