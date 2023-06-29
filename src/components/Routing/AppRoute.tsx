import React, { Component, FC, useEffect } from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./Routes";
import { LOGIN_ROUTE } from "../../utils/const";
import { useAppSelector } from "../../Hooks/redux";
const AppRoute: FC = () => {
  const { isAuth } = useAppSelector((state) => state.userReducer);
  useEffect(() => {
    console.log("isAuth in router ", isAuth);
  }, [isAuth]);
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
