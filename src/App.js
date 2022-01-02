import "./App.css";
import Home from "./containers/Home";
import ProdertyDetailsPage from "./containers/ProdertyDetailsPage";
import { Route } from "react-router";
import { Routes, Navigate } from "react-router-dom";
import React from "react";

import AddPropertyForm from "./containers/AddProperty";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  render() {
    return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/propertyDetail/:id"
          exact
          element={<ProdertyDetailsPage />}
        />
        <Route path="/addForm" exact element={<AddPropertyForm />} />
        <Route path="/" element={<Navigate to="/" />} />
      </Routes>
    );
  }
}

export default App;
