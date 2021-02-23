import React from "react";
import "../../style.css";
import "./TrendyPostSlider.scss";
import {Carousel} from "react-bootstrap";

export default function TrendyPostSlider() {
  return (
    <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="http://www.coxinhanerd.com.br/wp-content/uploads/2018/09/TOPO-61.jpg"
        alt="First slide"
      />
      <Carousel.Caption>
        <h3></h3>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://64.media.tumblr.com/fb49e51f32f7a5d22b33a2122734fa44/tumblr_p2oe5oqtfV1rcxu2ko1_r2_1280.jpg"
        alt="Third slide"
      />
  
      <Carousel.Caption>
        <h3></h3>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://pbs.twimg.com/tweet_video_thumb/EfKt7wGXsAELgoF.jpg"
        alt="Third slide"
      />
  
      <Carousel.Caption>
        <h3></h3>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>);
}
