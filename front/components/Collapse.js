import { useState, useRef } from 'react';

export const CollapsePage = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="">
			<button
				className="flex flex-row justify-between items-center px-2 py-1.5 w-full text-start text-black border font-medium shadow-md rounded-md focus:outline-none"
				onClick={toggle}
			>
				{props.title}
				{isOpen ? (
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
							d="M4.5 15.75l7.5-7.5 7.5 7.5"
						/>
					</svg>
				) : (
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
							d="M19.5 8.25l-7.5 7.5-7.5-7.5"
						/>
					</svg>
				)}
			</button>
			<Collapse isOpen={isOpen} className="pl-2">
				{props.options.map((option) => {
					return (
						<h2
							className={`py-0.5 cursor-pointer w-fit ${
								props.activeSelection === option ? 'font-bold' : 'font-medium'
							}`}
							onClick={() => props.setActiveSelection(option)}
						>
							{option}
						</h2>
					);
				})}
			</Collapse>
		</div>
	);
};

/* Logic */
const Collapse = ({ isOpen, children }) => {
	const ref = useRef(null);

	const inlineStyle = isOpen
		? { height: ref.current?.scrollHeight }
		: { height: 0 };

	return (
		<div
			ref={ref}
			aria-hidden={!isOpen}
			style={inlineStyle}
			className={`${
				isOpen ? 'border' : 'border-white'
			} flex-col px-2 py-0.5 shadow-lg rounded-md transition-all ease mt-2 text-black overflow-hidden duration-300`}
		>
			{children}
		</div>
	);
};
