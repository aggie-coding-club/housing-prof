// Explore Page
import { useState, useEffect } from 'react';
import { CollapsePage } from '../../components/Collapse';
import Loading from '@/components/Loading';

const Explore = () => {
	const [priceRange, setPriceRange] = useState(500000);
	const [allListings, setAllListings] = useState([]);
	const [listings, setListings] = useState([]);
	const [page, setPage] = useState(0);
	const [searchZip, setSearchZip] = useState('');
	const [searchCity, setSearchCity] = useState('');
	const [searchBedCount, setSearchBedCount] = useState(0);
	const [searchBathCount, setSearchBathCount] = useState(0);
	const [searchSqft, setSearchSqft] = useState(0);
	const [searchListingType, setSearchListingType] = useState('all');
	const [searchKeywords, setSearchKeywords] = useState('');
	const [fetchedListings, setFetchedListings] = useState([]);
	const [filteredListings, setFilteredListings] = useState([]);
	const [loading, setLoading] = useState(true);

	const listingsPerPage = 8;

	const getAllListings = async () => {
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
				setAllListings(data);
				setListings(data);
				// Line below will be deleted when price range gets swapped to min and max
				filterListings(); // Filter listings at the start because the code below will use an empty filteredListings otherwise
				setLoading(false);
			});
	};

	const getSearchListings = async (keywords) => {
		fetch(
			(process.env.NEXT_ENV === 'development'
				? process.env.NEXT_BACK_API_URL_DEV
				: process.env.NEXT_BACK_API_URL_PROD) +
				'/listing/search?keywords=' +
				keywords,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.length > 0) {
					setFetchedListings(data);
				} else {
					alert('No results found');
					setFetchedListings([]);
				}
			});
	};

	const filterListings = () => {
		setFilteredListings(listings.filter(
			(listing) =>
				listing.price <= priceRange &&
				(searchListingType === 'all' ||
					listing.propertyType === searchListingType) &&
				(searchZip === '' || listing.zip === searchZip) &&
				(searchCity === '' ||
					listing.city.toLowerCase() === searchCity.toLowerCase()) &&
				(searchBedCount === 0 ||
					listing.bedrooms >= searchBedCount) &&
				(searchBathCount === 0 ||
					listing.bathrooms >= searchBathCount) &&
				(searchSqft === 0 || listing.sqft >= searchSqft)
		));
		
		// sliders for price are going to be changed to min and max so it will be deleted
		if (filteredListings.length === 0) { 
			setFilteredListings(listings);
		}
	};

	useEffect(() => {
		getAllListings();
	}, []);

	useEffect(() => {
		if (fetchedListings.length > 0) {
			setListings(fetchedListings);
		} else {
			setListings(allListings);
		}
	}, [fetchedListings]);

	useEffect(() => {
		filterListings();
	}, [filteredListings]);

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchKeywords.length > 0) {
			getSearchListings(searchKeywords.replace(/ /g, '+'));
		} else {
			setFetchedListings([]);
		}
	};

	const handleSliderChange = (event) => {
		setPriceRange(event.target.value);
		filterListings();
	};

	return (
		<div className="flex flex-col lg:flex-row h-fit">
			<div className="flex flex-col text-start items-center w-full lg:w-[25%] h-fit py-6 pl-4 pr-4 lg:pr-0">
				<div className="flex flex-col justify-start w-full h-fit px-4 py-2 border-2 rounded-xl shadow-xl">
					<h1 className="text-2xl font-semibold px-0.5">Search</h1>
					<form className="w-full">
						<label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
							Search
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg
									aria-hidden="true"
									className="w-5 h-5 text-gray-500 dark:text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
								</svg>
							</div>
							<input
								type="search"
								id="default-search"
								className="block w-full p-2.5 pl-10 text-sm my-1 mb-2 text-gray-900 shadow-md border border-gray-300 rounded-md bg-gray-50 focus:ring-maroon-500 dark:focus:ring-maroon-500 dark:focus:border-maroon-500 focus:border-maroon-600 transition"
								placeholder="Search"
								value={searchKeywords}
								onChange={(e) => setSearchKeywords(e.target.value)}
								required
							/>
							<button
								type="submit"
								className="text-white  absolute right-2 bottom-1.5 bg-maroon-700 hover:bg-maroon-700 focus:ring-4 focus:outline-none focus:ring-maroon-300 font-medium rounded-md text-sm px-2.5 py-1.5 dark:bg-maroon-600 dark:hover:bg-maroon-700 dark:focus:ring-maroon-700 transition"
								onClick={(e) => {
									handleSearch(e);
								}}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										handleSearch(e);
									}
								}}
							>
								Search
							</button>
						</div>
						{listings === fetchedListings ? (
							<p
								className="ml-1 cursor-pointer text-gray-400 underline mt-2 text-sm"
								onClick={() => {
									setFetchedListings([]);
								}}
							>
								Clear Search
							</p>
						) : (
							<> </>
						)}
					</form>
					<h1 className="text-2xl font-semibold px-0.5">Filters</h1>
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
								onChange={(e) => {
									setSearchZip(e.target.value);
									filterListings();
								}}
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
								onChange={(e) => {
									setSearchCity(e.target.value);
									filterListings();
								}}
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
								onChange={(e) => {
									setSearchBedCount(e.target.value);
									filterListings();
								}}
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
								onChange={(e) => {
									setSearchBathCount(e.target.value);
									filterListings();
								}}
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
								onChange={(e) => {
									setSearchSqft(e.target.value);
									filterListings();
								}}
								className="block px-2 py-1 mx-3 mb-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
								placeholder="Enter minimum square footage"
								id="sqft"
							/>
						</div>
						<CollapsePage
							title="Type of Listing"
							options={['all', 'house', 'apartment', 'condo']}
							activeSelection={searchListingType}
							setActiveSelection={(value) => {
								setSearchListingType(value);
								filterListings();
							}}
						/>
					</div>
				</div>
			</div>

			<div className="flex flex-col text-start items-center w-full lg:w-[75%] h-fit my-6 px-4">
				<>
					{loading ? (
						<Loading />
					) : (
						<>
							{filteredListings.length === 0 ? (
								<h1 className="text-2xl">No Results Found</h1>
							) : (
								<>
									<div className="w-full grid grid-flow-cols grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
										{filteredListings
											.slice(
												page * listingsPerPage,
												(page + 1) * listingsPerPage
											)
											.map((listing) => (
												<a
													href={`/${listing._id}`}
													key={listing._id}
													className="w-full"
												>
													<div className="card card-compact w-full shadow-xl cursor-pointer gap-0">
														<figure className="h-44">
															<img
																src={
																	listing.images[0] ? listing.images[0].url : ''
																}
																alt={
																	listing.images[0] ? listing.images[0].alt : ''
																}
																className="object-cover w-full h-full"
															/>
														</figure>
														<div className="flex flex-col px-3 py-2 pb-3">
															<h2 className="font-semibold text-xl line">
																${listing.price.toLocaleString()}{' '}
																{listing.propertyType !== 'house' && ' / month'}
															</h2>
															<p>{`${listing.bedrooms} beds | ${listing.bathrooms} baths | ${listing.sqft} sqft`}</p>
															<p>
																{listing.address.replace('.', '')},{' '}
																{listing.city}, {listing.state}
															</p>
														</div>
													</div>
												</a>
											))}
									</div>
									<div className="flex flex-row justify-center items-center w-full mt-6">
										<button
											className="btn btn-ghost btn-sm mr-2 border rounded-md bg-white border-gray-200"
											onClick={() => setPage(page - 1)}
											disabled={page === 0}
										>
											Previous
										</button>
										<p>
											Page {page + 1}/
											{Math.ceil(
												filteredListings.filter(
													(listing) =>
														listing.price <= priceRange &&
														(searchListingType === 'all' ||
															listing.propertyType == searchListingType)
												).length / listingsPerPage
											)}{' '}
										</p>
										<button
											className="btn btn-ghost btn-sm ml-2 border rounded-md bg-white border-gray-200"
											onClick={() => setPage(page + 1)}
											disabled={
												filteredListings.filter(
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
						</>
					)}
				</>
			</div>
		</div>
	);
};

export default Explore;
