import "./Listing.css"
import { AiOutlineCheckCircle, AiOutlineCloseCircle} from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";

export default function Listing(props) {

  return (
    <div className="card-container">
        
        
        <div className="card-column one">
          <img src={props.imageURL} alt="Thumbnail for listing"></img>
        </div>

        <div className="card-column two">
          <h3>{props.complex}</h3>
          
          <ul>
            <li>${props.price}/month</li>
            <li>{props.beds} bedrooms</li>
            <li>{props.proximity} mi. from campus</li>
          </ul>

          <div className="toggles">
            <div className={props.available ? "availability available" : "availability unavailable"}>
              {props.available ? <AiOutlineCheckCircle /> : <AiOutlineCloseCircle />}
              {props.available ? "Available" : "Unavailable"}
            </div>
            <div className="bookmark-icon">
              <BsBookmark />
            </div>
          </div>

          

        </div>
    </div>
  );
}