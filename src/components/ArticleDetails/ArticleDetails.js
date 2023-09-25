import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ArticleItem from '../ArticleList/ArticleItem/ArticleItem';
import './ArticleDetails.scss';

function ArticleDetails() {
  const params = useParams();
  const articlesSelector = (state) => state.articles;
  const articles = useSelector(articlesSelector);
  const article = articles.find((a) => a.slug === params.slug);

  return (
    <ArticleItem
      title={article.title}
      description={article.description}
      favoritesCount={article.favoritesCount}
      tagList={article.tagList}
      author={article.author}
      createdAt={article.createdAt}
      slug={article.slug}
      classname="main__article"
    />
  );
}

export default ArticleDetails;
