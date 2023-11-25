import Layout from "@/components/Layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "CValley.io - Terms of Service",
    description: "Read and agree to the terms of service for CValley.io's free resume-building platform. Understand the conditions for using our services, including information on user responsibilities, platform access, and more.",
}

function page() {
    return (
        <>
            <Layout>
                {" "}
                <main className="flex justify-center py-20 md:py-30 px-10 bg-slate-400">
                    <div className="w-full max-w-screen-md">
                        <h2 className="text-3xl font-bold mb-3">Terms of Service</h2>
                        <p>Thank you for choosing CValley.io for your resume-building needs. By using our platform, you agree to the following terms:</p>
                        <ol className="mt-10 flex flex-col gap-6">
                            <li>
                                <strong>Free Services:</strong> CValley.io provides a free CV building service. We do not charge users for creating, downloading, or sharing their resumes.
                            </li>
                            <li>
                                <strong>User Responsibilities:</strong> You are responsible for the accuracy and legality of the information you input into CValley.io. We are not liable for any consequences resulting from inaccurate or inappropriate content.
                            </li>
                            <li>
                                <strong>Platform Access:</strong> We grant you access to our platform for personal use. Any unauthorized use, reproduction, or distribution of our platform is strictly prohibited.
                            </li>
                            <li>
                                <strong>No Guarantee:</strong> While CValley.io aims to provide a valuable service, we do not guarantee job placement or success in your job search. Your resume's effectiveness depends on various factors beyond our control.
                            </li>
                            <li>
                                <strong>Feedback:</strong> We welcome your feedback on our platform. By providing feedback, you grant CValley.io the right to use and incorporate it into our services without any obligation to you.
                            </li>
                            <li>
                                <strong>Termination:</strong> We reserve the right to terminate or suspend your access to CValley.io at our discretion, without notice, if you violate these terms.
                            </li>
                        </ol>
                        <p className="mt-10 font-bold">
                            By using CValley.io, you agree to abide by these terms and our privacy policy. If you have any questions or concerns, please contact us at{" "}
                            <a className="underline" href="mailto:junsantilla@live.com">
                                junsantilla@live.com
                            </a>
                            .
                        </p>
                    </div>
                </main>
            </Layout>
        </>
    )
}

export default page
