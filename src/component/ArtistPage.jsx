import React, { Component } from "react";
import { Col, Image, Modal, Button, Spinner } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
class ArtistPage extends Component {
  state = {
    albums: [],
    tracksresponse: [],
    artistName: [],
    textValue: "FOLLOW",
    loading: true,
  };

  componentDidMount = () => {
    const artistId = this.props.match.params.id;
    fetch("https://deezerdevs-deezer.p.rapidapi.com/artist/" + artistId, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "7ecdbfef58msh2e0fb8f65f6ade8p162ee4jsn8307347ed24c",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((artist) => {
        //console.log("response from fetch", response.json());
        //let albums = album
        // let tracks = album.tracks.data
        const artistName = artist;
        this.setState({
          artistName: artistName,

          loading: false,
        });

        fetch(
          "https://deezerdevs-deezer.p.rapidapi.com/artist/" +
            artistId +
            "/top?limit=50",
          {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "7ecdbfef58msh2e0fb8f65f6ade8p162ee4jsn8307347ed24c",
              "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            },
          }
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((tracklist) => {
            let track = tracklist.data;

            this.setState({
              tracksresponse: track,
            });
            console.log("new state track response", this.state.tracksresponse);
          });

        console.log("new state artist", this.state.artistName);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <div className="col-12 col-md-9 offset-md-3 mainPage">
          <div className="row">
            <div className="col-12 col-md-10 col-lg-10 mt-5">
              <h2 className="titleMain">{this.state.artistName.name}</h2>
              <div id="followers">
                Followers: {this.state.artistName.nb_fan}
              </div>
              <div
                className="d-flex justify-content-center"
                id="button-container"
              >
                <Button
                  className="btn btn-success mr-2 mainButton "
                  id="playButton"
                >
                  PLAY
                </Button>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-10 offset-1 col-md-10 col-lg-10 p-0">
              <div className="mt-4 d-flex justify-content-start">
                <h2 className="text-white font-weight-bold">Tracks</h2>
              </div>
              <div className="pt-5 mb-5">
                <div className="row" id="apiLoaded">
                  {this.state.tracksresponse.map((tracks) => {
                    return (
                      <div
                        className="col-sm-auto col-md-auto text-center mb-5"
                        key={tracks.id}
                      >
                        <a href="">
                          <img
                            className="img-fluid"
                            src={tracks.album.cover_medium}
                            alt="1"
                          />
                        </a>
                        <p>
                          <a href=""> Track: {tracks.title_short}</a>
                          <br />
                          <Link
                            to={"/album/" + tracks.album.id}
                            className="nav-link"
                          >
                            Album: {tracks.album.title}
                          </Link>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ArtistPage;
