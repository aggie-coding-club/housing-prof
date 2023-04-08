import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Context } from '@/context/state.js';
import { useState, useEffect, useContext } from 'react';

export default function App({ Component, pageProps }) {
	useEffect(() => {
		const token = window.localStorage.getItem('housingprof_token');
		if (!context.token && token) {
			const user = fetch(
				(process.env.NEXT_ENV === 'development'
					? process.env.NEXT_BACK_API_URL_DEV
					: process.env.NEXT_BACK_API_URL_PROD) + '/users/me',
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
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
							token: token,
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
		token: '',
	});
	return (
		<>
			<Context.Provider value={[context, setContext]}>
				<ThemeProvider>
					<NavBar />
					<Component {...pageProps} />
					<Footer />
				</ThemeProvider>
			</Context.Provider>
		</>
	);
}
