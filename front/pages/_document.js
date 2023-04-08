import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class _Document extends Document {
	render() {
		return (
			<Html className="bg-white">
				<Head />
				<body className="bg-white text-black">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
