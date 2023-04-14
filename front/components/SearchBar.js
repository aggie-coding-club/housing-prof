const SearchBar = (props) => {
	return (
		<form className="w-full">
			<label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
				Search
			</label>
			<div className="relative">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						aria-hidden="true"
						className="w-5 h-5 text-gray-500 dark:text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
					</svg>
				</div>
				<input
					type="search"
					id="default-search"
					className="block w-full p-2.5 pl-10 text-sm my-1 mb-2 text-gray-900 shadow-md border border-gray-300 rounded-md bg-gray-50 focus:ring-maroon-500 dark:focus:ring-maroon-500 dark:focus:border-maroon-500 focus:border-maroon-600 transition"
					placeholder="Search"
					value={props.search}
					onChange={(e) => props.setSearch(e.target.value.replace(' ', '+'))}
					required
				/>
				<button
					type="submit"
					className="text-white  absolute right-2 bottom-1.5 bg-maroon-700 hover:bg-maroon-700 focus:ring-4 focus:outline-none focus:ring-maroon-300 font-medium rounded-md text-sm px-2.5 py-1.5 dark:bg-maroon-600 dark:hover:bg-maroon-700 dark:focus:ring-maroon-700 transition"
					onClick={() => {
						props.handleSearch;
					}}
				>
					Search
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
