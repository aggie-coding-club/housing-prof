import "./Listing.css"
import { AiOutlineCheckCircle, AiOutlineCloseCircle} from "react-icons/ai";

export default function Listing(props) {

  return (
    <div className="card-container">
        
        
        <div className="card-column one">
          <img src={props.imageURL}></img>
        </div>

        <div className="card-column two">
          <h3>{props.complex}</h3>
          
          <ul>
            <li>${props.price}/month</li>
            <li>{props.beds} bedrooms</li>
            <li>{props.proximity} mi. from campus</li>
          </ul>

          <div className={props.available ? "availability-toggle available" : "availability-toggle unavailable"}>
             {props.available ? <AiOutlineCheckCircle /> : <AiOutlineCloseCircle />}
             {props.available ? "Available" : "Unavailable"}
          </div>

        </div>
    </div>
  );
}