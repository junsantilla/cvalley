import React, { useState } from "react";
import { Button } from "./ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import {
	BiAward,
	BiBriefcaseAlt2,
	BiBrush,
	BiFileFind,
	BiFoodMenu,
	BiRightArrow,
	BiStar,
} from "react-icons/bi";
import { Badge } from "./ui/badge";

function ChooseTemplate() {
	// Sample card data
	const cardData = [
		{
			title: "Entry-Level",
			description:
				"A simple template suitable for entry-level job seekers.",
			imageURL:
				"https://gdoc.io/uploads/University-Student-Resume-Template-web1.jpg",
			category: "Simple",
		},
		{
			title: "Professional",
			description: "A polished and modern template for professionals.",
			imageURL:
				"https://gdoc.io/uploads/University-Student-Resume-Template-web1.jpg",
			category: "Professional",
		},
		{
			title: "Creative",
			description:
				"An eye-catching and creative template to showcase your skills.",
			imageURL:
				"https://gdoc.io/uploads/University-Student-Resume-Template-web1.jpg",
			category: "Modern",
		},
		{
			title: "Student",
			description:
				"A concise template designed for students and recent graduates.",
			imageURL:
				"https://gdoc.io/uploads/University-Student-Resume-Template-web1.jpg",
			category: "Simple",
		},
		{
			title: "Executive",
			description:
				"A sophisticated template tailored for executives and senior professionals.",
			imageURL:
				"https://gdoc.io/uploads/University-Student-Resume-Template-web1.jpg",
			category: "Professional",
		},
		{
			title: "Creative Director",
			description:
				"An artistic and unique template for creative directors.",
			imageURL:
				"https://gdoc.io/uploads/University-Student-Resume-Template-web1.jpg",
			category: "Modern",
		},
		{
			title: "Internship",
			description:
				"A concise template designed for internship applications.",
			imageURL:
				"https://gdoc.io/uploads/University-Student-Resume-Template-web1.jpg",
			category: "Simple",
		},
		{
			title: "Managerial",
			description: "A comprehensive template for managerial positions.",
			imageURL:
				"https://gdoc.io/uploads/University-Student-Resume-Template-web1.jpg",
			category: "Professional",
		},
		{
			title: "Designer",
			description:
				"A visually appealing template for designers and creatives.",
			imageURL:
				"https://gdoc.io/uploads/University-Student-Resume-Template-web1.jpg",
			category: "Modern",
		},
		{
			title: "Executive Assistant",
			description:
				"A professional template tailored for executive assistant roles.",
			imageURL:
				"https://gdoc.io/uploads/University-Student-Resume-Template-web1.jpg",
			category: "Professional",
		},
	];

	// State to keep track of the selected category
	const [selectedCategory, setSelectedCategory] = useState("All");

	// Function to filter cards based on the selected category
	const filteredCards =
		selectedCategory === "All"
			? cardData
			: cardData.filter((card) => card.category === selectedCategory);

	return (
		<section className="py-24 flex flex-col">
			<div className="flex justify-center mb-6">
				<div className="w-full max-w-screen-xl flex justify-between">
					<h2 className="font-bold text-2xl">
						<BiFileFind className="mr-1 text-2xl inline mb-2" />
						Choose Template
					</h2>
					<div className="flex gap-1">
						<Button
							variant={
								selectedCategory !== "All"
									? "outline"
									: undefined
							}
							onClick={() => setSelectedCategory("All")}
						>
							<BiFoodMenu className="mr-1" />
							All Templates
						</Button>
						<Button
							variant={
								selectedCategory !== "Simple"
									? "outline"
									: undefined
							}
							onClick={() => setSelectedCategory("Simple")}
						>
							<BiAward className="mr-1" />
							Simple
						</Button>
						<Button
							variant={
								selectedCategory !== "Professional"
									? "outline"
									: undefined
							}
							onClick={() => setSelectedCategory("Professional")}
						>
							<BiBriefcaseAlt2 className="mr-1" />
							Professional
						</Button>
						<Button
							variant={
								selectedCategory !== "Modern"
									? "outline"
									: undefined
							}
							onClick={() => setSelectedCategory("Modern")}
						>
							<BiBrush className="mr-1" /> Modern
						</Button>
					</div>
				</div>
			</div>
			<div className="flex justify-center mb-6">
				<div className="w-full max-w-screen-xl">
					<div className="grid grid-cols-3 gap-4">
						{filteredCards.map((card, index) => (
							<Card key={index} className="p-2 bg-slate-100">
								<div className="flex flex-col h-full">
									<CardHeader>
										<img
											src={card.imageURL}
											alt="CV Image"
											className="mb-3"
										/>
										<CardTitle className="text-lg flex justify-between">
											{card.title}
											<Badge className="mx-2 text-xs">
												{card.category}
											</Badge>
										</CardTitle>
										<CardDescription>
											{card.description}
										</CardDescription>
									</CardHeader>
									<div className="flex-grow"></div>
									<CardFooter>
										<Button className="w-full">
											<BiRightArrow className="mr-1 text-md" />{" "}
											Select
										</Button>
									</CardFooter>
								</div>
							</Card>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default ChooseTemplate;
