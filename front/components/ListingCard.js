const ListingCard = (props) => {
	return (
		<div className="carousel-item px-2">
			<a href={`/${props.listing._id}`}>
				<div className="card card-compact w-[15rem] md:w-[20rem] lg:w-[25rem] shadow-xl cursor-pointer">
					<figure className="h-44 w-full">
						<img
							src={
								props.listing.images.length > 0
									? props.listing.images[0].url
									: ''
							}
							alt={
								props.listing.images.length > 0
									? props.listing.images[0].alt
									: ''
							}
							className="object-cover w-full h-full"
						/>
					</figure>
					<div className="flex flex-col px-3 py-2 pb-3">
						<h2 className="font-semibold text-xl line">
							${props.listing.price.toLocaleString()}{' '}
							{props.listing.propertyType !== 'house' && ' / month'}
						</h2>
						<p>{`${props.listing.bedrooms} beds | ${props.listing.bathrooms} baths | ${props.listing.sqft} sqft`}</p>
						<p>
							{props.listing.address.replace('.', '')}, {props.listing.city},{' '}
							{props.listing.state} {props.listing.zip}
						</p>
					</div>
				</div>
			</a>
		</div>
	);
};

export default ListingCard;
