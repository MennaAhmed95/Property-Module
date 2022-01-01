import "./App.css";
import Home from "./containers/Home";
import ProdertyDetailsPage from "./containers/ProdertyDetailsPage";
import { Route } from "react-router";
import { Routes, Navigate, Outlet } from "react-router-dom";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  render() {
    return (
      <Routes>
        <Route
          exact
          path="/"
          element={<Home />}
          // render={(props) => <Home {...props} ref={this.ref} />}
        />
        <Route
          path="/propertyDetail/:id"
          exact
          element={<ProdertyDetailsPage />}
        />
        {/* <Navigate to="/" /> */}
      </Routes>
    );
  }
}

export default App;
