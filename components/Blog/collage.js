import React, { useEffect, useState } from "react";
import "./blog.scss";

function Collage({ content, selectedSchool }) {
  const [check, setCheck] = useState("true");
  const [gallery, setImages] = useState([
    content[0].images[0],
    content[1].images[1],
    content[2].images[2],
    content[3].images[1],
    content[4].images[0],
    content[5].images[0],
  ]);

  var arr = [];
  useEffect(() => {
    setCheck("true");
    setImages([]);
    for (var i = 0; i < content.length; i++) {
      if (selectedSchool == "All") {
        setImages([
          content[0].images[0],
          content[1].images[1],
          content[2].images[2],
          content[3].images[1],
          content[4].images[0],
          content[5].images[0],
        ]);
        break;
      }
      if (content[i].school == selectedSchool) {
        for (var j = 0; j < 3; j++) {
          if (content[i].images[j] != undefined) {
            arr.push(content[i].images[j]);
          }
        }
        setImages(arr);
      }
    }
  }, [selectedSchool]);

  return (
    <React.Fragment>
      <div className="galContainer"> 
      <section className="gallery">
        <div className="gallery__item">
          <input
            type="radio"
            id="img-1"
            checked={check}
            onClick={() => {
              setCheck("true");
            }}
            name="gallery"
            className="gallery__selector"
          />
          <img className="gallery__img" src={gallery[0]} alt="" />
          <label htmlFor="img-1" className="gallery__thumb">
            <img src={gallery[0]} alt="" />
          </label>
        </div>
        <div className="gallery__item">
          <input
            type="radio"
            id="img-2"
            onClick={() => {
              setCheck("");
            }}
            name="gallery"
            className="gallery__selector"
          />
          <img className="gallery__img" src={gallery[1]} alt="" />
          <label htmlFor="img-2" className="gallery__thumb">
            <img src={gallery[1]} alt="" />
          </label>
        </div>
        <div className="gallery__item">
          <input
            type="radio"
            id="img-3"
            onClick={() => {
              setCheck("");
            }}
            name="gallery"
            className="gallery__selector"
          />
          <img className="gallery__img" src={gallery[2]} alt="" />
          <label htmlFor="img-3" className="gallery__thumb">
            <img src={gallery[2]} alt="" />
          </label>
        </div>
        <div className="gallery__item">
          <input
            type="radio"
            id="img-4"
            onClick={() => {
              setCheck("");
            }}
            name="gallery"
            className="gallery__selector"
          />
          <img className="gallery__img" src={gallery[3]} alt="" />
          <label htmlFor="img-4" className="gallery__thumb">
            <img src={gallery[3]} alt="" />
          </label>
        </div>
        <div className="gallery__item">
          <input
            type="radio"
            id="img-5"
            onClick={() => {
              setCheck("");
            }}
            name="gallery"
            className="gallery__selector"
          />
          <img className="gallery__img" src={gallery[4]} alt="" />
          <label htmlFor="img-5" className="gallery__thumb">
            <img src={gallery[4]} alt="" />
          </label>
        </div>
        <div className="gallery__item">
          <input
            type="radio"
            id="img-6"
            onClick={() => {
              setCheck("");
            }}
            name="gallery"
            className="gallery__selector"
          />
          <img className="gallery__img" src={gallery[5]} alt="" />
          <label htmlFor="img-6" className="gallery__thumb">
            <img src={gallery[5]} alt="" />
          </label>
        </div>
      </section>
      </div>
    </React.Fragment>
  );
}
export default Collage;