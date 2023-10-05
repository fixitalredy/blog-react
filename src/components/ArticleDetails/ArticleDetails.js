/* eslint-disable react-redux/useSelector-prefer-selectors */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ArticleItem from '../ArticleList/ArticleItem/ArticleItem';

import './ArticleDetails.scss';

function ArticleDetails() {
  const params = useParams();

  const loggedPerson = useSelector((state) => state.authReducer.loggedPerson);

  const [currentArticle, setCurrentArticle] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getArticle = async (slug) => {
    let config;
    if (loggedPerson) {
      config = {
        headers: {
          Authorization: `Bearer ${loggedPerson.token}`,
        },
      };
    }
    try {
      const response = await axios.get(`/articles/${slug}`, config);
      const result = response.data.article;
      setCurrentArticle(result);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  useEffect(() => {
    const fetchFunc = () => {
      getArticle(params.slug);
    };
    fetchFunc();
  }, [getArticle, params.slug]);

  if (currentArticle) {
    return (
      <ArticleItem
        title={currentArticle.title}
        description={currentArticle.description}
        favoritesCount={currentArticle.favoritesCount}
        tagList={currentArticle.tagList}
        author={currentArticle.author}
        createdAt={currentArticle.createdAt}
        slug={currentArticle.slug}
        body={currentArticle.body}
        detailed
      />
    );
  }
}

export default ArticleDetails;
