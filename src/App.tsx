import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./components/Routing/AppRoute";
import NavBar from "./components/NavBar";
import "./styles/global.css";
import { check } from "./http/user.services";
import { useAppDispatch, useAppSelector } from "./Hooks/redux";
import { UserSlice } from "./store/Reducers/UserSlice";
import Loader from "./components/Loading/Loader";

const App = () => {
  const { SetUser, SetIsAuth } = UserSlice.actions;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      check()
        .then((data) => {
          dispatch(SetUser(data));
        })
        .finally(() => setLoading(false));
    }
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRoute />
    </BrowserRouter>
  );
};

App.propTypes = {};

export default App;
