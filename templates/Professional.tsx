import React, { useEffect, useState } from "react";

const Professional: React.FC = () => {
	const [data, setData] = useState<any>(null);

	const updateData = () => {
		// Fetch data from local storage
		const storedData = localStorage.getItem("data");

		// Parse the JSON string to an object
		const parsedData = storedData ? JSON.parse(storedData) : null;

		// Set the data in the state
		setData(parsedData);
	};

	useEffect(() => {
		// Fetch initial data from local storage
		updateData();

		// Add event listener for the storage event
		window.addEventListener("storage", updateData);

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener("storage", updateData);
		};
	}, []); // The empty dependency array ensures this effect runs only once on component mount

	if (!data) {
		// Handle the case where data is not available yet
		return <div>Loading...</div>;
	}

	return (
		<div className="flex justify-center w-full p-10">
			<div className="a4 border p-10 bg-white">
				<p>Full Name: {data.fullName}</p>
				<p>Phone Number: {data.phoneNumber}</p>
				<p>Email Address: {data.emailAddress}</p>
				<p>Address: {data.address}</p>
				<p>Objective: {data.objective}</p>

				<h2>Employment:</h2>
				<ul>
					{data.employment?.map((job: any, index: number) => (
						<li key={index}>
							{job.companyName} - {job.jobTitle}, {job.city} (
							{job.startYear} - {job.endYear})
							<p>{job.description}</p>
						</li>
					))}
				</ul>

				<h2>Education:</h2>
				<ul>
					{data.education?.map((school: any, index: number) => (
						<li key={index}>
							{school.schoolName} - {school.degree},{" "}
							{school.fieldOfStudy} ({school.startYear} -{" "}
							{school.endYear})<p>{school.description}</p>
						</li>
					))}
				</ul>

				<h2>Skills:</h2>
				<ul>
					{data.skills?.map((skill: any, index: number) => (
						<li key={index}>
							{skill.skillTitle} - {skill.skillRating}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Professional;
