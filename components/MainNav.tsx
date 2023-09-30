import Link from "next/link";

export function MainNav() {
	return (
		<nav className="flex items-center space-x-4 lg:space-x-6">
			<Link
				href="/dashboard"
				className="text-lg font-extrabold transition-colors hover:text-primary"
			>
				CValley.io
			</Link>
			<Link
				href="/dashboard"
				className="text-sm font-medium transition-colors hover:text-primary"
			>
				Dashboard
			</Link>
		</nav>
	);
}
