// Listings Page
import Carousel from '@/components/Carousel';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Listings = () => {
	const [idFound, setIdFound] = useState(true);
	const [listingLiked, setListingLiked] = useState(false);
	const router = useRouter();

	const listing = {
		address: '1234 Main St.',
		city: 'College Station',
		state: 'TX',
		zip: '77840',
		price: 100000,
		bedrooms: 3,
		bathrooms: 2,
		sqft: 1500,
		description: 'This is a test description',
		images: [
			{
				url: '/testImage1.jpg',
				alt: 'Image 1',
			},
			{
				url: '/testImage2.jpg',
				alt: 'Image 2',
			},
			{
				url: '/testImage3.jpg',
				alt: 'Image 3',
			},
			{
				url: '/testImage4.jpg',
				alt: 'Image 4',
			},
			{
				url: '/testImage5.jpg',
				alt: 'Image 5',
			},
		],
	};

	const returnHome = () => {
		router.push('/');
	};

	if (!idFound) {
		return (
			<>
				<div className="flex flex-col text-start items-center h-full pt-6">
					<h1 className="text-2xl">This house doesn't exist.</h1>
					<p className="text-sm pt-2 cursor-pointer" onClick={returnHome}>
						Return home
					</p>
				</div>
			</>
		);
	}

	return (
		<>
			<div className="flex flex-col text-start text-maroon-700 items-center h-fit pt-6 px-10 lg:px-56">
				<h1 className="w-full text-start text-black pb-1 text-3xl font-semibold">
					{listing.address}
				</h1>
				<div className="flex flex-col w-full h-full">
					<div className="flex flex-row justify-between h-[18rem] lg:h-[32rem] w-full">
						<Carousel
							slides={listing.images}
							address={listing.address}
							listingLiked={listingLiked}
						/>
					</div>
				</div>
				<div className="flex flex-row justify-between w-full pt-4">
					<div className="flex flex-col">
						<p className="text-xl font-semibold text-black">
							${listing.price.toLocaleString()}
						</p>
						<div className="flex flex-row">
							<p className="flex flex-row text-black items-center text-center text-sm">
								{listing.bedrooms}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="icon icon-tabler icon-tabler-bed-filled"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									stroke-width="1.75"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
									style={{
										marginLeft: '0.25rem',
										marginRight: '0.5rem',
										color: 'rgb(92 36 37)',
									}}
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path
										d="M3 6a1 1 0 0 1 .993 .883l.007 .117v6h6v-5a1 1 0 0 1 .883 -.993l.117 -.007h8a3 3 0 0 1 2.995 2.824l.005 .176v8a1 1 0 0 1 -1.993 .117l-.007 -.117v-3h-16v3a1 1 0 0 1 -1.993 .117l-.007 -.117v-11a1 1 0 0 1 1 -1z"
										stroke-width="0"
										fill="currentColor"
									></path>
									<path
										d="M7 8a2 2 0 1 1 -1.995 2.15l-.005 -.15l.005 -.15a2 2 0 0 1 1.995 -1.85z"
										stroke-width="0"
										fill="currentColor"
									></path>
								</svg>
								|{'   ' + listing.bathrooms}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="icon icon-tabler icon-tabler-bath-filled"
									width="24"
									height="24"
									viewBox="0 0 28 28"
									stroke-width="1.75"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
									style={{
										marginLeft: '0.25rem',
										marginRight: '0.25rem',
										color: 'rgb(92 36 37)',
										marginTop: '0.1rem',
									}}
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path
										d="M11 2a1 1 0 0 1 .993 .883l.007 .117v2.25a1 1 0 0 1 -1.993 .117l-.007 -.117v-1.25h-2a1 1 0 0 0 -.993 .883l-.007 .117v6h13a2 2 0 0 1 1.995 1.85l.005 .15v3c0 1.475 -.638 2.8 -1.654 3.715l.486 .73a1 1 0 0 1 -1.594 1.203l-.07 -.093l-.55 -.823a4.98 4.98 0 0 1 -1.337 .26l-.281 .008h-10a4.994 4.994 0 0 1 -1.619 -.268l-.549 .823a1 1 0 0 1 -1.723 -1.009l.059 -.1l.486 -.73a4.987 4.987 0 0 1 -1.647 -3.457l-.007 -.259v-3a2 2 0 0 1 1.85 -1.995l.15 -.005h1v-6a3 3 0 0 1 2.824 -2.995l.176 -.005h3z"
										stroke-width="0"
										fill="currentColor"
									></path>
								</svg>
								| {listing.sqft} Sqft
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 27 27"
									fill="currentColor"
									className="w-6 h-6 ml-1 mt-1"
									style={{
										color: 'rgb(92 36 37)',
									}}
								>
									<path
										fillRule="evenodd"
										d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z"
										clipRule="evenodd"
									/>
								</svg>
							</p>
						</div>
					</div>
					<div className="flex flex-col">
						<p className="text-xl text-black font-semibold">
							{listing.city}, {listing.state} {listing.zip}
						</p>
					</div>
				</div>
				<div className="flex flex-col w-full pt-4 pb-52">
					<p className="text-xl text-black font-semibold">Description</p>
					<p className="text-sm text-black">{listing.description}</p>
				</div>
			</div>
		</>
	);
};

export default Listings;
