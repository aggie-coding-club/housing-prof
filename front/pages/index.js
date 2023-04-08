// Home Page
import SearchBar from '../components/SearchBar';
import { Parallax } from 'react-parallax';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../context/state.js';
import { useRouter } from 'next/router';

const Home = () => {
	const categories = ['Houses', 'Condos', 'Apartment', 'Land', 'Commercial'];
	const [searchInput, setSearchInput] = useState('');
	const [featuredListings, setFeaturedListings] = useState([]);
	const [bookmarks, setBookmarks] = useState([]);
	const [context, setContext] = useContext(Context);
	const router = useRouter();

	useEffect(() => {
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
				});
			}
		});
		const token = localStorage.getItem('housingprof_token');
		if (token) {
			const bookmarkListings = fetch(
				(process.env.NEXT_ENV === 'development'
					? process.env.NEXT_BACK_API_URL_DEV
					: process.env.NEXT_BACK_API_URL_PROD) +
					`/users/me/bookmarks/listings`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);
			bookmarkListings.then((res) => {
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

	const handleSearch = () => {
		router.push({ pathname: '/sdagasf' });
	};

	const explore = () => {
		router.push({ pathname: '/explore' });
	};

	return (
		<div className="flex flex-col items-center h-fit">
			<Parallax
				bgImage="/splash.jpeg"
				className="w-full h-[30rem]"
				strength={200}
				style={{ position: 'absolute' }}
				bgImageStyle={{ bottom: '-5rem', width: '100%', minWidth: '1000px' }}
			>
				<div className="w-full h-[30rem] px-5 lg:px-52 flex flex-col items-center justify-center bg-[#22222288] ">
					<p className="text-white text-5xl font-semibold py-2 w-full text-center">
						Learn From The Housing Prof
					</p>
					<p className="text-white text-3xl font-medium py-2 w-full text-center">
						Expert Guidance for Bryan/College Station Properties
					</p>
					<div className="w-full flex justify-center px-20 py-2">
						{/* <SearchBar
							categories={categories}
							search={searchInput}
							setSearch={setSearchInput}
							handleSearch={handleSearch}
						/> */}
						<a
							className="inline-block text-2xl px-4 py-3 text-center items-center leading-none border rounded-lg text-white border-maroon-700 bg-maroon-700 hover:bg-maroon-800 mt-4 lg:mt-0 cursor-pointer transition"
							onClick={explore}
						>
							Explore
						</a>
					</div>
				</div>
			</Parallax>
			{featuredListings.length > 0 ? (
				<div className="flex flex-col w-full pt-[30rem]">
					<h1 className="text-3xl font-semibold text-center pt-6">
						Featured Listings
					</h1>
					<div class="carousel carousel-center rounded-box pb-8 pt-4 px-10">
						{featuredListings.map((listing, index) => (
							<div class="carousel-item px-2" key={index}>
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
				<></>
			)}
			{bookmarks && bookmarks.length > 0 ? (
				<div className="flex flex-col w-full h-fit pt-0">
					<h1 className="text-3xl font-semibold text-center py-4">
						My Bookmarks
					</h1>
					<div class="carousel carousel-center rounded-box pb-12 px-10">
						{bookmarks.map((listing) => (
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
				<></>
			)}
		</div>
	);
};

export default Home;
