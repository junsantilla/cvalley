import React, { useEffect, useState } from "react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { BiSolidBriefcase, BiSolidUser } from "react-icons/bi"
import { FaGraduationCap, FaLaptopCode } from "react-icons/fa6"

interface SimpleProps {
    imagePreview: string
}

const Simple: React.FC<SimpleProps> = ({ imagePreview }) => {
    const [data, setData] = useState<any>(null)

    const updateData = () => {
        // Check if window and localStorage are available
        if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
            // Fetch data from local storage
            const storedData = localStorage.getItem("data")

            // Parse the JSON string to an object
            const parsedData = storedData ? JSON.parse(storedData) : null

            // Set the data in the state
            setData(parsedData)
        } else {
            console.error("localStorage is not available in this environment.")
        }
    }

    useEffect(() => {
        // Fetch initial data from local storage
        updateData()

        // Add event listener for the storage event
        if (typeof window !== "undefined") {
            window.addEventListener("storage", updateData)
        }

        // Cleanup the event listener on component unmount
        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("storage", updateData)
            }
        }
    }, [])

    useEffect(() => {
        const a4Container = document.getElementById("a4-container") as HTMLElement | null
        const a4Div = document.getElementById("element-to-capture") as HTMLElement | null

        if (a4Container && a4Div) {
            const containerHeight: number = parseFloat(getComputedStyle(a4Container).height)
            const divHeight: number = parseFloat(getComputedStyle(a4Div).height)

            if (divHeight - 20 > containerHeight) {
                console.log("Data before overflow:", data)
                alert("Warning: Your data may overflow. Our app can render 1 page only at the moment.")
            }
        }
    }, [data])

    const isObjectNotEmpty = (obj: any): boolean => {
        // Check if the object is defined and not null
        if (obj === undefined || obj === null) {
            return false
        }

        // Check if the object has any non-empty string values
        if (typeof obj === "object") {
            return Object.values(obj).some((field: any) => field && typeof field === "string" && field.trim() !== "")
        }

        return false
    }

    if (!data) {
        // Handle the case where data is not available yet
        return (
            <div className="p-8">
                <p className="font-bold text-lg">Welcome to our CV Builder!</p>
                <p>Please start by typing your information.</p>
            </div>
        )
    }

    return (
        <div className="w-full flex justify-center p-8 bg-slate-200 pt-10">
            {/* Template starts here */}
            <div className="template-simple a4-container text-slate-700 text-sm" id="a4-container">
                <div className="flex flex-col align-middle gap-6 a4 bg-white h-full p-10" id="element-to-capture">
                    {/* Details */}

                    <div className="flex">
                        {imagePreview && (
                            <Avatar className=" w-20 h-20 mb-1 shadow-md mr-6">
                                <AvatarImage src={imagePreview} alt="Profile Image" className="object-cover" />
                            </Avatar>
                        )}
                        <div className="flex flex-col">
                            <p className="font-extrabold text-2xl mb-2">{data.fullName}</p>
                            <p>{data.objective}</p>
                        </div>
                    </div>

                    {/* More details  */}
                    <div className="employment">
                        {data.jobTitle || data.phoneNumber || data.emailAddress || data.address ? (
                            <h2 className="font-bold text-md mb-2 bg-slate-200 p-2 px-4">
                                <BiSolidUser className="inline -mt-1 text-lg" /> Personal Details
                            </h2>
                        ) : null}
                        {data.jobTitle && (
                            <div className="grid grid-cols-4">
                                <p className="font-semibold">Job Title:</p>
                                <p className="col-span-3">{data.jobTitle}</p>
                            </div>
                        )}
                        {data.phoneNumber && (
                            <div className="grid grid-cols-4">
                                <p className="font-semibold">Phone Number:</p>
                                <p className="col-span-3">{data.phoneNumber}</p>
                            </div>
                        )}
                        {data.emailAddress && (
                            <div className="grid grid-cols-4">
                                <p className="font-semibold">Email Address:</p>
                                <p className="col-span-3">{data.emailAddress}</p>
                            </div>
                        )}
                        {data.address && (
                            <div className="grid grid-cols-4">
                                <p className="font-semibold">Address:</p>
                                <p className="col-span-3">{data.address}</p>
                            </div>
                        )}
                    </div>

                    {/* Employment */}
                    {data.employment && data.employment.some(isObjectNotEmpty) && (
                        <div className="employment">
                            <h2 className="font-bold text-md mb-2 bg-slate-200 p-2 px-4">
                                <BiSolidBriefcase className="inline -mt-1 text-lg" /> Employment History
                            </h2>
                            <ul className="flex flex-col gap-2">
                                {data.employment.map((job: any, index: number) => (
                                    <li key={index} className="">
                                        <div className="font-bold">
                                            <p className="text-lg">{job.jobTitle}</p>
                                            <p className="text-xs">
                                                {job.companyName}, {job.city}
                                            </p>
                                        </div>
                                        <p className="text-xs py-1 spa text-slate-600 uppercase font-bold">
                                            {job.startYear} - {job.endYear}
                                        </p>
                                        <p>{job.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Education  */}
                    {data.education && data.education.some(isObjectNotEmpty) && (
                        <div className="education">
                            <h2 className="font-bold text-md mb-2 bg-slate-200 p-2 px-4">
                                <FaGraduationCap className="inline -mt-1 text-lg" /> Education
                            </h2>
                            <ul className="flex flex-col gap-2">
                                {data.education.map((school: any, index: number) => (
                                    <li key={index}>
                                        <div className="font-bold">
                                            <p className="text-lg">{school.schoolName}</p>
                                            <p className="text-xs">
                                                {school.degree}, {school.fieldOfStudy}
                                            </p>
                                        </div>

                                        <p className="font-xs text-xs py-1 spa tracking-widest  text-slate-500 uppercase font-semibold">
                                            {school.startYear} - {school.endYear}
                                        </p>
                                        <p>{school.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Skills  */}
                    {data.skills && data.skills.some(isObjectNotEmpty) && (
                        <div className="skils">
                            <h2 className="font-bold text-md mb-2 bg-slate-200 p-2 px-4">
                                <FaLaptopCode className="inline -mt-1 text-lg" /> Skills
                            </h2>
                            <ul className="flex gap-2">
                                {data.skills.map((skill: any, index: number) => (
                                    <li key={index} className="inline font-semibold text-md">
                                        {skill.skillTitle}
                                        {index !== data.skills.length - 1 && ","}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Simple
