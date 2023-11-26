import React from "react"
import { Button } from "./ui/button"
import { BiDetail } from "react-icons/bi"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

interface AddDummyDataButtonProps {
    onDataAdd: (newData: any) => void
}

const AddDummyDataButton: React.FC<AddDummyDataButtonProps> = ({ onDataAdd }) => {
    const handleAddDummyData = () => {
        // Delete all existing data from local storage
        localStorage.clear()

        // Dummy data
        const dummyData = {
            fullName: "John Doe",
            jobTitle: "Software Developer",
            phoneNumber: "123-456-7890",
            emailAddress: "john.doe@example.com",
            address: "123 Main Street, City, Country",
            objective: "A highly motivated software developer with a passion for creating innovative solutions...",
            employment: [
                {
                    companyName: "ABC Inc.",
                    jobTitle: "Software Engineer",
                    city: "City",
                    startYear: 2018,
                    endYear: 2022,
                    description: "Worked on various projects, collaborated with cross-functional teams to deliver high-quality software solutions. Developed and maintained scalable web applications using technologies such as JavaScript, React, and Node.js.",
                },
                {
                    companyName: "XYZ Tech",
                    jobTitle: "Senior Software Developer",
                    city: "City2",
                    startYear: 2022,
                    endYear: 2023,
                    description: "Led a team of developers in the design and implementation of cutting-edge software solutions. Contributed to the architectural decisions and mentored junior team members. Implemented best practices to enhance code quality and maintainability.",
                },
                {
                    companyName: "Tech Innovators",
                    jobTitle: "Lead Full Stack Developer",
                    city: "City3",
                    startYear: 2023,
                    endYear: 2025,
                    description: "Responsible for the end-to-end development of innovative software products. Collaborated with product managers to define project requirements and timelines.",
                },
            ],
            education: [
                {
                    schoolName: "University XYZ",
                    degree: "Bachelor of Science",
                    fieldOfStudy: "Computer Science",
                    startYear: 2014,
                    endYear: 2018,
                    city: "City",
                    description:
                        "Studied computer science and gained a solid foundation in algorithms, data structures, and software development methodologies. Completed a capstone project focused on developing a real-world application, showcasing problem-solving skills and creativity.",
                },
                {
                    schoolName: "Tech Master Institute",
                    degree: "Master of Computer Science",
                    fieldOfStudy: "Advanced Software Engineering",
                    startYear: 2018,
                    endYear: 2020,
                    city: "City4",
                    description: "Pursued advanced studies in software engineering, focusing on emerging technologies and industry best practices. Conducted research on optimizing software development processes and presented findings at conferences.",
                },
            ],
            skills: [{ skillTitle: "JavaScript" }, { skillTitle: "React" }, { skillTitle: "Node.js" }, { skillTitle: "Python" }, { skillTitle: "Java" }, { skillTitle: "SQL" }, { skillTitle: "Git" }, { skillTitle: "Docker" }],
        }

        // Add the dummy data to local storage
        localStorage.setItem("data", JSON.stringify(dummyData))

        // Notify the parent component about the data change
        onDataAdd(dummyData)
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button type="button">
                        <BiDetail className="mr-1" />
                        Add Sample Data
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone. This will override all existing data.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleAddDummyData}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default AddDummyDataButton
