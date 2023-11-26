import Layout from "@/components/Layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "CValley.io - Privacy Policy",
    description: "Learn about CValley.io's privacy policy. Understand how we handle personal information on our CV Builder platform, ensuring the security and privacy of our users' data.",
}

function page() {
    return (
        <>
            <Layout>
                <main className="flex justify-center py-20 md:py-30 px-10 bg-slate-400">
                    <div className="w-full max-w-screen-md">
                        <h2 className="text-3xl font-bold mb-3">Privacy Policy</h2>
                        <p>Welcome to CValley.io Beta! At CValley.io, we prioritize the privacy and security of our users. By using our CV Builder platform, you agree to the following privacy policy:</p>
                        <ol className="mt-10 flex flex-col gap-6">
                            <li>
                                <strong>Personal Information:</strong> When you sign up for CValley.io, we collect basic personal information to enhance your user experience. This includes your name, email address, and any additional details you choose to provide.
                            </li>
                            <li>
                                <strong>Usage Data:</strong> We may collect non-personal information about your interactions with our platform, such as the pages you visit and the features you use. This helps us improve our services and tailor them to your needs.
                            </li>
                            <li>
                                <strong>Data Security:</strong> Rest assured that your data is safe with us. We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction.
                            </li>
                            <li>
                                <strong>Cookies:</strong> CValley.io uses cookies to enhance your browsing experience. These cookies are used to remember your preferences and optimize the performance of our platform.
                            </li>
                            <li>
                                <strong>Third-Party Services:</strong> Our platform may integrate with third-party services for analytics or other functionalities. Please review the privacy policies of these third parties for information on how they handle your data.
                            </li>
                            <li>
                                <strong>Communication:</strong> By signing up, you agree to receive occasional emails from CValley.io, including updates, tips, and relevant information. You can opt-out of these communications at any time.
                            </li>
                            <li>
                                <strong>Policy Updates:</strong> CValley.io may update this privacy policy to reflect changes in our practices. Please review this policy periodically to stay informed about how we handle your data.
                            </li>
                        </ol>
                        <p className="mt-10 font-bold">
                            For any questions or concerns regarding your privacy on CValley.io, please contact us at{" "}
                            <a className="underline" href="mailto:support@cvalley.io">
                                support@cvalley.io
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
