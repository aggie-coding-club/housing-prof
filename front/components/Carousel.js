import { useState, useContext } from 'react';
import { Context } from '@/context/state.js';

const ImageCarousel = (props) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [context, setContext] = useContext(Context);

	const prevSlide = () => {
		const isFirstSlide = currentIndex === 0;
		const newIndex = isFirstSlide ? props.slides.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
	};

	const nextSlide = () => {
		const isLastSlide = currentIndex === props.slides.length - 1;
		const newIndex = isLastSlide ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	};

	const goToSlide = (slideIndex) => {
		setCurrentIndex(slideIndex);
	};

	return (
		<div className="flex flex-col w-full h-full">
			<div className="w-full h-full m-auto relative group ">
				{/* <div
				style={{ backgroundImage: `url(${props.slides[currentIndex].url})` }}
				className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
			></div> */}
				{/* <Image
					src={props.slides[currentIndex].url}
					priority
					fill
					cover
					className="w-full h-full rounded-2xl duration-500 object-center object-cover transition-all"
				/> */}
				{props.slides.length > 0 ? (
					<img
						src={props.slides[currentIndex].url}
						className="w-full h-full rounded-2xl duration-500 object-center object-cover transition-all"
					/>
				) : (
					<div className="w-full h-full rounded-2xl bg-center bg-cover duration-500"></div>
				)}
				{/* Left Arrow */}
				<div className="absolute top-[50%] -translate-x-[50%] translate-y-[-50%] left-0 text-2xl rounded-full p-2 bg-white hover:bg-gray-100 transition-all text-maroon-700 shadow-md cursor-pointer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						onClick={prevSlide}
						className="w-6 h-6 stroke-[1.5] stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 19.5L8.25 12l7.5-7.5"
						/>
					</svg>
				</div>
				{/* Right Arrow */}
				<div className="absolute top-[50%] translate-x-[50%] translate-y-[-50%] right-0 text-2xl rounded-full p-2 bg-white hover:bg-gray-100 transition-all text-maroon-700 shadow-md cursor-pointer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						onClick={nextSlide}
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.25 4.5l7.5 7.5-7.5 7.5"
						/>
					</svg>
				</div>
				{!props.listingLiked ? (
					<div
						className={`absolute left-5 bottom-[0] translate-y-[25%] text-2xl rounded-full p-2 bg-white hover:bg-gray-100 transition-all text-maroon-700 shadow-md cursor-pointer ${
							context.token ? '' : 'opacity-75 pointer-events-none'
						}`}
						onClick={context.token ? props.likeListing : () => {}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
							/>
						</svg>
					</div>
				) : (
					<div
						className="absolute left-5 bottom-[0] translate-y-[25%] text-2xl rounded-full p-2 bg-white hover:bg-gray-100 transition-all text-maroon-700 shadow-md cursor-pointer"
						onClick={props.unlikeListing}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6"
						>
							<path
								fillRule="evenodd"
								d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				)}
				<div className="absolute left-5 bottom-[0] translate-x-[125%] translate-y-[25%] text-2xl rounded-full p-2 bg-white hover:bg-gray-100 transition-all text-maroon-700 shadow-md cursor-pointer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
						/>
					</svg>
				</div>
				<a href={`mailto: ${props.email}`}>
					<div className="absolute right-5 bottom-[0] -translate-x-[125%] translate-y-[25%] text-2xl rounded-full p-2 bg-white hover:bg-gray-100 transition-all text-maroon-700 shadow-md cursor-pointer">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
							/>
						</svg>
					</div>
				</a>
				<a
					href={`https://www.google.com/maps/search/?api=1&query=${
						props.address.replace(/ /g, '+') +
						'+' +
						props.city.replace(/ /g, '+') +
						'+' +
						props.state +
						'+' +
						props.zip
					}`}
					target="_blank"
				>
					<div className="absolute right-5 bottom-[0] translate-x-[0%] translate-y-[25%] text-2xl rounded-full p-2 bg-white hover:bg-gray-100 transition-all text-maroon-700 shadow-md cursor-pointer">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
							/>
						</svg>
					</div>
				</a>
			</div>
			<div className="flex bottom-3 justify-center">
				<div className="flex w-[9%] bottom-3 justify-center py-2">
					{props.slides.map((slide, slideIndex) => (
						<div
							key={slideIndex}
							onClick={() => goToSlide(slideIndex)}
							className="text-2xl cursor-pointer"
						>
							<div
								className={`w-3 h-3 rounded-full ${
									currentIndex === slideIndex ? 'bg-black/50' : 'bg-black/20'
								} ${
									slideIndex != props.slides.length - 1 ? 'mr-2' : 'mr-0'
								} transition`}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ImageCarousel;
