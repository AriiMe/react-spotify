import React, { Component } from "react";

import Display from "./Display";

let rockArtists = ["u2", "smashmouth", "greenday", "lorn"];

let popArtists = ["ladygaga", "djblyatman", "area", "nekrogoblikon"];

let hipHopArtists = ["ghostemane", "lilpeep", "killstation", "$uicideboy$", ,];

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Rock: [],
      Hiphop: [],
      Pop: [],
      searchedMovies: [],
      loading: true,
      error: false,
      comments: [],
    };
  }

  componentDidMount = () => {
    let headers = new Headers({
      "x-rapidapi-key": "7ecdbfef58msh2e0fb8f65f6ade8p162ee4jsn8307347ed24c",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    });

    let rockRandomArtists = [];
    let popRandomArtists = [];
    let hipHopRandomArtists = [];

    while (rockRandomArtists.length < 4) {
      let artist = rockArtists[Math.floor(Math.random() * rockArtists.length)];

      if (!rockRandomArtists.includes(artist)) {
        rockRandomArtists.push(artist);
      }
    }

    while (popRandomArtists.length < 4) {
      let artist = popArtists[Math.floor(Math.random() * popArtists.length)];

      if (!popRandomArtists.includes(artist)) {
        popRandomArtists.push(artist);
      }
    }

    while (hipHopRandomArtists.length < 4) {
      let artist =
        hipHopArtists[Math.floor(Math.random() * hipHopArtists.length)];

      if (!hipHopRandomArtists.includes(artist)) {
        hipHopRandomArtists.push(artist);
      }
    }
    const rock = [];
    for (let i = 0; i < rockRandomArtists.length; i++) {
      fetch(
        "https://deezerdevs-deezer.p.rapidapi.com/search?q=" +
          rockRandomArtists[i],
        {
          method: "GET",
          headers,
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((artists) => {
          let songInfo = artists.data;
          rock.push(songInfo[0]);
          // console.log(songInfo)
          this.setState({ Rock: rock, loading: false });
          // console.log('state ', this.state.Rock)
          return rock;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const pop = [];
    for (let i = 0; i < popRandomArtists.length; i++) {
      fetch(
        "https://deezerdevs-deezer.p.rapidapi.com/search?q=" +
          popRandomArtists[i],
        {
          method: "GET",
          headers,
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((artists) => {
          let songInfo = artists.data;
          pop.push(songInfo[0]);
          this.setState({
            loading: false,
            Pop: pop,
          });

          return pop;
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const hipHop = [];
    for (let i = 0; i < hipHopRandomArtists.length; i++) {
      fetch(
        "https://deezerdevs-deezer.p.rapidapi.com/search?q=" +
          hipHopRandomArtists[i],
        {
          method: "GET",
          headers,
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((artists) => {
          let songInfo = artists.data;
          hipHop.push(songInfo[0]);
          this.setState({ Hiphop: hipHop, loading: false });

          return hipHop;
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
            <div className="col-9 col-lg-11 mainLinks d-none d-md-flex">
              <a href="#">TRENDING</a>

              <a href="#">MOODS AND GENRES</a>
              <a href="#">NEW RELEASES</a>
              <a href="#">DISCOVER</a>
            </div>
          </div>
          <div className="row">
            <div className="col-10">
              <div id="searchResults" className="d-none">
                <h2>Search Results</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-10">
              <div id="rock">
                <h2>Rock Classics</h2>
                <Display loading={this.state.loading} songs={this.state.Rock} />

                <div
                  className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"
                  id="rockSection"
                ></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-10">
              <div id="pop">
                <h2>Pop Artists</h2>
                <Display loading={this.state.loading} songs={this.state.Pop} />
                <div
                  className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"
                  id="popSection"
                ></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-10">
              <div id="hiphop">
                <h2>HipHop Top</h2>
                <Display
                  loading={this.state.loading}
                  songs={this.state.Hiphop}
                />

                <div
                  className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"
                  id="hipHopSection"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;
