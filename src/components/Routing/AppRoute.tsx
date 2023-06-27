import React, { Component, FC } from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./Routes";
import { LOGIN_ROUTE } from "../../utils/const";
const AppRoute: FC = () => {
  const isAuth = true;
  return (
    <Routes>
      {isAuth &&
        privateRoutes.map(({ path, component }) => (
          <Route key={path} path={path} Component={component} />
        ))}
      {publicRoutes.map(({ path, component }) => (
        <Route key={path} path={path} Component={component} />
      ))}
      {<Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />}
    </Routes>
  );
};

export default AppRoute;
