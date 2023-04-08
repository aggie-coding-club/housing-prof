// Profile Page
import Image from 'next/image';
import { listings } from '@/exampleHomes';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Context } from '@/context/state.js';

const Profile = () => {
	const [context, setContext] = useContext(Context);
	const [bookmarks, setBookmarks] = useState([]);
	const [bookmarkListings, setBookmarkListings] = useState([]);
	const [featuredListings, setFeaturedListings] = useState([]);
	const [loading, setLoading] = useState(true);

	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem('housingprof_token');
		if (!token && !loading) {
			router.push('/login');
		} else {
			const bookmarks = fetch(
				(process.env.NEXT_ENV === 'development'
					? process.env.NEXT_BACK_API_URL_DEV
					: process.env.NEXT_BACK_API_URL_PROD) + `/users/me/bookmarks`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);
			bookmarks.then((res) => {
				if (res.status === 200) {
					const body = res.json();
					body.then((data) => {
						setBookmarks(data);
					});
				} else {
					console.log('error');
				}
			});
		}
	}, []);

	useEffect(() => {
		if (bookmarks.length > 0) {
			const bookmarkListings = fetch(
				(process.env.NEXT_ENV === 'development'
					? process.env.NEXT_BACK_API_URL_DEV
					: process.env.NEXT_BACK_API_URL_PROD) +
					`/users/me/bookmarks/listings`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${context.token}`,
					},
				}
			);
			bookmarkListings.then((res) => {
				if (res.status === 200) {
					const body = res.json();
					body.then((data) => {
						setBookmarkListings(data);
						setLoading(false);
					});
				} else {
					console.log('error');
				}
			});
		} else {
			const featuredListings = fetch(
				(process.env.NEXT_ENV === 'development'
					? process.env.NEXT_BACK_API_URL_DEV
					: process.env.NEXT_BACK_API_URL_PROD) + '/listing/featured',
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			featuredListings.then((res) => {
				if (res.status === 200) {
					const body = res.json();
					body.then((data) => {
						setFeaturedListings(data);
						setLoading(false);
					});
				}
			});
		}
	}, [bookmarks]);

	const logout = () => {
		localStorage.removeItem('housingprof_token');
		setContext({});
		router.push('/login');
	};

	return (
		<div className="flex flex-col items-center h-full py-6">
			<div className="w-40 h-40 rounded-full">
				<img
					src={context.profileImage}
					className="rounded-full h-full w-auto object-cover object-center"
				/>
			</div>
			<h1 className="text-2xl pt-2 pb-1">
				{context.firstName} {context.lastName}
			</h1>
			{bookmarkListings && bookmarkListings.length > 0 ? (
				<div className="flex flex-col w-full h-fit pt-0">
					<h1 className="text-3xl font-semibold text-center py-4">
						My Bookmarks
					</h1>
					<div class="carousel carousel-center rounded-box pb-12 px-10">
						{bookmarkListings.map((listing) => (
							<div class="carousel-item px-2">
								<a href={`/${listing._id}`}>
									<div className="card card-compact w-[22rem] lg:w-96 shadow-xl cursor-pointer">
										<figure className="h-44">
											<img
												src={
													listing.images.length > 0 ? listing.images[0].url : ''
												}
												alt={
													listing.images.length > 0 ? listing.images[0].alt : ''
												}
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
							</div>
						))}
					</div>
				</div>
			) : (
				<>
					<h1 className="text-3xl font-semibold text-center py-4">
						No Bookmarks, So Here's Some Featured Listings
					</h1>
					{featuredListings.length > 0 ? (
						<div className="flex flex-col w-full">
							<div class="carousel carousel-center rounded-box pb-8 pt-4 px-10">
								{featuredListings.map((listing, index) => (
									<div class="carousel-item px-2" key={index}>
										<a href={`/${listing._id}`}>
											<div className="card card-compact w-[22rem] lg:w-96 shadow-xl cursor-pointer">
												<figure className="h-44">
													<img
														src={
															listing.images.length > 0
																? listing.images[0].url
																: ''
														}
														alt={
															listing.images.length > 0
																? listing.images[0].alt
																: ''
														}
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
									</div>
								))}
							</div>
						</div>
					) : (
						<></>
					)}
				</>
			)}
			<h1 className="cursor-pointer" onClick={logout}>
				Sign Out
			</h1>
		</div>
	);
};

export default Profile;
