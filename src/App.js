import React, { Component } from "react";
import HomePage from "./component/HomePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Sidebar from "./component/SideBar";
import FooterPage from "./component/Footer";
import AlbumPage from "./component/AlbumPage";
import Artistpage from "./component/ArtistPage";
import "./App.css";

class App extends Component {
  state = {
    albumId: null,
    albumCover: null,
    albumLabel: null,
    albumTitle: null,
  };

  render() {
    return (
      <>
        <Router>
          <Sidebar />
          <Route path="/" exact component={HomePage} />
          <Route path="/artistPage/:id" exact component={Artistpage} />
          <Route
            path="/album/:id"
            exact
            render={(props) => <AlbumPage {...props} />}
          />
          <FooterPage />
        </Router>
      </>
    );
  }
}

export default App;
