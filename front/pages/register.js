// Register Page
import { useContext, useState } from 'react';
import { Context } from '@/context/state.js';
import { useRouter } from 'next/router';

const Register = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const router = useRouter();

	const [context, setContext] = useContext(Context);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert('Passwords do not match');
		} else if (
			firstName === '' ||
			lastName === '' ||
			email === '' ||
			password === '' ||
			confirmPassword === ''
		) {
			alert('Please fill out all fields');
		} else if (password.length < 6) {
			alert('Password must be at least 6 characters');
		} else {
			const user = fetch(
				(process.env.NEXT_ENV === 'development'
					? process.env.NEXT_BACK_API_URL_DEV
					: process.env.NEXT_BACK_API_URL_PROD) + '/users',
				{
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						firstName,
						lastName,
						email,
						password,
					}),
				}
			);
			user.then((res) => {
				if (res.status === 201) {
					const body = res.json();
					body.then((data) => {
						setContext({
							id: data._id,
							firstName: data.firstName,
							lastName: data.lastName,
							profileImage: data.profileImage,
							email: data.email,
						});
						router.push('/');
					});
				} else {
					alert('Email already in use');
				}
			});
		}
	};

	return (
		<div className="flex flex-col justify-center items-center h-full w-full py-6">
			<h1
				className={`text-red-400 ${
					false ? 'block h-fit' : 'invisible h-0'
				} transition-all`}
			>
				{' '}
				Incorrect Username or Password
			</h1>
			<div className="flex flex-col justify-center items-center w-fit h-fit py-2 px-10 border-2 shadow-xl rounded-xl">
				<h1>Register</h1>
				<input
					type="text"
					placeholder="First Name"
					class="bg-white border border-gray-300 text-black focus:outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 m-2"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Last Name"
					class="bg-white border border-gray-300 text-black focus:outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 m-2"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
				<input
					type="email"
					placeholder="Email"
					class="bg-white border border-gray-300 text-black focus:outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 m-2"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					class="bg-white border border-gray-300 text-black focus:outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 m-2"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Confirm Password"
					class="bg-white border border-gray-300 text-black focus:outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 m-2"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<button
					type="submit"
					className="inline-block text-sm px-4 py-2.5 m-2 leading-none border rounded bg-maroon-700 text-white border-white hover:border-transparent hover:text-white hover:bg-maroon-800 transition"
					onClick={submitHandler}
				>
					Register
				</button>
			</div>
		</div>
	);
};

export default Register;
