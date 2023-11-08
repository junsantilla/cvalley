"use client";
import Link from "next/link";
import { UserAuthForm } from "@/components/UserAuthFormProps";
import { UserAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Login() {
	const { user } = UserAuth();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (user) {
			setIsLoading(false);
			const redirectTo = localStorage.getItem("redirectTo");
			if (redirectTo) {
				localStorage.removeItem("redirectTo"); // Clear the value
				redirect(redirectTo);
			} else {
				redirect("/dashboard"); // Redirect to the dashboard by default
			}
		} else {
			setIsLoading(false);
		}
	}, [user]);

	// Render loading state while isLoading is true
	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div className="md:hidden"></div>
			<div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
					<div className="absolute inset-0 bg-zinc-900" />
					<div className="relative z-20 flex items-center text-lg font-extrabold">
						CValley.io
					</div>
					<div className="relative z-20 mt-auto">
						<blockquote className="space-y-2">
							<p className="text-lg">
								Dive into the world of resume perfection with
								CValley.io. Our platform offers features
								designed to simplify the resume creation
								process. Explore a diverse range of easy-to-use
								templates, and access expert tips and insights
								that will elevate your resume to a professional
								masterpiece.
							</p>
						</blockquote>
					</div>
				</div>
				<div className="lg:p-8">
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
						<div className="flex flex-col space-y-2 text-center">
							<h1 className="text-2xl font-semibold tracking-tight">
								Create an account
							</h1>
							<p className="text-sm text-muted-foreground">
								Enter your email below to create your account
							</p>
						</div>
						<UserAuthForm />
						<p className="px-8 text-center text-sm text-muted-foreground">
							By signing in, you agree to our
							<br />
							<Link
								href="/terms"
								className="underline underline-offset-4 hover:text-primary"
							>
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link
								href="/privacy"
								className="underline underline-offset-4 hover:text-primary"
							>
								Privacy Policy
							</Link>
							.
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
