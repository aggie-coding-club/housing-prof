// Home Page
import SearchBar from '../components/SearchBar';
import { Parallax } from 'react-parallax';
import { listings } from '@/exampleHomes';

const Home = () => {
	const categories = ['Houses', 'Condos', 'Apartment', 'Land', 'Commercial'];

	return (
		<div className="flex flex-col items-center h-full">
			<Parallax
				bgImage="/splash.jpeg"
				className="w-full bg-cover"
				strength={200}
				bgImageStyle={{ bottom: '-5rem', width: '100%', minWidth: '1000px' }}
			>
				<div className="w-full h-[30rem] px-5 lg:px-80 flex flex-col items-center justify-center bg-[#22222288] ">
					<p className="text-white text-5xl font-semibold py-2 w-full text-center">
						Find a House in the Bryan/College Station Area
					</p>
					<p className="text-white text-3xl font-medium py-2 w-full text-center">
						Subtitle
					</p>
					<div className="w-full flex justify-center px-20 py-2">
						<SearchBar categories={categories} />
					</div>
				</div>
			</Parallax>
			<div className="flex flex-col w-full h-96 pt-12 px-10">
				<h1 className="text-3xl font-medium">My Listings</h1>
				<div className="grid grid-flow-cols grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
					{listings.map((listing) => (
						<a href="/ssfas">
							<div className="card card-compact w-full bg-base-100 shadow-xl cursor-pointer gap-0">
								<figure className="h-44">
									<img
										src={listing.images[0].url}
										alt={listing.images[0].alt}
									/>
								</figure>
								<div className="flex flex-col px-3 py-2 pb-3">
									<h2 className="font-semibold text-xl line">
										${listing.price.toLocaleString()}
									</h2>
									<p>{`${listing.bedrooms} beds | ${listing.bathrooms} baths | ${listing.sqft} sqft`}</p>
									<p>
										{listing.address.replace('.', '')}, {listing.city},{' '}
										{listing.state} {listing.zip}
									</p>
								</div>
							</div>
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
