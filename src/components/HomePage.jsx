import { useTranslation } from "react-i18next";
import React, { useEffect, useState, useRef } from "react";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import { StarSvg } from "../Svg";

export default function HomePage() {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const sliderTrackRef = useRef(null);

  useEffect(() => {
    fetch("/data/data.json")
      .then((response) => response.json())
      .then((data) => setArticles(data.articles));
  }, []);

  const pauseSlider = () => {
    if (sliderTrackRef.current) {
      sliderTrackRef.current.style.animationPlayState = "paused";
    }
  };

  const resumeSlider = () => {
    if (sliderTrackRef.current) {
      sliderTrackRef.current.style.animationPlayState = "running";
    }
  };

  return (
    <>
      <main>
        <div className="name">
          <h1>{t("greeting")}</h1>
          <div className="icon">
            <StarSvg />
          </div>
        </div>
        <div className="main-content">
          <div className="my-photo">
            <img src="/img/my-photo.jpg" alt="" />
          </div>
          <div className="home-intro">
            <p>{t("intro")}</p>
          </div>
        </div>
      </main>
      <About />
      <Projects />
      <div className="myarticles">
        <div className="headtext">
          <h1 onClick={() => (window.location.href = "#/articles")}>
            {t("articles")}
          </h1>
          <div className="star-icon">
            <StarSvg />
          </div>
        </div>

        <div className="slider-container">
          <div className="slider-track" ref={sliderTrackRef}>
            {[...articles, ...articles].map((article, index) => (
              <div
                className="articles-item"
                key={index}
                onMouseEnter={pauseSlider}
                onMouseLeave={resumeSlider}
              >
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  <img src={article.image} alt={`${article.title} Photo`} />
                </a>
                <h3>{article.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Contact />
    </>
  );
}