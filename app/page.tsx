import Layout from "@/components/Layout"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BiRightArrow } from "react-icons/bi"

export const metadata: Metadata = {
    title: "CValley - Build Your Resume for Free",
    description: "Welcome to CValley - the free and easy-to-use platform for building professional resumes. Create, download, and share your resume with our user-friendly interface. Your path to professional success starts here!",
}

const features = [
    {
        title: "Create Your Resume for Free",
        description: "Say goodbye to expensive resume services. With CValley.io, you can craft a visually appealing and effective resume without spending a dime.",
    },
    {
        title: "User-Friendly Interface",
        description: "Our intuitive, user-friendly interface ensures that you can build your resume with ease, even if you have no prior experience in resume writing.",
    },
    {
        title: "Download and Share",
        description: "Once your resume is ready, download it in various formats (PDF, Word, or plain text), and share it with potential employers",
    },
    {
        title: "Privacy and Security",
        description: "We take your privacy seriously. Your data is safe and secure on CValley.",
    },
]

const whyChoose = [
    {
        title: "Free and Easy",
        description: "Building a resume doesn't have to be complicated or costly. CValley.io simplifies the process and keeps it free.",
    },
    {
        title: "Professional Quality",
        description: "Our templates help you create a resume that stands out in the competitive job market.",
    },
    {
        title: "Accessibility",
        description: "CValley.io is accessible to users from all backgrounds, ensuring equal opportunities for all.",
    },
    {
        title: "Constant Updates",
        description: "We stay up-to-date with industry trends, so your resume is always relevant.",
    },
]

function page() {
    return (
        <Layout>
            <main>
                <section className="hero text-slate-200 w-full text-center py-20 md:py-60 ">
                    <p className="text-3xl md:text-5xl mb-6">
                        👋 Welcome to <span className="font-bold">CValley.io</span>
                    </p>
                    <div className="text-xl md:text-2xl flex flex-col">
                        <p className="max-w-screen-2xl self-center px-10 md:px-28">
                            Our platform is designed to make the resume-building process easy, efficient, and free. Whether you're a recent graduate entering the job market or an experienced professional looking to update your CV, CValley.io has got you covered.
                        </p>
                    </div>
                    <div className="flex gap-3 justify-center">
                        <Link href="/login">
                            <Button variant="outline" type="button" className="mt-8 uppercase text-slate-900">
                                <BiRightArrow className="mr-1 text-lg " /> Sign Up Now For Free
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Features */}
                <section className="w-full py-24 bg-slate-900">
                    <div className="flex justify-center">
                        <div className="px-10 md:px-20">
                            <h2 className="text-2xl md:text-4xl text-center text-white mb-8">
                                🚀 Key <span className="font-bold">Features</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {features.map((feature, index) => (
                                    <div key={index} className="p-6 bg-slate-950 text-slate-300">
                                        <h3 className="font-bold">{feature.title}</h3>
                                        <p>{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/*Why Choose CValley.io */}
                <section className="w-full py-24 bg-slate-200">
                    <div className="flex justify-center">
                        <div className="px-10 md:px-20 max-w-screen-lg">
                            <h2 className="text-2xl md:text-4xl text-center mb-8">
                                🤝 Why <span className="font-bold">Choose CValley.io</span>
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {whyChoose.map((item, index) => (
                                    <div key={index} className="p-6 bg-slate-900 text-slate-300">
                                        <h3 className="font-bold">{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Get Started Today! */}
                <section className="sign w-full py-24 bg-slate-900 text-white">
                    <div className="flex justify-center">
                        <div className="max-w-screen-lg text-center px-10">
                            <h2 className="font-bold text-2xl md:text-4xl mb-8">🎉 Get Started Today!</h2>
                            <p className="text-lg mb-8">
                                Ready to take the first step toward a promising career? Create your free account on CValley.io now and start building the resume that will open doors to your future. Join thousands of satisfied users who have already benefited from our platform.
                            </p>
                            <p className="text-lg">
                                <span className="font-bold">CValley.io - Your Path to Professional Success.</span>{" "}
                            </p>
                            <Link href="/login">
                                <Button variant="outline" type="button" className="mt-8 uppercase text-slate-900">
                                    <BiRightArrow className="mr-1 text-lg" /> Sign Up Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    )
}

export default page
