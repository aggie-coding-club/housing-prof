const Modal = () => {
	return (
		<div className="w-full h-screen justify-center items-center">
			<div className="fixed w-[75%] h-[75%] z-20 ">
				<div className="flex flex-row justify-between w-full h-full bg-red-700 rounded-xl">
					<div className="rounded-full bg-white w-8 h-8 m-2 absolute right-0 flex flex-row justify-center items-center cursor-pointer shadow-md">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</div>
				</div>
			</div>
			<div className="fixed w-full h-full z-10">
				<div className="flex flex-row justify-between w-full h-full bg-red-300 opacity-50 rounded-xl"></div>
			</div>
		</div>
	);
};

export default Modal;
