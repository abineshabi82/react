import React, {useRef} from "react";
import "../../style.css";
import "./TrendyPostSlider.scss";
import sass from "./carousel.module.scss";
//import {Carousel} from "react-bootstrap";

export default function TrendyPostSlider() {


  const goLeft=(event)=>{
    for(let x of event.target.parentElement.nextElementSibling.querySelectorAll(`.${sass.udCarouselItem}`)){

      if(window.document.defaultView.getComputedStyle(x).getPropertyValue('z-index')=='1'){
        if (x.previousElementSibling) {
          x.style.zIndex = "2";
          x.previousElementSibling.style.zIndex = "1";
          x.classList.add(sass.transform);
          setTimeout(()=>{
            x.style.zIndex = "0";
              if(x.classList.contains(sass.transform))
              x.classList.remove(sass.transform);
            
            x.previousElementSibling.style.zIndex = "1";
          },999);
          break;
        }else if(x?.parentElement?.lastElementChild){
          x.style.zIndex = "2";
          x.parentElement.lastElementChild.style.zIndex = "1";
          x.classList.add(sass.transform);
          setTimeout(() => {
            x.style.zIndex = "0";
            if (x.classList.contains(sass.transform))
              x.classList.remove(sass.transform);
            
            x.parentElement.lastElementChild.style.zIndex = "1";
          }, 999);
          break;
        }
      }
    }
  };

  const goRight=(event)=>{
    for(let x of event.target.parentElement.previousElementSibling.querySelectorAll(`.${sass.udCarouselItem}`)){
      if(window.document.defaultView.getComputedStyle(x).getPropertyValue('z-index')=='1'){
        if (x.nextElementSibling) {
          x.style.zIndex = "2";
          x.nextElementSibling.style.zIndex="1";
          x.classList.add(sass.transformOpp);
          setTimeout(()=>{
          x.style.zIndex = "0";
          if(x.classList.contains(sass.transformOpp))
              x.classList.remove(sass.transformOpp);
          x.nextElementSibling.style.zIndex = "1";
          },999);
          break;
        }else if(x?.parentElement?.firstElementChild){
          x.style.zIndex = "2";
          x.parentElement.firstElementChild.style.zIndex = "1";
          x.classList.add(sass.transformOpp);
          setTimeout(() => {
          x.style.zIndex = "0";
          if (x.classList.contains(sass.transformOpp))
              x.classList.remove(sass.transformOpp);
          x.parentElement.firstElementChild.style.zIndex = "1";
          },999);
          break;
        }
      }
    }

  };

  return (
    <div className={sass.udCarousel}>
      <div className={sass.leftArrow} >
        <span class="carousel-control-prev-icon" tabIndex="0" aria-hidden="true" onKeyDown={(e)=>{if(e.key=="Enter")goLeft(e);}} onClick={(event)=>goLeft(event)}></span>
      </div>
      <div className={sass.udCarouselItems} >
        <div className={sass.udCarouselItem} style={{position:"relative"}} >
          <img
            className="d-block w-100"
            src="https://pbs.twimg.com/tweet_video_thumb/EfKt7wGXsAELgoF.jpg"
            alt="First slide"
          />
        </div>
        <div className={sass.udCarouselItem} >
          <img
            className="d-block w-100"
            src="https://64.media.tumblr.com/fb49e51f32f7a5d22b33a2122734fa44/tumblr_p2oe5oqtfV1rcxu2ko1_r2_1280.jpg"
            alt="Third slide"
          />
        </div>
        <div className={sass.udCarouselItem}>
          <img
            className="d-block w-100"
            src="http://www.coxinhanerd.com.br/wp-content/uploads/2018/09/TOPO-61.jpg"
            alt="Third slide"
          />
        </div>
      </div>
      <div className={sass.rightArrow}>
      <span class="carousel-control-next-icon" tabIndex="0" onKeyDown={(e)=>{if(e.key=="Enter")goRight(e);}} aria-hidden="true"  onClick={(event)=>goRight(event)}></span>
      </div>
    </div>
  );
}

