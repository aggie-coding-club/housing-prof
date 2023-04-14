// Listings Page
import Carousel from '@/components/Carousel';
import Head from 'next/head';
import { useState, useEffect, useContext } from 'react';
import { Context } from '@/context/state.js';
import { useRouter } from 'next/router';

const Listings = () => {
	const [idFound, setIdFound] = useState(false);
	const [loading, setLoading] = useState(true);
	const [listingBookmarked, setListingBookmarked] = useState(false);
	const [listing, setListing] = useState({
		address: '',
		city: '',
		state: '',
		zip: '',
		price: 0,
		bedrooms: 0,
		bathrooms: 0,
		sqft: 0,
		description: '',
		images: [],
	});
	const router = useRouter();

	const { id } = router.query;

	useEffect(() => {
		if (id) {
			const listing = fetch(
				(process.env.NEXT_ENV === 'development'
					? process.env.NEXT_BACK_API_URL_DEV
					: process.env.NEXT_BACK_API_URL_PROD) + `/listing/${id}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			listing.then((res) => {
				if (res.status === 200) {
					const body = res.json();
					body.then((data) => {
						setListing(data);
						setIdFound(true);
						setLoading(false);
					});
				} else {
					setIdFound(false);
					setLoading(false);
				}
			});
			const bookmarked = fetch(
				(process.env.NEXT_ENV === 'development'
					? process.env.NEXT_BACK_API_URL_DEV
					: process.env.NEXT_BACK_API_URL_PROD) + `/users/me/bookmarks`,
				{
					method: 'GET',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			bookmarked.then((res) => {
				if (res.status === 200) {
					const body = res.json();
					body.then((data) => {
						if (data.includes(id)) {
							setListingBookmarked(true);
						}
					});
				}
			});
		}
	}, [id]);

	const returnHome = () => {
		router.push('/');
	};

	const bookmarkListing = () => {
		const bookmark = fetch(
			(process.env.NEXT_ENV === 'development'
				? process.env.NEXT_BACK_API_URL_DEV
				: process.env.NEXT_BACK_API_URL_PROD) + `/users/me/bookmarks/add/${id}`,
			{
				method: 'PUT',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		bookmark.then((res) => {
			if (res.status === 200) {
				setListingBookmarked(true);
			}
		});
	};

	const unbookmarkListing = () => {
		const unbookmark = fetch(
			(process.env.NEXT_ENV === 'development'
				? process.env.NEXT_BACK_API_URL_DEV
				: process.env.NEXT_BACK_API_URL_PROD) +
				`/users/me/bookmarks/remove/${id}`,
			{
				method: 'PUT',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		unbookmark.then((res) => {
			if (res.status === 200) {
				setListingBookmarked(false);
			}
		});
	};

	if (loading) {
		return (
			<>
				<div className="flex flex-col text-start items-center h-full pt-6">
					<h1 className="text-2xl">Loading...</h1>
				</div>
			</>
		);
	}

	if (!idFound || !listing.address) {
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
							city={listing.city}
							state={listing.state}
							zip={listing.zip}
							listingLiked={listingBookmarked}
							likeListing={bookmarkListing}
							unlikeListing={unbookmarkListing}
							email={listing.email}
						/>
					</div>
				</div>
				<div className="flex flex-row justify-between w-full pt-4">
					<div className="flex flex-col">
						<p className="text-xl font-semibold text-black">
							${listing.price.toLocaleString()}
							{''}
							{listing.propertyType !== 'house' ? '/ month' : ''}
						</p>
						<div className="flex flex-row">
							<p className="flex flex-row text-black items-center text-center text-sm ml-1">
								{listing.propertyType.charAt(0).toUpperCase() +
									listing.propertyType.slice(1) +
									'   '}
								|{'   ' + listing.bedrooms}
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
								{listing.lotSize ? (
									<>
										{'   '} | Lot Size: {listing.lotSize} Sqft
									</>
								) : (
									<></>
								)}
								{listing.floor ? (
									<>
										{'   '}| Floor: {listing.floor}
									</>
								) : (
									<></>
								)}
								{listing.roomNumber ? (
									<>
										{'   '}| Room Number: {listing.roomNumber}
									</>
								) : (
									<></>
								)}
							</p>
						</div>
					</div>
					<div className="flex flex-col">
						<p className="text-xl text-black font-semibold">
							{listing.city}, {listing.state} {listing.zip}
						</p>
					</div>
				</div>
				<div className="flex flex-col w-full pt-4 pb-6">
					<p className="text-xl text-black font-semibold">Description</p>
					<p className="text-sm text-black">{listing.description}</p>
					{listing.propertyType !== 'house' ? (
						<>
							<p className="text-xl text-black font-semibold pt-4">
								Building Amenities
							</p>
							<p className="text-sm text-black">
								{listing.buildingAmenities.map((amenity) => (
									<li>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</li>
								))}
							</p>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		</>
	);
};

export default Listings;
