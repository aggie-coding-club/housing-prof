import ListingCard from './ListingCard';

const Slide = (props) => {
	return (
		<>
			{props.listings.length > 0 ? (
				<div className="flex flex-col w-full h-fit pt-0">
					<h1 className="text-3xl font-semibold text-center py-4">
						{props.title}
					</h1>
					<div class="carousel carousel-center rounded-box pb-12 px-10">
						{props.listings.map((listing) => (
							<ListingCard listing={listing} />
						))}
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default Slide;
