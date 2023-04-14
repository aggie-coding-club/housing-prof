import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class _Document extends Document {
	render() {
		return (
			<Html className="bg-white">
				<Head>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png"
					/>
					<link rel="manifest" href="/site.webmanifest" />
					<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#500000" />
					<meta name="msapplication-TileColor" content="#500000" />
					<meta name="theme-color" content="#500000" />
				</Head>
				<body className="bg-white text-black">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
