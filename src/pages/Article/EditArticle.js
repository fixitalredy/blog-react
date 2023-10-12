/* eslint-disable react/function-component-definition */
/* eslint-disable func-names */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';
import { Spin } from 'antd';
import axios from 'axios';

import ArticleForm from '../../components/ArticleForm/ArticleForm';

function EditArticle() {
  const [currentArticle, setCurrentArticle] = useState({
    slug: '',
    title: '',
    description: '',
    body: '',
    tags: [''],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false,
    },
  });
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const history = useHistory();

  const getArticle = useCallback(async (slug) => {
    setLoading(true);
    let config;
    try {
      const response = await axios.get(`/articles/${slug}`, config);
      const result = response.data.article;
      setCurrentArticle(result);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    const fetchFunc = () => {
      getArticle(params.slug);
    };
    fetchFunc();
  }, [getArticle, params.slug]);

  useEffect(() => {
    if (
      currentArticle.author.username !== JSON.parse(localStorage.user).username
    ) {
      history.replace('/articles');
    }
  }, [currentArticle, history]);
  if (loading) {
    return <Spin size="large" />;
  }
  return <ArticleForm editing article={currentArticle} />;
}

export default EditArticle;
