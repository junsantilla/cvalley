"use client"
import Footer from "@/components/Footer"
import { MainNav } from "@/components/MainNav"
import { UserNav } from "@/components/UserNav"
import React, { ReactNode } from "react"

interface LayoutProps {
    children: ReactNode
}

function Layout({ children }: LayoutProps) {
    return (
        <>
            <div className="flex-col md:flex">
                <div className="text-slate-200 bg-slate-950">
                    <div className="flex h-16 items-center px-4 mx-4">
                        <MainNav />
                        <div className="ml-auto flex items-center space-x-4">
                            <UserNav />
                        </div>
                    </div>
                </div>
            </div>

            {children}

            <Footer />
        </>
    )
}

export default Layout
