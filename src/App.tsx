import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './components/Routing/AppRoute';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRoute />
    </BrowserRouter>
  );
};

App.propTypes = {};

export default App;
