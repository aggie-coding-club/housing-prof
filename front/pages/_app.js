import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import NavBar from '../components/NavBar';
import ThemeToggle from '../components/ThemeToggle';

export default function App({ Component, pageProps }) {
	return (
		<>
			<ThemeProvider>
				<NavBar />
				<Component {...pageProps} />
				<ThemeToggle />
			</ThemeProvider>
		</>
	);
}
