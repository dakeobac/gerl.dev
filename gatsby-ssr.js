/* eslint-disable import/prefer-default-export, react/prop-types */
import React from 'react';
import TopLayout from './src/gatsby-theme-material-ui-top-layout/components/top-layout';

export const wrapRootElement = ({ element }) => {
  return <TopLayout>{element}</TopLayout>;
};