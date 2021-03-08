import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { urls } from "../../assets/constants";
import "../../style.css";
import "./AnimeSlider.scss";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import Slide from "./slider";

export default function AnimeSlider({ animeGenres }) {
  let [loadMore, setLoadMore] = useState(10);
  useEffect(() => {
    setTimeout(() => {
      const tabs = document.querySelectorAll('[role="tab"]');
      tabs.forEach(tab => {
        tab.addEventListener("keydown", e => {
          e.preventDefault();
          e.stopPropagation();
          //console.log("e", e);
          if (
            e.key === "Enter" ||
            e.key === "Escape" ||
            e.key === "Tab" ||
            e.key === "ArrowRight" ||
            e.key === "ArrowLeft"
          ) {
            if (e.key === "Tab" || e.key === "ArrowRight") {
              if (e.target.nextElementSibling)
                e.target.nextElementSibling.focus();
            } else if (e.key === "ArrowLeft") {
              if (e.target.previousElementSibling)
                e.target.previousElementSibling.focus();
            } else if (e.key === "Enter") {
              if (e.target.querySelector('[role="anime-cart"]')) {
                console.log(e.key);
                e.target.querySelector('[role="anime-cart"]').focus();
              }
            } else if (e.key === "Escape") {
              if (e.target.closest('[role="tab"]'))
                e.target.closest('[role="tab"]').focus();
            }
          }
        });
      });

      const animeCart = document.querySelectorAll('[role="anime-cart"]');
      animeCart.forEach(x =>
        x.addEventListener(
          "keydown",
          e => {
            if (e.key === "Enter") e.target.querySelector("a").click();
          },
          { capture: true }
        )
      );
    }, 5000);

    document.querySelectorAll(".nav-item").forEach(x => {
      if (x.classList.contains("active")) {
        x.classList.remove("active");
      }
    });
    document.querySelectorAll(".nav-item")[0].classList.add("active");
  }, []);

  return (
    <React.Fragment>
      <div role="tablist" aria-label="Genre Tabs">
        {animeGenres.map(
          (x, i) =>
            i < loadMore && (
              <div
                role="tab"
                aria-selected="true"
                tabindex="0"
                id={x[1]}
                key={x[1]}
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="space-between">
                    <h3 className="header">
                      <Link to={"/genre/" + x[1]} style={{ color: "#43678d" }}>
                        {x[0]} series
                      </Link>
                    </h3>
                  </div>
                  <Slide x={x[1]} />
                </div>
              </div>
            )
        )}
        {loadMore < 40 && (
          <div className="center">
            <input
              type="button"
              onClick={() => setLoadMore(loadMore + 5)}
              value="Load More"
              className="btn btn-secondary"
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
