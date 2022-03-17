import React, { FC } from 'react';
import { Router,Routes, Route } from 'react-router-dom';
import List from './list/index';

const PageRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<List/>} />
      </Routes>

    </div>
  );
};

export default PageRoute;