import React, { useEffect, useState } from "react";
import "../../style.css";
import "./Genre.scss";
import { urls } from "../../assets/constants";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { genres } from "../../assets/constants";
import { data } from "jquery";

export default function Genre({ match }) {
  const [animes, setAnimes] = useState([]);
  const [genre, setGenre] = useState(1);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setGenre(match.params.id);
  });
  useEffect(() => {
    axios
      .get(urls.genre + "&genre=" + genre + "&page=" + page)
      .then((res) => res.data)
      .then((data) => {
        setAnimes([...animes, ...data.results.map((p) => p)]);
      });
  }, [page]);
  useEffect(() => {
    axios
      .get(urls.genre + "&genre=" + genre + "&page=" + page)
      .then((res) => res.data)
      .then((data) => {
        setAnimes([...data.results.map((p) => p)]);
      });
  }, [genre]);
  const findGenre = (y) => {
    let gen;
    Object.entries(genres).forEach((x) => {
      if (x[1] == y) gen = x[0];
    });
    return gen;
  };

  const trim = (yourString, maxLength) => {
    if (yourString.length > maxLength) {
      let trimmedString = yourString.substr(0, maxLength);
      trimmedString = trimmedString.substr(
        0,
        Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")) ||
          trimmedString.length
      );
      return trimmedString;
    }
    return yourString;
  };

  return (
    <>
      <div className="left">
        <h4>{findGenre(genre)} Genre</h4>
      </div>

      <div className="row GenrePadding" role="tablist" aria-label="Genre items">
        {animes.map((a) => (
          <div
            className="col-md-2"
            role={a.title + " anime cart"}
            aria-selected="true"
            tabindex="0"
          >
            <img src={a.image_url} alt={a.title + " anime image"}></img>
            <Link
              key={a.mal_id}
              to={"/anime/" + a.mal_id}
              style={{ textDecoration: "none" }}
            >
              <div className="title">
                <h5>{trim(a.title, 19)}</h5>
                <h6>{"Rating " + a.score}</h6>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="center">
        <button className="btn btn-secondary" onClick={() => setPage(page + 1)}>
          {" "}
          Load more
        </button>
      </div>
    </>
  );
}
