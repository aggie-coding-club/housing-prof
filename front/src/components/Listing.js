import "./Listing.css"

export default function Listing(props) {

  return (
    <div className="card-container">
        <div className="card-column one">
          <h3>{props.complex}</h3>
        </div>

        <img src={props.imageURL}></img>

        <div className="card-column two">

          <ul>
            <li>${props.price}/month</li>
            <li>{props.beds} bedrooms</li>
            <li>{props.proximity} mi. from campus</li>
          </ul>

          <div className={props.available ? "availability-toggle available" : "availability-toggle unavailable"}>
            {props.available ? "Available" : "Unavailable"}
          </div>

        </div>
    </div>
  );
}