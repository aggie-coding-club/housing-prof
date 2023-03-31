import { useState } from 'react';

const SearchBar = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<form className="w-full">
			<label
				for="default-search"
				class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
			>
				Search
			</label>
			<div class="relative">
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						aria-hidden="true"
						class="w-5 h-5 text-gray-500 dark:text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
				</div>
				<input
					type="search"
					id="default-search"
					class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-maroon-500 dark:focus:ring-maroon-500 dark:focus:border-maroon-500 focus:border-maroon-600 transition"
					placeholder="Search Houses, Apartments, Condos, Townhomes, and more..."
					required
				/>
				<button
					type="submit"
					class="text-white absolute right-2.5 bottom-2.5 bg-maroon-700 hover:bg-maroon-700 focus:ring-4 focus:outline-none focus:ring-maroon-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-maroon-600 dark:hover:bg-maroon-700 dark:focus:ring-maroon-700 transition"
				>
					Search
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
