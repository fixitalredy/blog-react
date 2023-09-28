/* eslint-disable react/no-children-prop */
import React from 'react';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import './ArticleItem.scss';

function ArticleItem({
  title,
  description,
  favoritesCount,
  tagList,
  author,
  createdAt,
  slug,
  detailed,
  body,
}) {
  const classnamesArticle = classNames('article', {
    articles__article: !detailed,
    main__article: detailed,
  });
  const classnamesTag = classNames('article__tag', {
    'article__tag--detailed': detailed,
  });
  const classnamesDescription = classNames('article__description', {
    'article__description--detailed': detailed,
  });
  const tags = tagList.map((tag) => (
    <div className={classnamesTag} key={tag}>
      {tag}
    </div>
  ));
  const cutDescription = (desc) => {
    if (desc.length < 221) {
      return desc;
    }
    const newDesc = desc.substring(0, 221);
    return `${newDesc.slice(0, newDesc.lastIndexOf(' '))}...`;
  };
  const formatedDate = format(new Date(createdAt), 'MMMM d, yyyy');
  // eslint-disable-next-line quotes
  return (
    <article className={classnamesArticle}>
      <div className="article__header">
        <div className="article__meta">
          <div className="article__subheader">
            <Link className="article__title" to={`/articles/${slug}`}>
              {title}
            </Link>
            <div className="article__like">{favoritesCount}</div>
          </div>
          <div className="article__tags"> {tags}</div>
        </div>
        <div className="article__profile-info">
          <div className="article__text">
            <div className="article__name name">{author.username}</div>
            <div className="article__date">{formatedDate}</div>
          </div>
          <img
            className="article__avatar avatar"
            src={`${author.image}`}
            width="50"
            height="50"
            alt="avatar"
          />
        </div>
      </div>
      <div className={classnamesDescription}>{cutDescription(description)}</div>
      <ReactMarkdown className="article__body" remarkPlugins={[remarkGfm]}>
        {body}
      </ReactMarkdown>
    </article>
  );
}
ArticleItem.defaultProps = {
  classname: '',
};

export default ArticleItem;
