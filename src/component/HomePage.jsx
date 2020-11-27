import React, { Component } from "react";

import Display from "./Display";

let firstPlaylist = ["u2", "smashmouth", "greenday", "lorn"];

let secondPlaylist = ["ladygaga", "djblyatman", "area", "nekrogoblikon"];

let thirdPlaylist = ["ghostemane", "lilpeep", "killstation", "$uicideboy$", ,];

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstRow: [],
      secondRow: [],
      thirdRow: [],
      loading: true,
      error: false,
    };
  }

  componentDidMount = () => {
    let headers = new Headers({
      "x-rapidapi-key": "7ecdbfef58msh2e0fb8f65f6ade8p162ee4jsn8307347ed24c",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    });

    let pl1 = [];
    let pl2 = [];
    let pl3 = [];

    while (pl1.length < 4) {
      let artist =
        firstPlaylist[Math.floor(Math.random() * firstPlaylist.length)];

      if (!pl1.includes(artist)) {
        pl1.push(artist);
      }
    }

    while (pl2.length < 4) {
      let artist =
        secondPlaylist[Math.floor(Math.random() * secondPlaylist.length)];

      if (!pl2.includes(artist)) {
        pl2.push(artist);
      }
    }

    while (pl3.length < 4) {
      let artist =
        thirdPlaylist[Math.floor(Math.random() * thirdPlaylist.length)];

      if (!pl3.includes(artist)) {
        pl3.push(artist);
      }
    }
    const firstRow = [];
    for (let i = 0; i < pl1.length; i++) {
      fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + pl1[i], {
        method: "GET",
        headers,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((artists) => {
          let songInfo = artists.data;
          firstRow.push(songInfo[0]);

          this.setState({ firstRow: firstRow, loading: false });

          return firstRow;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const thirdRow = [];
    for (let i = 0; i < pl2.length; i++) {
      fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + pl2[i], {
        method: "GET",
        headers,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((artists) => {
          let songInfo = artists.data;
          thirdRow.push(songInfo[0]);
          this.setState({
            loading: false,
            thirdRow: thirdRow,
          });

          return thirdRow;
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const secondRow = [];
    for (let i = 0; i < pl3.length; i++) {
      fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + pl3[i], {
        method: "GET",
        headers,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((artists) => {
          let songInfo = artists.data;
          secondRow.push(songInfo[0]);
          this.setState({ secondRow: secondRow, loading: false });

          return secondRow;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <>
        <div className="col-12 col-md-9 offset-md-3 mainPage">
          <div className="row">
            <div className="col-9 col-lg-11 sections d-none d-md-flex">
              <a href="#">TRENDING</a>
              <a href="#">MOODS AND GENRES</a>
              <a href="#">NEW RELEASES</a>
              <a href="#">DISCOVER</a>
            </div>
          </div>

          <div className="row">
            <div className="col-10">
              <div id="firstPlaylist">
                <h2>Playlist 1</h2>
                <Display
                  loading={this.state.loading}
                  songs={this.state.firstRow}
                />

                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-10">
              <div id="secondPlaylist">
                <h2>Playlist 2</h2>
                <Display
                  loading={this.state.loading}
                  songs={this.state.thirdRow}
                />
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-10">
              <div id="thirdPlaylist">
                <h2>Playlist 3</h2>
                <Display
                  loading={this.state.loading}
                  songs={this.state.secondRow}
                />

                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;
