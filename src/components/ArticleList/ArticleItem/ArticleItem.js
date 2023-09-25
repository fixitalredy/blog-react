import React from 'react';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

import './ArticleItem.scss';

function ArticleItem({
  classname,
  title,
  description,
  favoritesCount,
  tagList,
  author,
  createdAt,
  slug,
}) {
  const tags = tagList.map((tag) => (
    <div className="article__tag" key={tag}>
      {tag}
    </div>
  ));
  console.log(classname);
  const cutDescription = (desc) => {
    if (desc.length < 221) {
      return desc;
    }
    const newDesc = desc.substring(0, 221);
    return `${newDesc.slice(0, newDesc.lastIndexOf(' '))}...`;
  };

  const formatedDate = format(new Date(createdAt), 'MMMM d, yyyy');

  return (
    <article
      className={`${
        classname.length !== 0 ? classname : 'articles__article'
      } article`}
    >
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
      <div className="article__description">{cutDescription(description)}</div>
    </article>
  );
}
ArticleItem.defaultProps = {
  classname: '',
};

export default ArticleItem;
