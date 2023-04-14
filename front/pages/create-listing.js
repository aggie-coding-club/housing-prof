import { useState } from 'react';
import { useRouter } from 'next/router';
import listings from '../data/listings';

const CreateListing = () => {
	const [formData, setFormData] = useState({
		address: '',
		city: '',
		state: '',
		zip: '',
		price: '',
		bedrooms: '',
		bathrooms: '',
		sqft: '',
		description: '',
		images: [],
		propertyType: 'house',
		email: '',
	});

	const router = useRouter();

	const handleImageChange = (e) => {
		const inputValues = e.target.value.split(',');
		const images = [];

		for (let i = 0; i < inputValues.length; i += 2) {
			if (inputValues[i].trim() && inputValues[i + 1]) {
				images.push({
					url: inputValues[i].trim(),
					alt: inputValues[i + 1].trim(),
				});
			}
		}

		setFormData({ ...formData, images });
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handlePropertyTypeClick = (propertyType) => {
		if (propertyType === 'house') {
			setFormData((prevState) => {
				const updatedState = { ...prevState, propertyType };
				delete updatedState.floor;
				delete updatedState.roomNumber;
				delete updatedState.buildingAmenities;
				return updatedState;
			});
		} else if (propertyType === 'apartment') {
			setFormData((prevState) => {
				const updatedState = { ...prevState, propertyType };
				delete updatedState.lotSize;
				return updatedState;
			});
		} else if (propertyType === 'condo') {
			setFormData((prevState) => {
				const updatedState = { ...prevState, propertyType };
				delete updatedState.floor;
				delete updatedState.lotSize;
				return updatedState;
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await fetch(
				(process.env.NEXT_ENV === 'development'
					? process.env.NEXT_BACK_API_URL_DEV
					: process.env.NEXT_BACK_API_URL_PROD) + '/listing',
				{
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				}
			).then((res) => res.json());
			router.push(`/listings/${data._id}`);
		} catch (error) {
			console.error('Error creating listing:', error);
		}
	};

	const addListings = async () => {
		for (let i = 0; i < 5; i++) {
			if (listings[i].description.type !== 'land') {
				let listing = {};
				if (listings[i].description.type !== 'condos') {
					listing = {
						address: listings[i].location.address.line,
						city: listings[i].location.address.city,
						state: listings[i].location.address.state_code,
						zip: listings[i].location.address.postal_code,
						price: listings[i].list_price,
						bedrooms: listings[i].description.beds,
						bathrooms: listings[i].description.baths,
						sqft: listings[i].description.sqft,
						description: ' ',
						images: [
							{ url: listings[i].primary_photo.href, alt: 'Primary Photo' },
						],
						propertyType: 'house',
						lotSize: listings[i].description.lot_sqft,
						email: listings[i].advertisers[0].email
							? listings[i].advertisers[0].email
							: ' ',
					};
				} else {
					listing = {
						address: listings[i].location.address.line,
						city: listings[i].location.address.city,
						state: listings[i].location.address.state_code,
						zip: listings[i].location.address.postal_code,
						price: listings[i].list_price,
						bedrooms: listings[i].description.beds,
						bathrooms: listings[i].description.baths,
						sqft: listings[i].description.sqft,
						description: ' ',
						images: [
							{ url: listings[i].primary_photo.href, alt: 'Primary Photo' },
						],
						propertyType: 'condo',
						roomNumber: ' ',
						buildingAmenities: [],
						email: listings[i].advertisers[0].email
							? listings[i].advertisers[0].email
							: ' ',
					};
				}
				try {
					const { data } = await fetch(
						(process.env.NEXT_ENV === 'development'
							? process.env.NEXT_BACK_API_URL_DEV
							: process.env.NEXT_BACK_API_URL_PROD) + '/listing',
						{
							method: 'POST',
							credentials: 'include',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(listing),
						}
					).then((res) => res.json());
					router.push(`/listings/${data._id}`);
				} catch (error) {
					console.error('Error creating listing:', error);
				}
			}
		}
	};

	return (
		<div className="flex flex-col items-center py-6 w-full">
			<h1 className="font-bold text-2xl">Create a New Listing</h1>
			<div>
				<button
					onClick={() => handlePropertyTypeClick('house')}
					className={`border-2 text-white p-2 m-1 rounded-lg ${
						formData.propertyType === 'house'
							? 'bg-maroon-600'
							: 'bg-maroon-700'
					}`}
				>
					House
				</button>
				<button
					onClick={() => handlePropertyTypeClick('apartment')}
					className={`border-2 text-white p-2 m-1 rounded-lg ${
						formData.propertyType === 'apartment'
							? 'bg-maroon-600'
							: 'bg-maroon-700'
					}`}
				>
					Apartment
				</button>
				<button
					onClick={() => handlePropertyTypeClick('condo')}
					className={`border-2 text-white p-2 m-1 rounded-lg ${
						formData.propertyType === 'condo'
							? 'bg-maroon-600'
							: 'bg-maroon-700'
					}`}
				>
					Condo
				</button>
			</div>
			<form onSubmit={handleSubmit} className="w-full">
				<div className="flex flex-row justify-center items-center">
					<label htmlFor="address">Address</label>
					<input
						type="text"
						name="address"
						value={formData.address}
						onChange={handleChange}
						placeholder="123 Main St."
						className="border-2 p-1 m-2 rounded-md bg-white"
					/>
				</div>
				<div className="flex flex-row justify-center items-center">
					<label htmlFor="city">City</label>
					<input
						type="text"
						name="city"
						value={formData.city}
						onChange={handleChange}
						placeholder="New York City"
						className="border-2 p-1 m-2 rounded-md bg-white"
					/>
				</div>
				<div className="flex flex-row justify-center items-center">
					<label htmlFor="state">State</label>
					<input
						type="text"
						name="state"
						value={formData.state}
						onChange={handleChange}
						placeholder="NY"
						className="border-2 p-1 m-2 rounded-md bg-white"
					/>
				</div>
				<div className="flex flex-row justify-center items-center">
					<label htmlFor="zip">Zip</label>
					<input
						type="text"
						name="zip"
						value={formData.zip}
						onChange={handleChange}
						placeholder="10001"
						className="border-2 p-1 m-2 rounded-md bg-white"
					/>
				</div>
				<div className="flex flex-row justify-center items-center">
					<label htmlFor="price">
						Price {formData.propertyType !== 'house' ? 'Per Month' : ''}
					</label>
					<input
						type="number"
						name="price"
						value={formData.price}
						onChange={handleChange}
						placeholder="1000000"
						className="border-2 p-1 m-2 rounded-md bg-white"
					/>
				</div>
				<div className="flex flex-row justify-center items-center">
					<label htmlFor="bedrooms">Bedrooms</label>
					<input
						type="number"
						name="bedrooms"
						value={formData.bedrooms}
						onChange={handleChange}
						placeholder="3"
						className="border-2 p-1 m-2 rounded-md bg-white"
					/>
				</div>
				<div className="flex flex-row justify-center items-center">
					<label htmlFor="bathrooms">Bathrooms</label>
					<input
						type="number"
						name="bathrooms"
						value={formData.bathrooms}
						onChange={handleChange}
						placeholder="2"
						className="border-2 p-1 m-2 rounded-md bg-white"
					/>
				</div>
				<div className="flex flex-row justify-center items-center">
					<label htmlFor="sqft">Square Feet</label>
					<input
						type="number"
						name="sqft"
						value={formData.sqft}
						onChange={handleChange}
						placeholder="2000"
						className="border-2 p-1 m-2 rounded-md bg-white"
					/>
				</div>
				<div className="flex flex-row justify-center items-center">
					<label htmlFor="description">Description</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
						placeholder="Beautiful home with a view of the park"
						className="border-2 p-1 m-2 rounded-md bg-white"
					/>
				</div>
				<div className="flex flex-row justify-center items-center">
					<label htmlFor="email">Email</label>
					<input
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="example@example.com"
						defaultValue="example@example.com"
						className="border-2 p-1 m-2 rounded-md bg-white"
					/>
				</div>
				<div className="flex flex-row justify-center items-center">
					<label htmlFor="images">
						Images (URL and alt text, comma-separated)
					</label>
					<textarea
						type="text"
						name="images"
						placeholder="https://example.com/image1.jpg, Image 1, https://example.com/image2.jpg, Image 2"
						className="border-2 p-1 m-2 rounded-md bg-white"
						onChange={handleImageChange}
					/>
				</div>
				{/* Conditionally render additional fields based on the propertyType */}
				{formData.propertyType === 'apartment' && (
					<div className="flex flex-row justify-center items-center">
						<label htmlFor="floor">Floor</label>
						<input
							type="number"
							name="floor"
							value={formData.floor}
							onChange={handleChange}
							placeholder="3"
							className="border-2 p-1 m-2 rounded-md bg-white"
						/>
					</div>
				)}

				{(formData.propertyType === 'apartment' ||
					formData.propertyType === 'condo') && (
					<>
						<div className="flex flex-row justify-center items-center">
							<label htmlFor="roomNumber">Room Number</label>
							<input
								type="text"
								name="roomNumber"
								value={formData.roomNumber}
								onChange={handleChange}
								placeholder="3A"
								className="border-2 p-1 m-2 rounded-md bg-white"
							/>
						</div>
						<div className="flex flex-row justify-center items-center">
							<label htmlFor="buildingAmenities">
								Building Amenities (comma-separated)
							</label>
							<input
								type="text"
								name="buildingAmenities"
								value={formData.buildingAmenities}
								onChange={(e) =>
									setFormData({
										...formData,
										buildingAmenities: e.target.value.split(','),
									})
								}
								placeholder="gym, pool, laundry"
								className="border-2 p-1 m-2 rounded-md bg-white"
							/>
						</div>
					</>
				)}

				{formData.propertyType === 'house' && (
					<div className="flex flex-row justify-center items-center">
						<label htmlFor="lotSize">Lot Size</label>
						<input
							type="number"
							name="lotSize"
							value={formData.lotSize}
							onChange={handleChange}
							placeholder="1000"
							className="border-2 p-1 m-2 rounded-md bg-white"
						/>
					</div>
				)}
				<div className="flex flex-row justify-center items-center">
					<button
						type="submit"
						className={`border-2 bg-maroon-700 text-white p-2 m-1 rounded-lg`}
					>
						Create Listing
					</button>
					<button
						type="submit"
						className={`border-2 bg-maroon-400 text-white p-2 m-1 rounded-lg`}
						onClick={() => {
							addListings();
						}}
					>
						Add all listings
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateListing;
