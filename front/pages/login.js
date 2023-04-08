// Login Page
import { useContext, useState } from 'react';
import { Context } from '@/context/state.js';
import { useRouter } from 'next/router';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const router = useRouter();

	const [context, setContext] = useContext(Context);

	const submitHandler = (e) => {
		e.preventDefault();
		const user = fetch(
			(process.env.NEXT_ENV === 'development'
				? process.env.NEXT_BACK_API_URL_DEV
				: process.env.NEXT_BACK_API_URL_PROD) + '/users/login',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
			}
		);
		user.then((res) => {
			if (res.status === 200) {
				const body = res.json();
				body.then((data) => {
					window.localStorage.setItem('housingprof_token', data.token);
					setContext({
						id: data._id,
						firstName: data.firstName,
						lastName: data.lastName,
						profileImage: data.profileImage,
						email: data.email,
						token: data.token,
					});
					router.push('/');
				});
			} else {
				setError(true);
			}
		});
	};

	return (
		<div className="flex flex-col justify-center items-center h-full w-full py-6">
			<h1
				className={`text-red-400 ${
					error ? 'block h-fit' : 'invisible h-0'
				} transition-all`}
			>
				{' '}
				Incorrect Username or Password
			</h1>
			<div className="flex flex-col justify-center items-center w-fit h-fit py-2 px-3 border-2 shadow-xl rounded-xl">
				<h1>Log in</h1>
				<div className="w-60 m-2">
					<input
						type="text"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						class="bg-white border border-gray-300 text-black focus:outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						placeholder="Email"
						required
					/>
				</div>
				<div className="w-60 m-2">
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						class="bg-white border border-gray-300 text-black focus:outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
						placeholder="Password"
						required
					/>
				</div>
				<button
					onClick={submitHandler}
					className="inline-block text-sm px-4 py-2.5 m-2 leading-none border rounded bg-maroon-700 text-white border-white hover:border-transparent hover:text-white hover:bg-maroon-800 mt-4 mr-4 lg:mt-0 transition"
				>
					Log in
				</button>
			</div>
		</div>
	);
};

export default Login;
