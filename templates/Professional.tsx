import React, { useEffect, useState } from "react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface ProfessionalProps {
    imagePreview: string
}

const Professional: React.FC<ProfessionalProps> = ({ imagePreview }) => {
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
        // Fetch initial data from local storage
        updateData()

        // Add event listener for the storage event
        window.addEventListener("storage", updateData)

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("storage", updateData)
        }
    }, []) // The empty dependency array ensures this effect runs only once on component mount

    const isObjectNotEmpty = (obj: any): boolean => Object.values(obj).some((field: any) => field && typeof field === "string" && field.trim() !== "")

    if (!data) {
        // Handle the case where data is not available yet
        return <div>Loading...</div>
    }

    return (
        <div className="w-full flex justify-center p-8 bg-slate-100">
            {/* Template */}
            <div className="flex a4 bg-slate-200  h-full text-sm" id="element-to-capture">
                {/* Sidebar  */}
                <div className="sidebar font-medium bg-slate-900 text-slate-200 p-10">
                    <div className="flex flex-col justify-center gap-2 mb-8">
                        {imagePreview && (
                            <Avatar className=" w-32 h-32 mb-1 shadow-md">
                                <AvatarImage src={imagePreview} alt="Profile Image" className="object-cover" />
                            </Avatar>
                        )}
                        <p className="font-extrabold text-xl">{data.fullName}</p>
                        <p className="font-bold">{data.jobTitle}</p>
                        <p>{data.phoneNumber}</p>
                        <p>{data.emailAddress}</p>
                        <p>{data.address}</p>
                    </div>

                    {/* Skills  */}
                    {data.skills && data.skills.some(isObjectNotEmpty) && (
                        <>
                            <h2 className="font-bold text-lg mb-3 ">Skills:</h2>
                            <ul className="grid gap-2">
                                {data.skills.map((skill: any, index: number) => (
                                    <li key={index}>{skill.skillTitle}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>

                {/* Main content  */}
                <div className="grow bg-white text-slate-900 p-10 overflow-hidden">
                    {/* Profile */}
                    {isObjectNotEmpty(data.objective) && (
                        <div className="profile mb-8">
                            <h2 className="font-extrabold text-lg mb-3">
                                <span>█ </span>Profile:
                            </h2>
                            <p>{data.objective}</p>
                        </div>
                    )}

                    {/* Employment */}
                    {data.employment && data.employment.some(isObjectNotEmpty) && (
                        <div className="employment mb-8">
                            <h2 className="font-extrabold text-lg mb-4">
                                <span>█ </span>Employment History:
                            </h2>
                            <ul>
                                {data.employment.map((job: any, index: number) => (
                                    <li key={index} className="mb-4">
                                        <p className="font-bold">
                                            <p className="text-lg">{job.jobTitle}</p>
                                            <p className="text-xs">
                                                {job.companyName}, {job.city}
                                            </p>
                                        </p>
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
                        <div className="education mb-8">
                            <h2 className="font-extrabold text-lg mb-4">
                                <span>█ </span>Education:
                            </h2>
                            <ul>
                                {data.education.map((school: any, index: number) => (
                                    <li key={index}>
                                        <div className="mb-4">
                                            <li key={index}>
                                                <p className="font-bold">
                                                    <p className="text-lg">{school.schoolName}</p>
                                                    <p className="text-xs">
                                                        {school.degree}, {school.fieldOfStudy}
                                                    </p>
                                                </p>

                                                <p className="font-xs text-xs py-1 spa tracking-widest  text-slate-500 uppercase font-semibold">
                                                    {school.startYear} - {school.endYear}
                                                </p>
                                                <p>{school.description}</p>
                                            </li>
                                        </div>
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

export default Professional
