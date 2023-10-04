"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { MainNav } from "@/components/MainNav";
import { UserNav } from "@/components/UserNav";

import DotLoader from "react-spinners/DotLoader";
import { Button } from "@/components/ui/button";
import { BiFileFind, BiRightArrow } from "react-icons/bi";
import ChooseTemplate from "@/components/ChooseTemplate";

function page() {
	const { user } = UserAuth();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (user === null) {
			redirect("/login");
		} else {
			setIsLoading(false);
			// setTimeout(() => {
			// 	setIsLoading(false);
			// }, 2000);
		}
	}, [user]);

	// Render loading state while isLoading is true
	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen ">
				<DotLoader
					size={100}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			</div>
		);
	}

	return (
		<>
			<div className="hidden flex-col md:flex">
				<div className="border-b bg-slate-50">
					<div className="flex h-16 items-center px-4 mx-4">
						<MainNav />
						<div className="ml-auto flex items-center space-x-4">
							<UserNav />
						</div>
					</div>
				</div>
			</div>
			<section className="w-full bg-slate-100 text-center py-24 ">
				<p className="text-5xl mb-6">
					Welcome to <span className="font-bold">CValley.io</span>
				</p>
				<div className="text-xl font-normal">
					<p>Get started with creating your free resume today.</p>
					<p>
						Click the "Start" button or choose a template below to
						begin.
					</p>
				</div>
				<div className="flex gap-3 mt-6 justify-center">
					<Button type="button">
						<BiRightArrow className="mr-1 text-lg" /> Start
					</Button>
					<Button variant="outline" type="button">
						<BiFileFind className="mr-1 text-lg" /> Choose Template
					</Button>
				</div>
			</section>
			<ChooseTemplate />
			<div className="hidden flex-col md:flex">
				<div className="border-t bg-slate-50">
					<div className="flex h-16 items-center px-4 mx-4">
						<p>
							Copyright 2023 -{" "}
							<span className="font-extrabold">CValley.io</span>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default page;
