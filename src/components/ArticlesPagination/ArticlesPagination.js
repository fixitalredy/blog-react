import React from 'react';
import { Pagination } from 'antd';
import { useDispatch } from 'react-redux';

import { articlesActions } from '../../store/articlesSlice';

function ArticlesPagination() {
  const dispatch = useDispatch();
  const pageHandler = (key) => {
    dispatch(articlesActions.changePage(key));
  };
  return (
    <Pagination
      defaultCurrent={1}
      total={50}
      style={{ marginTop: '40px' }}
      onChange={pageHandler}
    />
  );
}

export default ArticlesPagination;
