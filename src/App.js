import React, { Component } from "react";
import HomePage from "./component/HomePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Sidebar from "./component/SideBar";
import FooterPage from "./component/Footer";
import AlbumPage from "./component/AlbumPage";
import Artistpage from "./component/ArtistPage";
import "./App.css";

const albumArr = [];
class App extends Component {
  state = {
    albumId: null,
    albumCover: null,
    albumLabel: null,
    albumTitle: null,
  };

  albumToFooter = (albumId, albumCover, albumLabel, albumTitle) => {
    return albumArr.push(
      this.setState({
        albumId: albumId,
        albumCover: albumCover,
        albumLabel: albumLabel,
        albumTitle: albumTitle,
      })
    );
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
            render={(props) => (
              <AlbumPage {...props} sendAlbum={this.albumToFooter} />
            )}
          />
          <FooterPage
            footerId={this.state.albumId}
            footerCover={this.state.albumCover}
            footerLable={this.state.albumLabel}
            footerTitle={this.state.albumTitle}
          />
        </Router>
      </>
    );
  }
}

export default App;
