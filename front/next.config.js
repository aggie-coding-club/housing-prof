/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		NEXT_ENV: process.env.NEXT_ENV,
		NEXT_BACK_API_URL_DEV: process.env.NEXT_BACK_API_URL_DEV,
		NEXT_BACK_API_URL_PROD: process.env.NEXT_BACK_API_URL_PROD,
	},

	reactStrictMode: true,
	images: {
		domains: ['api.dicebear.com'],
		formats: ['image/avif', 'image/webp'],
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://localhost:8000/:path*',
				destination: 'https://api.dicebear.com/6.x/initials/svg:path*',
			},
		];
	},
};

module.exports = nextConfig;
