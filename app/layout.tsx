"use client";
import "./globals.css";
import { AuthContextProvider } from "../context/AuthContext";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<AuthContextProvider>
				<body>{children}</body>
			</AuthContextProvider>
		</html>
	);
}
