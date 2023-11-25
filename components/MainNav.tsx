import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function MainNav() {
    return (
        <nav className="flex items-center space-x-4 lg:space-x-6">
            <div
                // href="/dashboard"
                className="text-lg font-extrabold transition-colors hover:text-primary"
            >
                <Link href="/">CValley.io</Link> <Badge className="text-slate-950 hover:text-slate-950 bg-white hover:bg-white ml-1 cursor-default">Beta</Badge>
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
