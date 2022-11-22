import { useState } from "react";
import "./ImageSlider.css";

export default function ImageSlider(props) {
    const [currImg, setCurrImg] = useState(0);

    function nextImg() {
        console.log("here")
        setCurrImg(current => 
            current === props.images.length - 1 ? 0 : current + 1
        );
    }

    console.log(currImg)

    function prevImg() {
        setCurrImg(current =>
            current === 0 ? props.images.length - 1 : current - 1
        );
    }
    return (
        <div className="slider-container">
            <button className="prev-arrow" onClick={prevImg}>❰</button>
            <div className="image" style={{backgroundImage: `url(${props.images[currImg]})`}}></div>
            <button className="next-arrow" onClick={nextImg}>❱</button>
        </div>
    );
}
