import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { urls } from "../../assets/constants";
import "../../style.css";
import "./AnimeSlider.scss";

export default function Slide({ x }) {
  const [animes, setAnimes] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    axios
      .get(urls.genre + "&genre=" + x + "&page" + page + "&limit=15")
      .then(res => {
        if (res.data) return res.data;
        else setTimeOut(() => setPage(page), 300);
      })
      .then(data => {
        setAnimes([...animes, ...data.results.map(p => p)]);
      });
  }, [page]);

  const moveLeft = (ml, e) => {
    setTimeout(() => (document.getElementById(ml).scrollLeft -= 500), 100);
    e.stopPropagation();
  };
  const moveRigth = (ml, e) => {
    setTimeout(() => (document.getElementById(ml).scrollLeft += 500), 100);
    e.stopPropagation();
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
    <div
      className="row padding genre-slider"
      role="tablist"
      aria-label="Genre items"
      id={"genre-" + x}
    >
      <div
        key="left"
        onClick={$event => moveLeft("genre-" + x, $event)}
        className="col-md-1 left-arrow d-none d-sm-none d-md-flex d-lg-flex d-xl-flex"
      >
        <i
          role="tab-left-arrow"
          aria-selected="true"
          tabindex="0"
          className="bi bi-caret-left"
        />
      </div>
      {animes.map(y => {
        return (
          <div
            key={y.mal_id}
            className="col-md-2 col-sm-3 col-4"
            role="anime-cart"
            aria-selected="true"
            tabindex="0"
          >
            <img src={y.image_url} alt={y.title + " anime image"} />
            <Link
              key={y.mal_id}
              to={"/anime/" + y.mal_id}
              style={{ textDecoration: "none" }}
            >
              <div className="title">
                <h5>{trim(y.title, 19)}</h5>
                <h6>{"Rating " + y.score}</h6>
              </div>
            </Link>
          </div>
        );
      })}
      <div
        key="rigth"
        role="tab-right-arrow"
        onClick={$event => moveRigth("genre-" + x, $event)}
        className="col-md-1 right-arrow d-none d-sm-none d-md-flex d-lg-flex d-xl-flex"
      >
        <i className="bi bi-caret-right" />
      </div>
    </div>
  );
}
