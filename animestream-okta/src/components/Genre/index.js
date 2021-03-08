import React, { useEffect, useState, useRef } from "react";
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
    setTimeout(() => {
      const animeCart = document.querySelectorAll('[role="anime-cart"]');
      animeCart.forEach(x => {
        x.addEventListener("keydown", e => {
          e.preventDefault();
          e.stopPropagation();
          if (e.key === "Enter") e.target.querySelector("a").click();
        });
        x.addEventListener("keydown", e => {
          e.stopPropagation();
          if (e.key === "Tab" || e.key === "ArrowRight") {
            if (e.target.nextElementSibling)
              e.target.nextElementSibling.focus();
          } else if (e.key === "ArrowLeft") {
            if (e.target.previousElementSibling)
              e.target.previousElementSibling.focus();
          }
        });
      });
    }, 3000);
    document.querySelectorAll(".nav-item").forEach(x => {
      if (x.classList.contains("active")) {
        x.classList.remove("active");
      }
    });
    document
      .querySelector("#navbarDropdown")
      .parentElement.classList.add("active");
  }, []);

  useEffect(() => {
    axios
      .get(urls.genre + "&genre=" + genre + "&page=" + page)
      .then(res => res.data)
      .then(data => {
        setAnimes([...animes, ...data.results.map(p => p)]);
      });
  }, [page]);
  useEffect(() => {
    axios
      .get(urls.genre + "&genre=" + genre + "&page=" + page)
      .then(res => res.data)
      .then(data => {
        setAnimes([...data.results.map(p => p)]);
      });
  }, [genre]);
  const findGenre = y => {
    let gen;
    Object.entries(genres).forEach(x => {
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
        <h5>{findGenre(genre)} Genre</h5>
      </div>

      <div className="row GenrePadding" role="tablist" aria-label="Genre items">
        {animes.map(a => (
          <div
            className="col-md-2 col-sm-3 col-4"
            role="anime-cart"
            aria-selected="true"
            tabindex="0"
          >
            <img src={a.image_url} alt={a.title + " anime image"} />
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
          Load more
        </button>
      </div>
    </>
  );
}
