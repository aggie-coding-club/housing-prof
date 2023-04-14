// Profile Page
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Context } from '@/context/state.js';
import Slide from '@/components/Slide';
import Loading from '@/components/Loading';
import { motion } from 'framer-motion';
import { riseWithFade } from '@/utils/animations';

const Profile = () => {
	const [context, setContext] = useContext(Context);
	const [bookmarks, setBookmarks] = useState([]);
	const [bookmarkListings, setBookmarkListings] = useState([]);
	const [featuredListings, setFeaturedListings] = useState([]);
	const [loading, setLoading] = useState(true);

	const router = useRouter();

	useEffect(() => {
		if (!context.id) {
			router.push('/login');
		} else {
			const bookmarks = fetch(
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
		setContext({});
		router.push('/login');
	};

	return (
		<motion.div initial="initial" animate="animate">
			<div className="flex flex-col items-center h-full py-6">
				<motion.div variants={riseWithFade}>
					<div className="w-40 h-40 rounded-full">
						<img
							src={context.profileImage}
							className="rounded-full h-full w-auto object-cover object-center"
						/>
					</div>
					<h1 className="text-2xl pt-2 pb-1">
						{context.firstName} {context.lastName}
					</h1>
				</motion.div>
				{!loading ? (
					<>
						{bookmarkListings.length > 0 ? (
							<>
								<Slide listings={bookmarkListings} title={'My Bookmarks'} />
							</>
						) : (
							<>
								<h1 className="text-3xl font-semibold text-center py-4">
									No Bookmarks, So Here's Some Featured Listings
								</h1>
								<Slide listings={featuredListings} title={''} />
							</>
						)}
						<h1 className="cursor-pointer" onClick={logout}>
							Sign Out
						</h1>
					</>
				) : (
					<>
						<Loading />
					</>
				)}
			</div>
		</motion.div>
	);
};

export default Profile;
