import React, { useEffect, useState } from "react";
import "../../style.css";
import "./Anime.scss";
import axios from "axios";
import { urls } from "../../assets/constants";

export default function Anime(props) {
  let [animeId, setAnimeId] = useState("");
  let [episodes, setEpisodes] = useState([]);
  let [season, setSeason] = useState({});
  let [episodeImage, setEpisodeImage] = useState("");
  console.log(props);
  useEffect(() => {
    document.querySelector("html").scrollTop = 0;
    document.querySelectorAll(".nav-item").forEach(x => {
      if (x.classList.contains("active")) {
        x.classList.remove("active");
      }
    });
    document.querySelectorAll(".nav-item")[2].classList.add("active");

    document.querySelector("#root>.navbar").style.zIndex = "2";
    props.setSeach();
    return () => {
      document.querySelector("#root>.navbar").style.zIndex = "4";
    };
    
  }, []);
  useEffect(() => {
    setAnimeId(props.match.params.animeId);
  });
  useEffect(() => {
    axios
      .get(urls.anime + "/" + animeId + "/episodes")
      .then(res => setEpisodes([...res.data.episodes]));

    axios.get(urls.anime + "/" + animeId).then(res => {
      setSeason(res.data);
    });

    setTimeout(() => {
      axios.get(urls.anime + "/" + animeId + "/pictures").then(res => {
        setEpisodeImage(res.data.pictures[0].small);
      });
    }, 2000);
  }, [animeId]);

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

  const play = () => {
    const videoElement = document.querySelector("#iframe");
    const videoDiv = document.querySelector(".close-iframe");
    const videoSpan = document.querySelector(".close-span");
    videoElement.style.display = "block";
    videoElement.style.margin = 0;
    videoDiv.style.display = "block";
    videoDiv.style.margin = 0;
    videoSpan.style.display = "block";
    videoSpan.style.margin = 0;
    setTimeout(() => {
      console.log(videoElement);
    }, 8000);
    videoSpan.firstChild.addEventListener("click", e => {
      videoElement.style.display = "none";
      videoDiv.style.display = "none";
      videoSpan.style.display = "none";
      e.stopPropagation();
    });
  };

  const moveRight = () => {
    document.querySelector(".episode-slider").scrollLeft += 500;
  };
  const moveLeft = () => {
    document.querySelector(".episode-slider").scrollLeft -= 500;
  };

  return (
    <React.Fragment>
      <div
        className="row animeDetail post"
        style={{
          backgroundImage:
            "url(https://64.media.tumblr.com/fb49e51f32f7a5d22b33a2122734fa44/tumblr_p2oe5oqtfV1rcxu2ko1_r2_1280.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
        <div className="col-md-3 detailsDiv">
          <div>
            <h2>{season.title_english || season.title}</h2>
            <h5>
              <b>Rating </b> {season.score} <b>Episodes </b> {season.episodes}{" "}
              <b>Age rate </b>
              {season.rating} <b>Status </b> {season.status}
            </h5>
            <h4>
              <b>Description</b>
            </h4>
            <h6 className="description">{season.synopsis}</h6>
          </div>
          <div>
            <h5>
              <input
                type="button"
                className="btn btn-light"
                value={season.trailer_url ? "play" : "play default"}
                onClick={() => play()}
              />
            </h5>
            <div className="close-iframe">
              <span className="close-iframe close-span">
                <input type="button" className="btn btn-light" value="close" />
              </span>
              <iframe
                id="iframe"
                src={
                  season.trailer_url ||
                  "https://www.youtube.com/embed/KeGctT6lJCU?enablejsapi=1&wmode=opaque&autoplay=false"
                }
              />
            </div>
            <h5>watchlist</h5>
          </div>
        </div>
      </div>

      <div id="season" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <h3 className="header">{episodes.length + " Episodes"}</h3>
          <div className="carousel-item active">
            <div className="row padding episode-slider">
              {episodes.map(x => (
                <>
                  <div className="col-md-2 col-sm-3 col-4">
                    <img
                      src={episodeImage}
                      alt={x.title + " image"}
                      height="300px"
                      width="400px"
                    />
                    <div className="title">
                      <h5>{trim(x.title, 15)}</h5>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev arrowPadding"
          href="#season"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon  d-none d-sm-none d-md-flex d-lg-flex d-xl-flex"
            aria-hidden="true"
            onClick={() => moveLeft()}
            tabIndex="0"
            onKeyDown={e => {
              e.key == "Enter" && moveLeft();
            }}
          />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next arrowPadding  d-none d-sm-none d-md-flex d-lg-flex d-xl-flex"
          href="#season"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon d-none d-sm-none d-md-flex d-lg-flex d-xl-flex"
            tabIndex="0"
            onClick={() => moveRight()}
            onKeyDown={e => {
              e.key == "Enter" && moveRight();
            }}
            aria-hidden="true"
          />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </React.Fragment>
  );
}
