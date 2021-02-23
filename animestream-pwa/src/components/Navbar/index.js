import React, { useState, useEffect } from "react";
import "../../style.css";
import "./Navbar.scss";
import TrendyPostSlider from "../TrendyPostSlider";
import AnimeSlider from "../AnimeSlider";
import Anime from "../Anime";
import Genre from "../Genre";
import Search from "../search";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";

export default function Navbar({ animeGenres }) {
  let animeGenre = [];
  let animeGenreDropDown = [];
  let [searchText, setSearchText] = useState("");
  for (const [key, value] of Object.entries(animeGenres)) {
    animeGenre = [...animeGenre, key];
  }
  for (let value1 of Object.entries(animeGenres)) {
    animeGenreDropDown = [...animeGenreDropDown, value1];
  }
  useEffect(() => {
    document
      .querySelector("#navbarSupportedContent")
      .addEventListener("click", e => {
        const elem = e.target;
        console.log(elem.tagName);
        if (
          !elem.classList.contains("dropdown-toggle") &&
          elem.tagName !== "INPUT"
        )
          document.querySelector(".navbar-toggler").click();
      });
  }, []);
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          AnimeStream
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Genre
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {animeGenreDropDown.map(x => (
                  <Link
                    className="dropdown-item"
                    key={x[1]}
                    to={"/genre/" + x[1]}
                  >
                    {x[0]}
                  </Link>
                ))}
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">
                Anime
              </a>
            </li>
          </ul>
          <div style={{ display: "inherit" }}>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              autoComplete="on"
              onChange={e => {
                setSearchText(e.target.value);
              }}
              onKeyDown={e => {
                if (e.key === "Enter" && e.target.value) {
                  document
                    .querySelector('[type="search"]')
                    .nextElementSibling.click();
                }
              }}
            />
            <Link
              className="btn btn-outline-success my-2 my-sm-0"
              to={searchText ? "/search/" + searchText : ""}
            >
              Search
            </Link>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  SignUp
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  LogIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Switch>
        <Route path="/genre/:id" exact component={Genre} />
        <Route path="/anime/:animeId" exact component={Anime} />
        <Route
          path="/"
          exact
          render={() => (
            <>
              <TrendyPostSlider />
              <AnimeSlider animeGenres={animeGenreDropDown} />
            </>
          )}
        />
        <Route path="/search/:searchText" exact component={Search} />
      </Switch>
    </Router>
  );
}
