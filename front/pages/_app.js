import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Context } from '@/context/state.js';
import { useState, useEffect, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import Modal from '@/components/Modal';

export default function App({ Component, pageProps }) {
	useEffect(() => {
		if (!context.id) {
			const user = fetch(
				(process.env.NEXT_ENV === 'development'
					? process.env.NEXT_BACK_API_URL_DEV
					: process.env.NEXT_BACK_API_URL_PROD) + '/users/me',
				{
					method: 'GET',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			user.then((res) => {
				if (res.status === 200) {
					const body = res.json();
					body.then((data) => {
						setContext({
							id: data._id,
							firstName: data.firstName,
							lastName: data.lastName,
							profileImage: data.profileImage,
							email: data.email,
						});
					});
				} else {
					console.log('User not found');
				}
			});
		}
	}, []);

	const [context, setContext] = useState({
		id: '',
		firstName: '',
		lastName: '',
		profileImage: '',
		email: '',
	});
	return (
		<>
			<Context.Provider value={[context, setContext]}>
				<AnimatePresence mode="wait">
					<ThemeProvider>
						<NavBar />
						<Component {...pageProps} />
						<Footer />
					</ThemeProvider>
				</AnimatePresence>
			</Context.Provider>
		</>
	);
}
