import React, { Component } from "react";
import WordWatchlist from "./WordWatchList";
export class NavBar extends Component {
  render() {
    return (
      <div>
        <nav
          className="navbar fixed-top bg-dark border-bottom border-bottom-dark"
          data-bs-theme="dark"
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              NewsAlert
            </a>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Add word to watchlist..."
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                WatchList
              </button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
