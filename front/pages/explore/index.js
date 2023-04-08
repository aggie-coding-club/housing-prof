// Explore Page
import { listings } from '@/exampleHomes';
import { useState, useEffect } from 'react';
import { CollapsePage } from '../../components/Collapse';

const Explore = () => {
	const [priceRange, setPriceRange] = useState(500000);
	const [listings, setListings] = useState([]);
	const [page, setPage] = useState(0);
	const [searchZip, setSearchZip] = useState('');
	const [searchCity, setSearchCity] = useState('');
	const [searchBedCount, setSearchBedCount] = useState(0);
	const [searchBathCount, setSearchBathCount] = useState(0);
	const [searchSqft, setSearchSqft] = useState(0);
	const [searchListingType, setSearchListingType] = useState('all');
	const [searchMethod, setSearchMethod] = useState('All');

	const listingsPerPage = 6;

	useEffect(() => {
		console.log(process.env.NEXT_BACK_API_URL_DEV);
		fetch(
			(process.env.NEXT_ENV === 'development'
				? process.env.NEXT_BACK_API_URL_DEV
				: process.env.NEXT_BACK_API_URL_PROD) + '/listing',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				setListings(data);
				console.log(data);
				console.log(process.env.JWT_SECRET);
			});
	}, []);

	const handleSliderChange = (event) => {
		setPriceRange(event.target.value);
	};

	return (
		<div className="flex flex-col lg:flex-row h-fit">
			<div className="flex flex-col text-start items-center w-full lg:w-[25%] h-fit py-6 pl-4 pr-4 lg:pr-0">
				<div className="flex flex-col justify-start w-full h-fit px-4 py-2 border-2 rounded-xl shadow-xl">
					<h1 className="text-2xl font-semibold px-2">Filters</h1>
					<div className="mt-0">
						<div className="flex flex-col rounded shadow-md border my-2 mx-0 pt-1">
							<label
								htmlFor="priceRange"
								className="block text-md font-bold text-black px-2"
							>
								Price Range
							</label>
							<div className="flex flex-row justify-center px-2">
								<input
									type="range"
									min="0"
									max="1000000"
									value={priceRange}
									onChange={handleSliderChange}
									className="mt-1 block slider"
									id="priceRange"
								/>
							</div>
							<p className="mt-1 text-sm font-medium text-black px-2 py-1">
								Up to ${priceRange.toLocaleString()}
							</p>
						</div>
						<div className="flex flex-col rounded shadow-md border my-2 mx-0 pt-1">
							<label
								htmlFor="zip"
								className="block text-md font-bold text-black px-2"
							>
								Zip Code
							</label>
							<input
								type="text"
								value={searchZip}
								onChange={(e) => setSearchZip(e.target.value)}
								className="block px-2 py-1 mx-3 mb-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
								placeholder="Enter zip code"
								id="zip"
							/>
						</div>
						<div className="flex flex-col rounded shadow-md border my-2 mx-0 pt-1">
							<label
								htmlFor="city"
								className="block text-md font-bold text-black px-2"
							>
								City
							</label>
							<input
								type="text"
								value={searchCity}
								onChange={(e) => setSearchCity(e.target.value)}
								className="block px-2 py-1 mx-3 mb-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
								placeholder="Enter city"
								id="city"
							/>
						</div>
						<div className="flex flex-col rounded shadow-md border my-2 mx-0 pt-1">
							<label
								htmlFor="bedCount"
								className="block text-md font-bold text-black px-2"
							>
								Min. Bedrooms
							</label>
							<input
								type="number"
								min="0"
								value={searchBedCount}
								onChange={(e) => setSearchBedCount(e.target.value)}
								className="block px-2 py-1 mx-3 mb-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
								placeholder="Enter minimum bedrooms"
								id="bedCount"
							/>
						</div>
						<div className="flex flex-col rounded shadow-md border my-2 mx-0 pt-1">
							<label
								htmlFor="bathCount"
								className="block text-md font-bold text-black px-2"
							>
								Min. Bathrooms
							</label>
							<input
								type="number"
								min="0"
								value={searchBathCount}
								onChange={(e) => setSearchBathCount(e.target.value)}
								className="block px-2 py-1 mx-3 mb-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
								placeholder="Enter minimum bathrooms"
								id="bathCount"
							/>
						</div>
						<div className="flex flex-col rounded shadow-md border my-2 mx-0 pt-1">
							<label
								htmlFor="sqft"
								className="block text-md font-bold text-black px-2"
							>
								Min. Square Footage
							</label>
							<input
								type="number"
								min="0"
								value={searchSqft}
								onChange={(e) => setSearchSqft(e.target.value)}
								className="block px-2 py-1 mx-3 mb-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
								placeholder="Enter minimum square footage"
								id="sqft"
							/>
						</div>
						<CollapsePage
							title="Type of Listing"
							options={['all', 'house', 'apartment', 'condo']}
							activeSelection={searchListingType}
							setActiveSelection={setSearchListingType}
						/>
					</div>
				</div>
			</div>

			<div className="flex flex-col text-start items-center w-full lg:w-[75%] h-fit my-6 px-3">
				{listings.filter(
					(listing) =>
						listing.price <= priceRange &&
						(searchListingType === 'all' ||
							listing.propertyType === searchListingType) &&
						(searchZip === '' || listing.zip === searchZip) &&
						(searchCity === '' ||
							listing.city.toLowerCase() === searchCity.toLowerCase()) &&
						(searchBedCount === 0 || listing.bedrooms >= searchBedCount) &&
						(searchBathCount === 0 || listing.bathrooms >= searchBathCount) &&
						(searchSqft === 0 || listing.sqft >= searchSqft)
				).length === 0 ? (
					<h1 className="text-2xl">No Results Found</h1>
				) : (
					<>
						<div className="grid grid-flow-cols grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
							{listings
								.filter(
									(listing) =>
										listing.price <= priceRange &&
										(searchListingType === 'all' ||
											listing.propertyType === searchListingType) &&
										(searchZip === '' || listing.zip === searchZip) &&
										(searchCity === '' ||
											listing.city.toLowerCase() ===
												searchCity.toLowerCase()) &&
										(searchBedCount === 0 ||
											listing.bedrooms >= searchBedCount) &&
										(searchBathCount === 0 ||
											listing.bathrooms >= searchBathCount) &&
										(searchSqft === 0 || listing.sqft >= searchSqft)
								)
								.slice(page * listingsPerPage, (page + 1) * listingsPerPage)
								.map((listing) => (
									<a href={`/${listing._id}`}>
										<div className="card card-compact w-full shadow-xl cursor-pointer gap-0">
											<figure className="h-44">
												<img
													src={listing.images[0] ? listing.images[0].url : ''}
													alt={listing.images[0] ? listing.images[0].alt : ''}
												/>
											</figure>
											<div className="flex flex-col px-3 py-2 pb-3">
												<h2 className="font-semibold text-xl line">
													${listing.price.toLocaleString()}
												</h2>
												<p>{`${listing.bedrooms} beds | ${listing.bathrooms} baths | ${listing.sqft} sqft`}</p>
												<p>
													{listing.address.replace('.', '')}, {listing.city},{' '}
													{listing.state}
												</p>
											</div>
										</div>
									</a>
								))}
						</div>
						<div className="flex flex-row justify-center items-center w-full mt-6">
							<button
								className="btn btn-ghost btn-sm mr-2 border bg-white border-gray-200"
								onClick={() => setPage(page - 1)}
								disabled={page === 0}
							>
								Previous
							</button>
							<p>
								Page {page + 1}/
								{Math.ceil(
									listings.filter(
										(listing) =>
											listing.price <= priceRange &&
											(searchListingType === 'all' ||
												listing.propertyType == searchListingType)
									).length / listingsPerPage
								)}{' '}
							</p>
							<button
								className="btn btn-ghost btn-sm ml-2 border bg-white border-gray-200"
								onClick={() => setPage(page + 1)}
								disabled={
									listings.filter(
										(listing) =>
											listing.price <= priceRange &&
											(searchListingType === 'all' ||
												listing.propertyType == searchListingType)
									).length <=
									(page + 1) * listingsPerPage
								}
							>
								Next
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Explore;
