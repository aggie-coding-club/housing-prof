module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./node_modules/flowbite/**/*.js',
		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				maroon: {
					50: '#ffeaea',
					100: '#edc8c8',
					200: '#dba4a4',
					300: '#cb8080',
					400: '#bb5d5c',
					500: '#a24443',
					600: '#7f3434',
					700: '#5c2425',
					800: '#381415',
					900: '#1a0303',
				},
			},
			backgroundPosition: {
				centerBottom: 'center 78%',
			},
			transition: {
				opacity: 'opacity 2s linear',
			},
		},
	},
	plugins: [require('daisyui')],
};
