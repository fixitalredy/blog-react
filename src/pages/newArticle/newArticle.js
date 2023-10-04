/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { uid } from 'uid';
import './newArticle.scss';
import { useDispatch } from 'react-redux';

import { createArticle } from '../../store/articlesSlice';

function NewArticle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [tags, setTags] = useState([{ id: uid(), value: '' }]);

  function addTag() {
    const newTag = { id: uid(), value: '' };
    setTags([...tags, newTag]);
  }

  function deleteTag(id) {
    const updatedTags = tags.filter((tag) => tag.id !== id);
    setTags(updatedTags);
  }

  function handleTagChange(id, value) {
    const updatedTags = tags.map((tag) =>
      tag.id === id ? { ...tag, value } : tag
    );
    setTags(updatedTags);
  }
  const submitHandler = (data) => {
    const tagsArr = tags.reduce((accumulator, tag) => {
      if (tag.value !== '') {
        accumulator.push(tag.value);
      }
      return accumulator;
    }, []);
    dispatch(createArticle({ ...data, tags: tagsArr }));
  };
  return (
    <section className="main__new-article article">
      <div className="main__new-article-header">
        <h2 className="main__new-article-header">Create new article</h2>
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
              errors.description
                ? 'main__new-article-text new-article-input--invalid'
                : 'main__new-article-text new-article-input'
            }
            placeholder="Text"
            {...register('text', { required: true })}
          />
        </label>
        <div className="main__new-article-tags-column">
          {tags.map((item) => (
            <div className="main__new-article-tag" key={item.id}>
              <input
                className="main__new-article-tag-input new-article-input"
                placeholder="Tag"
                name={`tags[${item.id}]`}
                value={item.value}
                onChange={(e) => handleTagChange(item.id, e.target.value)}
              />
              {tags.length > 1 && (
                <button
                  type="button"
                  className="main__new-article-tag-delete"
                  onClick={() => deleteTag(item.id)}
                >
                  Delete
                </button>
              )}
              <button
                type="button"
                className="main__new-article-tag-add"
                onClick={addTag}
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
        />
      </form>
    </section>
  );
}

export default NewArticle;
