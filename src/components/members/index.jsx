import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Add from './add';
import Edit from './edit';
import List from './list/index';

const PageRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/member/add" element={<Add/>} />
        <Route path="/member/edit/:id" element={<Edit/>} />
        <Route path="/" element={<List/>} />
      </Routes>
    </div>
  );
};

export default PageRoute;