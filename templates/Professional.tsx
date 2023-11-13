import React from "react";

interface ProfessionalProps {
	ref?: any;
	data?: {
		fullName?: string;
		phoneNumber?: string;
		emailAddress?: string;
		address?: string;
		objective?: string;
		employment?: {
			companyName?: string;
			jobTitle?: string;
			city?: string;
			startYear?: string;
			endYear?: string;
			description?: string;
		}[];
		education?: {
			schoolName?: string;
			degree?: string;
			fieldOfStudy?: string;
			startYear?: string;
			endYear?: string;
			city?: string;
			description?: string;
		}[];
		skills?: {
			skillTitle?: string;
			skillRating?: string;
		}[];
	};
}

const Professional: React.FC<ProfessionalProps> = ({ data }) => {
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
					{data.employment?.map((job, index) => (
						<li key={index}>
							{job.companyName} - {job.jobTitle}, {job.city} (
							{job.startYear} - {job.endYear})
							<p>{job.description}</p>
						</li>
					))}
				</ul>

				<h2>Education:</h2>
				<ul>
					{data.education?.map((school, index) => (
						<li key={index}>
							{school.schoolName} - {school.degree},{" "}
							{school.fieldOfStudy} ({school.startYear} -{" "}
							{school.endYear})<p>{school.description}</p>
						</li>
					))}
				</ul>

				<h2>Skills:</h2>
				<ul>
					{data.skills?.map((skill, index) => (
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
