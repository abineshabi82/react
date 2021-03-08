import React, { useState, useEffect } from "react";
import "../../style.css";
import "./Navbar.scss";
import TrendyPostSlider from "../TrendyPostSlider";
import AnimeSlider from "../AnimeSlider";
import Anime from "../Anime";
import Genre from "../Genre";
import Search from "../search";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import { Security, SecureRoute, LoginCallback, useOktaAuth } from "@okta/okta-react";
import { OktaAuth } from "@okta/okta-auth-js";
import Login from "../Auth/Login";
import { oktaAuthConfig, oktaSignInConfig } from "../../config";
import RegistrationForm from "../Auth/RegistrationForm";

export const oktaAuth = new OktaAuth(oktaAuthConfig);

export default function Navbar(props) {
  let [email, setEmail] = useState(null);
  let [log, setLog] = useState(null)
  let animeGenre = [];
  let animeGenreDropDown = [];
  let [searchText, setSearchText] = useState("");
  for (const [key, value] of Object.entries(props.animeGenres)) {
    animeGenre = [...animeGenre, key];
  }
  for (let value1 of Object.entries(props.animeGenres)) {
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
    setLog(oktaAuth.authStateManager._authState.isAuthenticated);

  }, []);
  useEffect(() => {
    setLog(oktaAuth.authStateManager._authState.isAuthenticated);
    setEmail(JSON.parse(localStorage.getItem("okta-token-storage"))?.idToken?.claims?.email);
  });

  // const location=useLocation();
  const customAuthHandler = () => {
    console.log(props);
    window.location.href = "/login";
  };


  const logout = async () => oktaAuth.signOut();

  const button = log ?
    <Link className="nav-link" to="#" onClick={() => logout()}>Logout</Link> :
    <Link className="nav-link" to="/login">LogIn</Link>;

  const setSeach = () => {
    setSearchText('h');
  }

  return (
    <Router>
      <Security oktaAuth={oktaAuth} onAuthRequired={customAuthHandler}>
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
                {email?<li className="nav-item">
                  <a className="nav-link" href="#">
                    <b>{email}</b>
                  </a>
                </li>:<li className="nav-item">
                  <Link className="nav-link" to="/register">SignUp</Link>
                </li>}
                <li className="nav-item">
                  {button}
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Switch>
          <Route path="/genre/:id" exact component={Genre} />

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
          <Route
            path="/login"
            render={() => <Login config={oktaSignInConfig} />}
          />
          <Route path="/implicit/callback" component={LoginCallback} />
          <Route path="/register" render={(props)=><RegistrationForm {...props} />} />
          <SecureRoute path="/anime/:animeId" exact render={(props) => <Anime {...props} setSeach={setSeach} />} />
        </Switch>
      </Security>
    </Router>
  );
}
