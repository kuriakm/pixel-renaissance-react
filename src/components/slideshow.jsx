import { useState } from "react";
import "../styles/slideshow.css";

const Slideshow = () => {
  function importAll(r) {
    return r.keys().map(r);
  }

  const images = importAll(
    require.context("../images/slideshow", false, /\.(png|jpe?g|svg)$/)
  );

  const game = [
    "Buckshot Roulette",
    "Portal",
    "Stardew Valley and Harvest Moon",
  ];

  const headerCont = [
    "The Devastating Reality of Gambling Addiction",
    "Finding Freedom in the Face of Oppression",
    "Two Farming Games, Two Very Different Experiences",
  ];
  /* const desc = [""]; */

  const [index, setIndex] = useState(0);

  const slideForward = () => {
    setIndex(index === images.length - 1 ? 0 : index + 1);
  };

  const slideBackward = () => {
    setIndex(index === 0 ? images.length - 1 : index - 1);
  };

  return (
    <section id="slideshow-box">
      <h2>Featured Posts</h2>
      <section id="slideshow">
        <div>
          <img src={images[index]} alt={images[index]} />
          <h4>
            <em>{game[index]}</em>: {headerCont[index]}
          </h4>
          <p className="back" onClick={slideBackward}>
            &#10094;
          </p>
          <p className="forward" onClick={slideForward}>
            &#10095;
          </p>
        </div>
        <div className="dot-box">
          <span className="dot" onClick={() => setIndex(0)}></span>
          <span className="dot" onClick={() => setIndex(1)}></span>
          <span className="dot" onClick={() => setIndex(2)}></span>
        </div>
      </section>
    </section>
  );
};

export default Slideshow;