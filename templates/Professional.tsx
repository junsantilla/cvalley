import React, { useEffect, useState } from "react"

const Professional: React.FC = () => {
    const [data, setData] = useState<any>(null)

    const updateData = () => {
        // Check if localStorage is available
        if (typeof localStorage !== "undefined") {
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
        window.addEventListener("storage", updateData)

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("storage", updateData)
        }
    }, []) // The empty dependency array ensures this effect runs only once on component mount

    if (!data) {
        // Handle the case where data is not available yet
        return <div>Loading...</div>
    }

    return (
        <div className="w-full flex justify-center p-8 bg-slate-100">
            {/* Template */}
            <div className="flex a4 border bg-slate-200  h-full text-sm" id="element-to-capture">
                <div className="sidebar font-medium bg-slate-900 text-slate-200 p-10">
                    <div className="grid gap-2 mb-8">
                        <p className="font-extrabold text-xl">{data.fullName}</p>
                        <p className="font-bold">Web Developer</p>
                        <p className="flex items-center">
                            {/* <BiSolidPhone className="inline h-4 mr-2" /> */}
                            {data.phoneNumber}
                        </p>
                        <p className="flex items-center">
                            {/* <BiSolidEnvelope className="inline h-4 mr-3 mt-1" /> */}
                            {data.emailAddress}
                        </p>
                        <p className="flex items-start">
                            {/* <BiSolidMap className="inline w-6 mt-1 mr-2 " /> */}
                            {data.address}
                        </p>
                    </div>

                    <h2 className="font-bold text-lg mb-3 ">Skills:</h2>
                    <ul className="grid gap-2">
                        {data.skills?.map((skill: any, index: number) => (
                            <li key={index}>{skill.skillTitle}</li>
                        ))}
                    </ul>
                </div>
                <div className="grow bg-white p-10">
                    <div className="profile">
                        <h2 className="font-extrabold text-lg mb-3">
                            <span>█ </span>Profile:
                        </h2>
                        <p>{data.objective}</p>
                        <br />
                    </div>

                    <div className="employment">
                        <h2 className="font-extrabold text-lg mb-3">
                            <span>█ </span>Employment History:
                        </h2>
                        <ul>
                            {data.employment?.map((job: any, index: number) => (
                                <>
                                    <li key={index}>
                                        <p className="font-bold">
                                            {job.jobTitle}, {job.companyName}, {job.city}
                                        </p>

                                        <p className="font-xs text-xs py-1 spa tracking-widest  text-slate-500 uppercase font-bold">
                                            {job.startYear} - {job.endYear}
                                        </p>
                                        <p>{job.description}</p>
                                    </li>
                                    <br />
                                </>
                            ))}
                        </ul>
                    </div>

                    <div className="education">
                        <h2 className="font-extrabold text-lg mb-3">
                            <span>█ </span>Education:
                        </h2>
                        <ul>
                            {data.education?.map((school: any, index: number) => (
                                <li key={index}>
                                    <>
                                        <li key={index}>
                                            <p className="font-bold">
                                                {school.schoolName}, {school.degree}, {school.fieldOfStudy}
                                            </p>

                                            <p className="font-xs text-xs py-1 spa tracking-widest  text-slate-500 uppercase font-semibold">
                                                {school.startYear} - {school.endYear}
                                            </p>
                                            <p>{school.description}</p>
                                        </li>
                                        <br />
                                    </>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <br />
                </div>
            </div>
        </div>
    )
}

export default Professional
3
