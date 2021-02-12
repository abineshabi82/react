import React, { useEffect, useState } from "react";
import "../../style.css";
import "./Anime.scss";
import axios from "axios";
import { urls } from "../../assets/constants";


export default function Anime({ match }) {
  let [animeId,setAnimeId]=useState('');
  let [episodes,setEpisodes]=useState([]);
  let [season,setSeason]=useState({});
  let [episodeImage,setEpisodeImage]=useState("");
  useEffect(() => {
    setAnimeId(match.params.animeId);
  });
  useEffect(()=>{
    axios
      .get(urls.anime + "/" + animeId + "/episodes")
      .then((res) => setEpisodes([...res.data.episodes]));

    axios.get(urls.anime + "/" + animeId + "/pictures").then(res=>{
      setEpisodeImage(res.data.pictures[0].small);
    });

    axios.get(urls.anime + "/" + animeId).then(res=>{
      setSeason(res.data);
    });
  },[animeId]);

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

  const play=()=>{
    const videoElement=document.querySelector("#iframe");
   videoElement.style.display="block";
   videoElement.style.margin=0;
   setTimeout(()=>{
     console.log(videoElement.querySelector("video"));
   },8000);
    videoElement.addEventListener("keydown",(e)=>{
      console.log(e);
      if(e.key==="Escape"){
        
        videoElement.style.display="none";
      }
      e.stopPropagation();
    });
  }

  return (
    <React.Fragment>
      <div
        className="row animeDetail post"
        style={{
          backgroundImage:
            "url(https://source.unsplash.com/random/1380x400?sig=3)",
          height: "400px"
        }}
      >
        <div className="col-md-3 detailsDiv">
          <div>
            <h2>{season.title_english || season.title}</h2>
            <h5>{"Rating "+season.score}    {"Episodes "+season.episodes}   {season.rating}   {"Status "+season.status}</h5>
            <h4>Description</h4>
            <h6 className="description">
              {season.synopsis}
            </h6>
          </div>
          <div>
            <h5><input type="button" value="play" onClick={()=>play()}/></h5>
            <iframe id="iframe" src={season.trailer_url}></iframe>
            <h5>watchlist</h5>
          </div>
        </div>
      </div>

      <div id="season" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <h3 className="header">{episodes.length+" Episodes"}</h3>
          <div className="carousel-item active">
            <div className="row padding episode-slider">
              {episodes.map(x=>(<>
                <div
                className="col-md-2"
              >
                <img src={episodeImage} alt={x.title+" image"} height="300px" width="400px"></img>
                <div className="title">
                  <h3>{trim(x.title,15)}</h3>
                </div>
              </div>
              </>))}
              
            </div>
          </div>
          
        </div>
        <a
          className="carousel-control-prev arrowPadding"
          href="#season"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next arrowPadding"
          href="#season"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>

      <div id="recommandation" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <h3 className="header">Recommanded Animes</h3>
          <div className="carousel-item active">
            <div className="row padding">
              <div
                className="col-md-2"
                style={{
                  backgroundImage:
                    "url(https://source.unsplash.com/random/400x300?sig=20)",
                  height: "300px",
                  width: "400px"
                }}
              >
                <div className="title">
                  <h3>Anime 1</h3>
                  <h4>Description</h4>
                </div>
              </div>
              <div
                className="col-md-2"
                style={{
                  backgroundImage:
                    "url(https://source.unsplash.com/random/400x300?sig=19)",
                  height: "300px",
                  width: "400px"
                }}
              >
                <div className="title">
                  <h3>Anime 2</h3>
                  <h4>Description</h4>
                </div>
              </div>
              <div
                className="col-md-2"
                style={{
                  backgroundImage:
                    "url(https://source.unsplash.com/random/400x300?sig=18)",
                  height: "300px",
                  width: "400px"
                }}
              >
                <div className="title">
                  <h3>Anime 3</h3>
                  <h4>Description</h4>
                </div>
              </div>
              <div
                className="col-md-2"
                style={{
                  backgroundImage:
                    "url(https://source.unsplash.com/random/400x300?sig=17)",
                  height: "300px",
                  width: "400px"
                }}
              >
                <div className="title">
                  <h3>Anime 4</h3>
                  <h4>Description</h4>
                </div>
              </div>
              <div
                className="col-md-2"
                style={{
                  backgroundImage:
                    "url(https://source.unsplash.com/random/400x300?sig=16)",
                  height: "300px",
                  width: "400px"
                }}
              >
                <div className="title">
                  <h3>Anime 5</h3>
                  <h4>Description</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row padding">
              <div
                className="col-md-2"
                style={{
                  backgroundImage:
                    "url(https://source.unsplash.com/random/400x300?sig=15)",
                  height: "300px",
                  width: "400px"
                }}
              >
                <div className="title">
                  <h3>Anime 6</h3>
                  <h4>Description</h4>
                </div>
              </div>
              <div
                className="col-md-2"
                style={{
                  backgroundImage:
                    "url(https://source.unsplash.com/random/400x300?sig=14)",
                  height: "300px",
                  width: "400px"
                }}
              >
                <div className="title">
                  <h3>Anime 7</h3>
                  <h4>Description</h4>
                </div>
              </div>
              <div
                className="col-md-2"
                style={{
                  backgroundImage:
                    "url(https://source.unsplash.com/random/400x300?sig=13)",
                  height: "300px",
                  width: "400px"
                }}
              >
                <div className="title">
                  <h3>Anime 8</h3>
                  <h4>Description</h4>
                </div>
              </div>
              <div
                className="col-md-2"
                style={{
                  backgroundImage:
                    "url(https://source.unsplash.com/random/400x300?sig=12)",
                  height: "300px",
                  width: "400px"
                }}
              >
                <div className="title">
                  <h3>Anime 9</h3>
                  <h4>Description</h4>
                </div>
              </div>
              <div
                className="col-md-2"
                style={{
                  backgroundImage:
                    "url(https://source.unsplash.com/random/400x300?sig=11)",
                  height: "300px",
                  width: "400px"
                }}
              >
                <div className="title">
                  <h3>Anime 10</h3>
                  <h4>Description</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row padding">
              <div
                className="col-md-2"
                style={{
                  backgroundImage:
                    "url(https://source.unsplash.com/random/400x300?sig=10)",
                  height: "300px",
                  width: "400px"
                }}
              >
                <div className="title">
                  <h3>Anime 11</h3>
                  <h4>Description</h4>
                </div>
              </div>
              <div
                className="col-md-2"
                style={{
                  backgroundImage:
                    "url(https://source.unsplash.com/random/400x300?sig=9)",
                  height: "300px",
                  width: "400px"
                }}
              >
                <div className="title">
                  <h3>Anime 12</h3>
                  <h4>Description</h4>
                </div>
              </div>
              <div
                className="col-md-2"
                style={{
                  backgroundImage:
                    "url(https://source.unsplash.com/random/400x300?sig=8)",
                  height: "300px",
                  width: "400px"
                }}
              >
                <div className="title">
                  <h3>Anime 13</h3>
                  <h4>Description</h4>
                </div>
              </div>
              <div
                className="col-md-2"
                style={{
                  backgroundImage:
                    "url(https://source.unsplash.com/random/400x300?sig=7)",
                  height: "300px",
                  width: "400px"
                }}
              >
                <div className="title">
                  <h3>Anime 14</h3>
                  <h4>Description</h4>
                </div>
              </div>
              <div
                className="col-md-2"
                style={{
                  backgroundImage:
                    "url(https://source.unsplash.com/random/400x300?sig=6)",
                  height: "300px",
                  width: "400px"
                }}
              >
                <div className="title">
                  <h3>Anime 15</h3>
                  <h4>Description</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev arrowPadding"
          href="#recommandation"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next arrowPadding"
          href="#recommandation"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </React.Fragment>
  );
}
