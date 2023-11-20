"use client"

import Footer from "@/components/Footer"
import { MainNav } from "@/components/MainNav"
import { UserNav } from "@/components/UserNav"
import React from "react"

function page() {
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

            <main className="flex justify-center py-20 md:py-30 px-10 bg-slate-400">
                <div className="w-full max-w-screen-md">
                    <h2 className="text-3xl font-bold mb-3">Terms of Service</h2>
                    <p>Thank you for choosing CValley for your resume-building needs. By using our platform, you agree to the following terms:</p>
                    <ol className="mt-10 flex flex-col gap-6">
                        <li>
                            <strong>Free Services:</strong> CValley provides a free CV building service. We do not charge users for creating, downloading, or sharing their resumes.
                        </li>
                        <li>
                            <strong>User Responsibilities:</strong> You are responsible for the accuracy and legality of the information you input into CValley. We are not liable for any consequences resulting from inaccurate or inappropriate content.
                        </li>
                        <li>
                            <strong>Platform Access:</strong> We grant you access to our platform for personal use. Any unauthorized use, reproduction, or distribution of our platform is strictly prohibited.
                        </li>
                        <li>
                            <strong>No Guarantee:</strong> While CValley aims to provide a valuable service, we do not guarantee job placement or success in your job search. Your resume's effectiveness depends on various factors beyond our control.
                        </li>
                        <li>
                            <strong>Feedback:</strong> We welcome your feedback on our platform. By providing feedback, you grant CValley the right to use and incorporate it into our services without any obligation to you.
                        </li>
                        <li>
                            <strong>Termination:</strong> We reserve the right to terminate or suspend your access to CValley at our discretion, without notice, if you violate these terms.
                        </li>
                    </ol>
                    <p className="mt-10 font-bold">
                        By using CValley, you agree to abide by these terms and our privacy policy. If you have any questions or concerns, please contact us at{" "}
                        <a className="underline" href="mailto:cvalley@limesware.com">
                            cvalley@limesware.com
                        </a>
                        .
                    </p>
                </div>
            </main>

            <Footer />
        </>
    )
}

export default page
