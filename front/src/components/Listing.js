import "./Listing.css"

export default function Listing(listing) {

  return (
    <div className="card-container">
        <div className="card-column one">
          <h3>{listing.complex}</h3>
          <div className={listing.available ? "availability-toggle available" : "availability-toggle unavailable"}>
            Available
          </div>
        </div>

        <div className="card-column two">
          <ul>
            <li>${listing.price}/month</li>
            <li>{listing.beds} bedrooms</li>
            <li>{listing.proximity} mi. from campus</li>
          </ul>
        </div>
    </div>
  );
}