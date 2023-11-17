import Link from "next/link"

export function MainNav() {
    return (
        <nav className="flex items-center space-x-4 lg:space-x-6">
            <div
                // href="/dashboard"
                className="text-lg font-extrabold transition-colors hover:text-primary"
            >
                CValley
            </div>
            {/* <Link
				href="/dashboard"
				className="text-sm font-medium transition-colors hover:text-primary"
			>
				Dashboard
			</Link> */}
            <Link href="/cv-builder" className="text-sm font-medium transition-colors hover:text-primary">
                CV Builder
            </Link>
        </nav>
    )
}
