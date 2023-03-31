// Explore Page
import { listings } from '@/exampleHomes';
import { useState } from 'react';
import { CollapsePage } from '../../components/Collapse';

const Explore = () => {
	const [priceRange, setPriceRange] = useState(500000);
	const [searchZip, setSearchZip] = useState('');
	const [searchCity, setSearchCity] = useState('');
	const [searchBedCount, setSearchBedCount] = useState(0);
	const [searchBathCount, setSearchBathCount] = useState(0);
	const [searchSqft, setSearchSqft] = useState(0);
	const [searchListingType, setSearchListingType] = useState('All');
	const [searchMethod, setSearchMethod] = useState('All');

	const handleSliderChange = (event) => {
		setPriceRange(event.target.value);
	};

	return (
		<div className="flex flex-col lg:flex-row h-full">
			<div className="flex flex-col text-start items-center w-full lg:w-[25%] h-full py-6 pl-4">
				<div className="flex flex-col justify-between w-full h-full px-4 py-2 border-2 rounded-md shadow-xl">
					<h1 className="text-2xl font-semibold px-2">Filters</h1>
					<div className="mt-0">
						<div className="flex flex-col rounded shadow-md border my-2 mx-0 pt-1">
							<label
								htmlFor="priceRange"
								className="block text-md font-bold text-gray-700 px-2"
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
							<p className="mt-1 text-sm font-medium text-gray-700 px-2 py-1">
								Up to ${priceRange.toLocaleString()}
							</p>
						</div>
						<CollapsePage
							title="Type of Listing"
							options={['All', 'House', 'Apartment', 'Townhome']}
							activeSelection={searchListingType}
							setActiveSelection={setSearchListingType}
						/>
					</div>
				</div>
			</div>

			<div className="flex flex-col text-start items-center w-full lg:w-[75%] h-full pt-6 px-3">
				<div className="grid grid-flow-cols grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
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

export default Explore;
