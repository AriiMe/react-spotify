import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

class AlbumPage extends Component {
  state = {
    albums: [],
    tracks: [],
    artistName: [],
    loading: true,
  };

  albumToFooter = (albumId, albumCover, albumLabel, albumTitle) =>
    this.props.sendAlbum(albumId, albumCover, albumLabel, albumTitle);

  componentDidMount = () => {
    const albumId = this.props.match.params.id;
    let headers = new Headers({
      "x-rapidapi-key": "7ecdbfef58msh2e0fb8f65f6ade8p162ee4jsn8307347ed24c",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    });

    fetch("https://deezerdevs-deezer.p.rapidapi.com/album/" + albumId, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "7ecdbfef58msh2e0fb8f65f6ade8p162ee4jsn8307347ed24c",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((album) => {
        let albums = album;
        let tracks = album.tracks.data;
        const artistName = album.artist;
        this.setState({
          albums: albums,
          tracks: tracks,
          artistName: artistName,
        });

        this.albumToFooter(
          albumId,
          albums.cover_small,
          albums.label,
          albums.title
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    console.log("props from app.js", this.props);
    return (
      <>
        <div className="col-12 col-md-9 offset-md-3 mainPage">
          <div className="row">
            <div className="col-md-3 pt-5 text-center" id="img-container">
              <Image
                src={this.state.albums.cover_medium}
                className="card-img img-fluid"
                alt={this.state.albums.title}
              />
              <div className="mt-4 text-center">
                <p className="album-title">{this.state.albums.title}</p>
              </div>
              <div className="text-center">
                <Link
                  to={"/artistPage/" + this.state.artistName.id}
                  className="nav-link"
                >
                  Album: {this.state.artistName.name}
                </Link>
              </div>
              <div className="mt-4 text-center">
                <button id="btnPlay" className="btn btn-success" type="button">
                  Play
                </button>
              </div>
            </div>
            <div className="col-md-8 p-5">
              <div className="row">
                <div className="col-md-10 mb-5" id="trackList">
                  {this.state.tracks.map((tracklist) => {
                    return (
                      <div className="py-3 trackHover" key={tracklist.id}>
                        <a
                          href="#"
                          className="card-title trackHover px-3"
                          style={{ color: "white" }}
                        >
                          {tracklist.title}
                        </a>
                        <small
                          className="duration pr-3"
                          style={{ color: "white" }}
                        >
                          {(tracklist.duration / 60).toFixed(2)}
                        </small>
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
export default AlbumPage;
