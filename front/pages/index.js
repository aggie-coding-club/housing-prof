// Home Page
import SearchBar from '../components/SearchBar';
import { Parallax } from 'react-parallax';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../context/state.js';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { riseWithFade } from '@/utils/animations';
import Slide from '@/components/Slide';

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
		if (context.id) {
			const bookmarkListings = fetch(
				(process.env.NEXT_ENV === 'development'
					? process.env.NEXT_BACK_API_URL_DEV
					: process.env.NEXT_BACK_API_URL_PROD) +
					`/users/me/bookmarks/listings`,
				{
					method: 'GET',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
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
		<motion.div
			className="flex flex-col items-center h-fit"
			initial="initial"
			animate="animate"
		>
			<Parallax
				bgImage="/splash.jpeg"
				className="w-full h-[30rem]"
				strength={200}
				style={{ position: 'absolute' }}
				bgImageStyle={{ bottom: '-5rem', width: '100%', minWidth: '1000px' }}
			>
				<div className="w-full h-[30rem] px-5 lg:px-52 flex flex-col items-center justify-center bg-[#22222288]">
					<motion.div variants={riseWithFade}>
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
					</motion.div>
				</div>
			</Parallax>
			<div className="w-full h-fit flex flex-col justify-center items-center mt-[30rem]">
				<Slide listings={featuredListings} title={'Featured Listings'} />
				<Slide listings={bookmarks} title={'My Bookmarks'} />
			</div>
		</motion.div>
	);
};

export default Home;
