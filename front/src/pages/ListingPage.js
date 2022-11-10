import { useState } from "react";
import { listings } from "./dummyData";
import "./ListingPage.css";

export default function MyListings() {
 
    var img = [
        "https://i.picsum.photos/id/435/200/300.jpg?hmac=gSfIK7r5rB4f3aJq0RTylep967d4sBRbIUuAOuq433o",
        "https://i.picsum.photos/id/693/200/200.jpg?hmac=7KcC6ytdAPoUzLmXyr1r5hDXHyYQL-W1P40rRURkouE"
    ];

    const [index, setIndex] = useState(0);
 
    const imageIndex = (val) => {
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
    }

    return (
        <>
            <div className="attributes">
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
            </div>
        </>
    );
}
