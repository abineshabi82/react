import React, { useEffect, useState } from "react";
import axios from "axios";
import { urls } from "../../assets/constants";
import "../../style.css";
import "./AnimeSlider.scss";

export default function Slide({x}) {


    const [animes, setAnimes] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
      axios.get(urls.genre + '&genre=' + x + '&page' + page + '&limit=15')
        .then(res => res.data).then(data => { setAnimes([...animes, ...(data.results.map(p => p))]) });

    }, [page]);

    

    const moveLeft = (ml,e) => {
      //if(e && e.key==='Enter' || !e)
      setTimeout(() => document.getElementById(ml).scrollLeft -= 500, 100);
      //if(e && e.key==='Enter')
      e.stopPropagation();
    }
    const moveRigth = (ml,e) => {
      //if(event && event.key==='Enter' || !event)
      setTimeout(() => document.getElementById(ml).scrollLeft += 500, 100);
      //if(event && event.key==='Enter')
      e.stopPropagation();
    }

    const trim = (yourString, maxLength) => {
      if (yourString.length > maxLength) {
        let trimmedString = yourString.substr(0, maxLength);
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")) || trimmedString.length)
        return trimmedString;
      }
      return yourString;
    }


    return (

      <div className="row padding genre-slider" role="tablist" aria-label="Genre items" id={"genre-" + x}>
        <div key="left" onClick={($event) => moveLeft("genre-" + x,$event)} className="col-md-1 left-arrow">
          <i  role="tab-left-arrow" aria-selected="true" tabindex="0" className="bi bi-caret-left"></i>
        </div>{console.log(animes.length)}
        {animes.map(y =>{return (<div key={y.mal_id}
          className="col-md-2"
          role={y.title+" anime cart"} aria-selected="true" tabindex="0"
        >
          <img src={y.image_url} alt={y.title+" anime image"}></img>
          <div className="title">
            <h5>{trim(y.title,19)}</h5>
            <h6>{"Rating "+y.score}</h6>
          </div>
        </div>);})}
        <div key="rigth" role="tab-right-arrow" onClick={($event) => moveRigth("genre-" + x,$event)} className="col-md-1 right-arrow">
          <i className="bi bi-caret-right"></i>
        </div>

      </div>
    );
  }