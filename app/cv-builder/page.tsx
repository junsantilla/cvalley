"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { MainNav } from "@/components/MainNav";
import { UserNav } from "@/components/UserNav";

import DotLoader from "react-spinners/DotLoader";
import { Button } from "@/components/ui/button";
import { BiFileFind, BiFoodMenu } from "react-icons/bi";
import Builder from "@/components/Builder";

function page() {
	const { user } = UserAuth();
	const [isLoading, setIsLoading] = useState(false);

	localStorage.setItem("redirectTo", window.location.pathname);

	useEffect(() => {
		if (user === null) {
			redirect("/login");
		} else {
			setIsLoading(false);
			setTimeout(() => {
				setIsLoading(false);
			}, 2000);
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
		<div>
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

			<Builder />

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
		</div>
	);
}

export default page;
