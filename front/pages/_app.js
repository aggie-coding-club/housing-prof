import '@/styles/globals.css';
import { MantineProvider } from '@mantine/core';

export default function App({ Component, pageProps }) {
	return (
		<>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					/** Put your mantine theme override here */
					colorScheme: 'light',
				}}
			>
				<Component {...pageProps} />
			</MantineProvider>
		</>
	);
}
