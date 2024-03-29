import { useState, useContext } from 'react';
import { HomeIcon } from '@heroicons/react/24/outline';
import { Router, useRouter } from 'next/router';
import { Context } from '@/context/state.js';

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const [context, setContext] = useContext(Context);

	const toggleNav = () => {
		setIsOpen(!isOpen);
	};

	const returnHome = () => {
		router.push('/');
	};

	const goExplore = () => {
		router.push('/explore');
	};

	const goBookmarks = () => {
		router.push('/bookmarks');
	};

	const login = () => {
		router.push('/login');
	};

	const signup = () => {
		router.push('/register');
	};

	const goProfile = () => {
		router.push('/profile');
	};

	return (
		<>
			<nav
				className={`flex items-center justify-between flex-wrap bg-maroon-700 text-white p-6 lg:pb-6 ${
					isOpen ? 'pb-16' : 'pb-6'
				}`}
			>
				<div
					className="flex items-center flex-shrink-0 text-white hover:text-gray-300 hover:border-gray-300 mr-6 cursor-pointer top-5 absolute"
					onClick={returnHome}
				>
					<div className="w-9 h-9 mr-2 border-2 border-inherit rounded-md flex justify-center items-center transition">
						<HomeIcon className="w-12 h-12 p-1 stroke-2 text-inherit border-inherit" />
					</div>
					<span className="font-semibold text-xl tracking-tight transition">
						Housing Prof
					</span>
				</div>
				<div className="block lg:hidden ml-auto">
					<button
						onClick={toggleNav}
						className="flex items-center px-3 py-2 border rounded text-inherit border-inherit hover:text-gray-300 hover:border-gray-300 transition"
					>
						<svg
							className="fill-current h-3 w-3"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Menu</title>
							<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
						</svg>
					</button>
				</div>
				<div
					className={`w-full block flex-grow lg:flex lg:items-center lg:justify-center lg:w-auto ${
						isOpen ? '' : 'hidden'
					}`}
				>
					<div className="text-md lg:flex lg:items-center lg:justify-center">
						<a
							onClick={returnHome}
							className="block mt-4 lg:inline-block lg:mt-0 text-inherit cursor-pointer hover:text-gray-300 mr-4 transition"
						>
							Home
						</a>
						<a
							onClick={goExplore}
							className="block mt-4 lg:inline-block lg:mt-0 text-inherit cursor-pointer hover:text-gray-300 ml-0 lg:ml-4 transition"
						>
							Explore
						</a>
						{/* <a
							onClick={goBookmarks}
							className="block mt-4 lg:inline-block lg:mt-0 text-inherit cursor-pointer hover:text-gray-300 transition"
						>
							Bookmarks
						</a> */}
						{context.id ? (
							<div className="absolute left-5 lg:right-5 lg:left-auto mb-4 lg:mb-0 ml-0 lg:ml-4 mt-4 lg:mt-0">
								<img
									src={context.profileImage}
									className="w-9 h-9 rounded-full cursor-pointer bg-center justify-center items-center hover:opacity-75 transition"
									onClick={goProfile}
								/>
							</div>
						) : (
							<div className="absolute left-5 lg:right-5 lg:left-auto">
								<a
									className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-maroon-700 hover:bg-white mt-4 mr-4 lg:mt-0 cursor-pointer transition"
									onClick={login}
								>
									Log in
								</a>
								<a
									className="inline-block text-sm px-4 py-2 leading-none border rounded text-maroon-700 border-white bg-white hover:bg-gray-300 mt-4 lg:mt-0 cursor-pointer transition"
									onClick={signup}
								>
									Sign Up
								</a>
							</div>
						)}
					</div>
				</div>
			</nav>
		</>
	);
};

export default NavBar;
