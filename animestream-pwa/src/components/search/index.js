import React, { useState, useEffect } from "react";
import { urls } from "../../assets/constants";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Search.scss";
export default function Search(props) {
  const [searchText, setSearchText] = useState(props.match.params.searchText);
  const [searchList, setSearchList] = useState([]);
  useEffect(() => {
    setSearchText(props.match.params.searchText);
    console.log("props.match.params.searchText");
  });
  useEffect(() => {
    axios
      .get(urls.search + searchText)
      .then(res => res.data.results)
      .then(data => {
        setSearchList(data);
      });
    console.log(props);
  }, [searchText]);
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
    <React.Fragment>
      <div className="left">
        <h5>{searchText + " Results"}</h5>
      </div>

      <div className="row GenrePadding" role="tablist" aria-label="Genre items">
        {searchList.length != 0 ? (
          searchList.map(a => (
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
                  <h6>{a.type}</h6>
                  <h6>{"Rating " + a.score}</h6>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="center" style={{ width: "100%" }}>
            <h5>... not found</h5>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
