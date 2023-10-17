/* eslint-disable react-redux/useSelector-prefer-selectors */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { uid } from 'uid';
import './newArticle.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { Alert } from 'antd';

import {
  articlesActions,
  createArticle,
  updateArticle,
  fetchArticles,
} from '../../store/articlesSlice';

function ArticleForm({ editing, article }) {
  const history = useHistory();
  const articlePost = useSelector((state) => state.articlesReducer.articlePost);
  const params = useParams();
  // eslint-disable-next-line no-unused-vars
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tags: editing ? article.tagList : [' '],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });
  const dispatch = useDispatch();

  const submitHandler = (data) => {
    if (!editing) {
      dispatch(createArticle(data));
    } else {
      dispatch(
        updateArticle({
          updatedData: data,
          slug: params.slug,
        })
      );
    }
  };
  useEffect(() => {
    if (articlePost === 'resolved') {
      history.replace('/articles');
      dispatch(fetchArticles());
    }
  }, [articlePost, dispatch, history]);
  useEffect(
    () => () => dispatch(articlesActions.resetArticlePost()),
    [dispatch]
  );
  return (
    <section className="main__new-article article">
      <div className="main__new-article-header">
        <h2 className="main__new-article-header">
          {editing ? 'Edit Article' : 'Create new article'}
        </h2>
      </div>
      <form
        className="main__new-article-form"
        onSubmit={handleSubmit(submitHandler)}
      >
        <label htmlFor="title">
          Title
          <input
            id="title"
            name="title"
            className={
              errors.title
                ? 'main__new-article-title new-article-input--invalid'
                : 'main__new-article-title new-article-input'
            }
            placeholder="Title"
            defaultValue={editing ? article.title : ''}
            {...register('title', { required: true })}
          />
        </label>
        <label htmlFor="description">
          Short Description
          <input
            id="description"
            name="description"
            className={
              errors.description
                ? 'main__new-article-description new-article-input--invalid'
                : 'main__new-article-description new-article-input'
            }
            defaultValue={editing ? article.description : ''}
            placeholder="Short Description"
            {...register('description', { required: true })}
          />
        </label>
        <label htmlFor="text">
          Text
          <textarea
            id="text"
            name="text"
            className={
              errors.text
                ? 'main__new-article-text new-article-input--invalid'
                : 'main__new-article-text new-article-input'
            }
            defaultValue={editing ? article.body : ''}
            placeholder="Text"
            {...register('text', { required: true })}
          />
        </label>
        <div className="main__new-article-tags-column">
          {fields.map((item, index) => (
            <div className="main__new-article-tag" key={uid()}>
              <input
                className="main__new-article-tag-input new-article-input"
                placeholder="Tag"
                {...register(`tags.${index}`)}
              />
              {fields.length > 1 && (
                <button
                  type="button"
                  className="main__new-article-tag-delete"
                  onClick={() => remove(index)}
                >
                  Delete
                </button>
              )}
              <button
                type="button"
                className="main__new-article-tag-add"
                onClick={() => append('')}
              >
                Add tag
              </button>
            </div>
          ))}
        </div>
        <input
          type="submit"
          className="main__new-article-submit"
          value="Send"
          disabled={articlePost === 'loading'}
        />
      </form>
      {articlePost === 'rejected' && (
        <Alert
          message="Error"
          description="Server responsed with error"
          type="error"
        />
      )}
    </section>
  );
}

export default ArticleForm;
