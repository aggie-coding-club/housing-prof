import { useState } from "react";
import ImageSlider from "../components/ImageSlider";
import { listings } from "./dummyData";
import "./ListingPage.css";

export default function MyListings() {
 
   /*  const imageIndex = (val) => {
        if (val === "prev") {
            if (index === 0) {
                setIndex(img.length - 1);
            }
            else {
                setIndex(index-1)
            }
        }
        if (val === "next") {
            if (index === img.length - 1) {
                setIndex(0);
            }
            else {
                setIndex(index + 1);
            }
        }
    } */

    return (
        <div className="listing-page-container">
            <div className="image-slider">
                
            </div>
        </div>
    );
}
/*
const images = [
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        "https://imagedesigncom.com/wp-content/uploads/2013/02/cool-nature-wallpapers-hd-1920x1200.jpg",
        "https://www.midsouthfcu.org/wp-content/uploads/2016/09/river-e1474985418357.jpg",
        "https://wallpapercave.com/wp/5Y4BALD.jpg",
        "https://i.ytimg.com/vi/0yPXAevqZG4/maxresdefault.jpg"
    ];

    const [index, setIndex] = useState(0);

{/* <div className="image-slider">
                <ImageSlider images={ images } />
            </div> 
             <div className="atr1">
                <button className = "actionButtonPrev" onClick={() => imageIndex("prev")}>Prev</button>
                <img className = "slideImage" src={img[index]} alt="idk"/>
                <button className="actionButtonNext" onClick={() => imageIndex("next")}>Next</button>
            </div>
            <div className="atr2">
                <h1>Parkwest</h1>
                <h3>19212 Parkwest Street, College Station TX</h3>
            </div>
            <button className= "bookmark">
                <h2>bmark</h2>
            </button>
            <button className= "contact">
                <h2>contact</h2>
            </button>
            <div className="atr3">
                <h1>Google Maps</h1>
            </div>
            <div className="atr4">
                <h1>Price</h1>
            </div>
            <div className="atr5">
            <h1>Bedrooms</h1>
            </div>
            <div className="atr6"></div>
            <div className="atr7"></div>
            <div className="atr8"></div> 
*/
