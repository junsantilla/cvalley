import React, { useEffect, useState } from "react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { BiSolidEnvelope, BiSolidMap, BiSolidPhone } from "react-icons/bi"

interface WebProps {
    imagePreview: string
}

const Web: React.FC<WebProps> = ({ imagePreview }) => {
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
                <p className="text-lg font-bold">Welcome to our CV Builder!</p>
                <p>Please start by typing your information.</p>
            </div>
        )
    }

    return (
        <div className="flex justify-center w-full p-8 pt-10 bg-slate-200">
            {/* Template starts here */}
            <div className="text-sm template-simple a4-container text-slate-800" id="a4-container">
                <div className="flex flex-col h-full align-middle bg-white a4" id="element-to-capture">
                    {/* Details */}
                    <div className="flex bg-orange-800 text-slate-200 p-10">
                        {imagePreview && (
                            <Avatar className="w-24 h-24 mr-6 shadow-md">
                                <AvatarImage src={imagePreview} alt="Profile Image" className="object-cover rounded-none" />
                            </Avatar>
                        )}
                        <div className="flex flex-col -mt-1">
                            <p className="text-2xl font-extrabold">{data.fullName}</p>
                            <p className="mb-2 font-bold italic">{data.jobTitle}</p>
                            <p>{data.objective}</p>
                        </div>
                    </div>
                    <div className="flex gap-6 font-semibold border-b px-10 py-4 text-xs bg-slate-100">
                        {data.phoneNumber && (
                            <div className="flex">
                                <BiSolidPhone className="inline text-sm" />
                                <p className="col-span-3">{data.phoneNumber}</p>
                            </div>
                        )}
                        {data.emailAddress && (
                            <div className="flex">
                                <BiSolidEnvelope className="inline text-sm mr-1" />
                                <p className="col-span-3">{data.emailAddress}</p>
                            </div>
                        )}
                        {data.address && (
                            <div className="flex">
                                <BiSolidMap className="inline text-sm" />
                                <p className="col-span-3">{data.address}</p>
                            </div>
                        )}
                    </div>

                    <div className="p-10 flex flex-col gap-10">
                        {/* Employment */}
                        {data.employment && data.employment.some(isObjectNotEmpty) && (
                            <div className="employment">
                                <h2 className="mb-2 font-extrabold text-lg">Employment History</h2>
                                <ul className="flex flex-col gap-4">
                                    {data.employment.map((job: any, index: number) => (
                                        <li key={index} className="">
                                            <div className="flex justify-between mb-1 font-bold">
                                                <div>
                                                    <p className="text-md">{job.jobTitle}</p>
                                                    <p className="text-xs">
                                                        {job.companyName}, {job.city}
                                                    </p>
                                                </div>
                                                <p className="py-1 text-xs font-bold uppercase text-slate-600">
                                                    {job.startYear} - {job.endYear}
                                                </p>
                                            </div>

                                            <p>{job.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {/* Education  */}
                        {data.education && data.education.some(isObjectNotEmpty) && (
                            <div className="education">
                                <h2 className="mb-2 font-extrabold text-lg">Education</h2>
                                <ul className="flex flex-col gap-4">
                                    {data.education.map((school: any, index: number) => (
                                        <li key={index}>
                                            <div className="flex justify-between mb-1 font-bold">
                                                <div>
                                                    <p className="text-md">{school.schoolName}</p>
                                                    <p className="text-xs">
                                                        {school.degree}, {school.fieldOfStudy}
                                                    </p>
                                                </div>
                                                <p className="py-1 text-xs font-bold uppercase text-slate-600">
                                                    {school.startYear} - {school.endYear}
                                                </p>
                                            </div>

                                            <p>{school.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {/* Skills  */}
                        {data.skills && data.skills.some(isObjectNotEmpty) && (
                            <div className="skils">
                                <h2 className="mb-2 font-extrabold text-lg">Skills</h2>

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
        </div>
    )
}

export default Web
