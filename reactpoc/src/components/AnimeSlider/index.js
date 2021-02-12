import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { urls } from "../../assets/constants";
import "../../style.css";
import "./AnimeSlider.scss";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import Slide from "./slider";

export default function AnimeSlider({ animeGenres }) {
  useEffect(() => {
    setTimeout(() => {
      const tabs = document.querySelectorAll('[role="tab"]');
      tabs.forEach((tab) => {
        tab.addEventListener("keydown", (e) => {
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
            if (
              e.key === "Tab" ||
              e.key === "ArrowRight" 
            ) {
              if(e.target.nextElementSibling)
              e.target.nextElementSibling.focus();
            } else if (e.key === "ArrowLeft") {
              if(e.target.previousElementSibling)
              e.target.previousElementSibling.focus();
            } else if (e.key === "Enter") {
              if(e.target.querySelector('[role="anime-cart"]'))
              e.target.querySelector('[role="anime-cart"]').focus();
            } else if (e.key === "Escape") {
              if(e.target.closest('[role="tab"]'))
              e.target.closest('[role="tab"]').focus();
            }
          }
        });
      });
    }, 5000);

  }, []);

  return (
    <React.Fragment>
      <div role="tablist" aria-label="Genre Tabs">
        {animeGenres.map((x) => (
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
              <h3 className="header">{x[0]} series</h3>
              <Slide x={x[1]} />
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
