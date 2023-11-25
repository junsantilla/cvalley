"use client"
import "./globals.css"
import { AuthContextProvider } from "../context/AuthContext"
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const isLocalhost = process.env.NODE_ENV === "development"

    return (
        <html lang="en">
            <AuthContextProvider>
                <body>
                    {children}

                    {/* Render Analytics only if not in localhost */}
                    {!isLocalhost && <Analytics />}
                </body>
            </AuthContextProvider>
        </html>
    )
}
