const Footer = () => {
	return (
		<>
			<nav
				className={`flex flex-col w-full h-fit my-4 items-center justify-between bg-maroon-700 text-white`}
			>
				<h1 className="text-2xl font-bold pt-4">Housing Prof</h1>
				<p className=" px-4 lg:px-96 text-center pt-4 pb-10 text-base">
					Housing Prof is the go-to platform for finding your ideal property in
					the Bryan/College Station area. Simplify your search with our
					extensive listings and expert guidance, making it easy to discover
					your dream home or investment property.
				</p>
				<div className="flex flex-row justify-between pt-4 pb-4 px-6 h-fit w-full outline bg-maroon-700">
					<p className="justify-center text-center pr-4">Copyright ©2023</p>
					<div className="flex flex-row justify-center">
						<a className="pr-4" href="/">
							Home
						</a>
						<a className="pr-4" href="/explore">
							Explore
						</a>
						<a className="pr-4" href="/about">
							About
						</a>
						<a href="mailto: example@example.com">Contact</a>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Footer;
