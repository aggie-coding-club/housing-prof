import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function App({ Component, pageProps }) {
	return (
		<>
			<ThemeProvider>
				<NavBar />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}
