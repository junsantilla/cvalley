"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { MainNav } from "@/components/MainNav";
import { UserNav } from "@/components/UserNav";

import DotLoader from "react-spinners/DotLoader";

function page() {
	const { user } = UserAuth();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (user === null) {
			redirect("/login");
		} else {
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
		<div className="hidden flex-col md:flex">
			<div className="border-b bg-slate-50">
				<div className="flex h-16 items-center px-4 mx-4">
					<MainNav />
					<div className="ml-auto flex items-center space-x-4">
						<UserNav />
					</div>
				</div>
			</div>
			<div className="flex-1 space-y-4 p-8 pt-6">
				<div className="flex items-center justify-between space-y-2">
					<h2 className="text-3xl font-bold tracking-tight">
						Dashboard
					</h2>
					<div className="flex items-center space-x-2"></div>
				</div>
			</div>
		</div>
	);
}

export default page;
