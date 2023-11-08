import React, { useRef, useState } from "react";
import Link from "next/link";
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
			id: "entry-level",
			title: "Entry-Level",
			description:
				"A simple template suitable for entry-level job seekers.",
			imageURL:
				"https://gdoc.io/uploads/University-Student-Resume-Template-web1.jpg",
			category: "Simple",
		},
		{
			id: "professional",
			title: "Professional",
			description: "A polished and modern template for professionals.",
			imageURL:
				"https://gdoc.io/uploads/University-Student-Resume-Template-web1.jpg",
			category: "Professional",
		},
		{
			id: "creative",
			title: "Creative",
			description:
				"An eye-catching and creative template to showcase your skills.",
			imageURL:
				"https://gdoc.io/uploads/University-Student-Resume-Template-web1.jpg",
			category: "Modern",
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
										<Link
											href={`/cv-builder?templateId=${card.id}`}
											className="w-full"
										>
											<Button className="w-full">
												<BiRightArrow className="mr-1 text-md" />{" "}
												Select
											</Button>
										</Link>
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
