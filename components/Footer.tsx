import Link from "next/link"
import React from "react"

function Footer() {
    return (
        <footer className="flex flex-col md:flex-row gap-4 justify-between bg-slate-900 text-white py-12 px-10">
            <p className="text-center md:text-left">
                <strong>Disclaimer:</strong>{" "}
                <Link href="/" className="underline">
                    CValley.io
                </Link>{" "}
                is a free resume-building platform. We do not guarantee job placement or success in your job search.
            </p>
            <div className="links flex gap-6 justify-center">
                <Link href="/terms-of-service" className="underline">
                    Terms of Service
                </Link>
                <Link href="/privacy-policy" className="underline">
                    Privacy Policy
                </Link>
            </div>
        </footer>
    )
}

export default Footer
