import React, { useState } from "react"
import { BiSolidFilePdf, BiEdit, BiFileFind, BiMinus, BiPlus, BiUser } from "react-icons/bi"
import { Button } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useFieldArray, useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { useRouter } from "next/navigation"
import ChooseTemplate from "./ChooseTemplate"
import { useSearchParams } from "next/navigation"
import Professional from "@/templates/Professional"
import useLocalStorage from "use-local-storage"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

// Form schema
const formSchema = z.object({
    fullName: z.string().max(100).optional(),
    phoneNumber: z.string().max(15).optional(),
    emailAddress: z.string().optional(),
    address: z.string().max(100).optional(),
    objective: z.string().max(500).optional(),
    employment: z.array(
        z.object({
            companyName: z.string().max(100).optional(),
            jobTitle: z.string().max(100).optional(),
            city: z.string().max(100).optional(),
            startYear: z.string().optional(),
            endYear: z.string().optional(),
            description: z.string().optional(),
        })
    ),
    education: z.array(
        z.object({
            schoolName: z.string().max(100).optional(),
            degree: z.string().max(100).optional(),
            fieldOfStudy: z.string().max(100).optional(),
            startYear: z.string().optional(),
            endYear: z.string().optional(),
            city: z.string().max(100).optional(),
            description: z.string().optional(),
        })
    ),
    skills: z.array(
        z.object({
            skillTitle: z.string().max(100).optional(),
            skillRating: z
                .string()
                .refine((rating) => ["Beginner", "Intermediate", "Advanced", "Expert"].includes(rating))
                .optional(),
        })
    ),
    image: z.string().max(500).optional(),
})

function Builder() {
    const searchParams = useSearchParams()
    const templateId = searchParams.get("templateId")

    const router = useRouter()

    const [data, setData] = useLocalStorage("data", {})
    const [imagePreview, setImagePreview] = useState<string>("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            emailAddress: "",
            address: "",
            objective: "",
            employment: [
                {
                    companyName: "",
                    jobTitle: "",
                    city: "",
                    startYear: "",
                    endYear: "",
                    description: "",
                },
            ],
            education: [
                {
                    schoolName: "",
                    degree: "",
                    fieldOfStudy: "",
                    startYear: "",
                    endYear: "",
                    city: "",
                    description: "",
                },
            ],
            skills: [
                {
                    skillTitle: "",
                    skillRating: "Beginner",
                },
            ],
        },
    })

    const { control, register, handleSubmit } = form

    const {
        fields: employmentFields,
        append: appendEmployment,
        remove: removeEmployment,
    } = useFieldArray({
        control,
        name: "employment",
    })

    const {
        fields: educationFields,
        append: appendEducation,
        remove: removeEducation,
    } = useFieldArray({
        control,
        name: "education",
    })

    const {
        fields: skillFields,
        append: appendSkill,
        remove: removeSkill,
    } = useFieldArray({
        control,
        name: "skills",
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setData(values)
    }

    const handleInputChange = (name: string, value: any) => {
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleNestedInputChange = (category: string, index: number, fieldName: string, value: any) => {
        setData((prevData) => {
            const newData = { ...prevData } as any
            const categoryData = newData[category] || []
            const currentData = categoryData[index] || {}

            if (fieldName === "image") {
                currentData["imageUrl"] = value
            } else {
                currentData[fieldName] = value
            }

            categoryData[index] = currentData
            newData[category] = categoryData
            return newData
        })
    }

    console.log(data)

    async function generatePDFfromHTML(htmlContentId: string, outputPath: string) {
        const doc = new jsPDF()

        const htmlElement = document.getElementById(htmlContentId)
        if (!htmlElement) {
            console.error(`Element with ID '${htmlContentId}' not found.`)
            return
        }

        // Use html2canvas to capture the HTML content as an image
        const canvas = await html2canvas(htmlElement, {
            scale: 2, // Increase the scale factor to improve resolution
            logging: true, // Enable logging to see if there are any issues
            width: htmlElement.offsetWidth,
            height: htmlElement.offsetHeight,
        })

        // Convert the canvas to a data URL
        const imgData = canvas.toDataURL("image/png")

        // Add the image to the PDF
        doc.addImage(imgData, "PNG", 0, 0, 210, 0) // Adjust the parameters as needed

        // Save the PDF
        doc.save(outputPath)
        console.log("PDF generated successfully")
    }

    // Usage
    const htmlContentId = "element-to-capture" // Replace with your actual element ID

    return (
        <section className="pb-10 flex flex-col ">
            <div className="flex justify-center mb-6">
                <div className="w-full">
                    <Tabs value={templateId == null ? "template" : "account"} className="p-0">
                        <div className="bg-slate-900 text-slate-100 w-full flex justify-between mb-6 py-3 px-8">
                            <h2 className="font-bold text-lg flex items-center capitalize">{templateId ?? "Choose Template"}</h2>

                            <TabsList className="bg-slate-900 p-0">
                                <TabsTrigger
                                    value="template"
                                    onClick={() => {
                                        // Clear all query parameters when "Choose Template" tab is clicked
                                        router.push("/cv-builder")
                                    }}
                                    className="bg-slate-900 "
                                >
                                    <BiFileFind className="inline-block mr-2 " /> 1. Choose Template
                                </TabsTrigger>
                                <TabsTrigger value="account" disabled={!templateId}>
                                    <BiUser className="inline-block mr-2 " /> 2. Enter Information
                                </TabsTrigger>
                            </TabsList>

                            <Button type="button" onClick={() => generatePDFfromHTML(htmlContentId, "cvalley.pdf")} disabled={!templateId} className="bg-slate-800 hover:bg-slate-950 h-8 mt-1">
                                <BiSolidFilePdf className="mr-1" />
                                Downlaod PDF
                            </Button>
                        </div>

                        <div className="flex justify-center">
                            <div className="w-full">
                                <TabsContent value="template">
                                    <ChooseTemplate />
                                </TabsContent>

                                <TabsContent value="account">
                                    <div className="flex -my-8 -mb-16 ">
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="cvForm space-y-8 overflow-auto no-scrollbar p-8 bg-slate-200">
                                                {/* Personal Information */}
                                                <Card className=" bg-slate-100  ">
                                                    <CardHeader>
                                                        <CardTitle className="text-lg font-bold">
                                                            <BiUser className="text-xl mb-1 mr-2 inline" />
                                                            Personal Information
                                                        </CardTitle>
                                                        <CardDescription>Fill in all required details below</CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="grid gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="image"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Upload Image</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            type="file"
                                                                            onChange={(e) => {
                                                                                field.onChange(e)
                                                                                handleInputChange("image", e.target.value)
                                                                                // Image preview logic
                                                                                const reader = new FileReader()
                                                                                reader.onloadend = () => {
                                                                                    setImagePreview(reader.result as string)
                                                                                }
                                                                                if (e.target.files && e.target.files[0]) {
                                                                                    reader.readAsDataURL(e.target.files[0])
                                                                                }
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="fullName"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Full Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="John Doe"
                                                                            {...field}
                                                                            onChange={(e) => {
                                                                                field.onChange(e)
                                                                                handleInputChange("fullName", e.target.value)
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="phoneNumber"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Phone Number</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="123-456-7890"
                                                                            {...field}
                                                                            onChange={(e) => {
                                                                                field.onChange(e)
                                                                                handleInputChange("phoneNumber", e.target.value)
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="emailAddress"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Email Address</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="you@example.com"
                                                                            {...field}
                                                                            onChange={(e) => {
                                                                                field.onChange(e)
                                                                                handleInputChange("emailAddress", e.target.value)
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="address"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mailing Address</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="123 Main St, City, Country"
                                                                            {...field}
                                                                            onChange={(e) => {
                                                                                field.onChange(e)
                                                                                handleInputChange("address", e.target.value)
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="objective"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Objective</FormLabel>
                                                                    <FormControl>
                                                                        <Textarea
                                                                            placeholder="A brief summary of your career goals..."
                                                                            {...field}
                                                                            onChange={(e) => {
                                                                                field.onChange(e)
                                                                                handleInputChange("objective", e.target.value)
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </CardContent>
                                                </Card>

                                                {/* Employment History */}
                                                <Card className="bg-slate-100 ">
                                                    <CardHeader>
                                                        <CardTitle className="text-lg font-bold">
                                                            <BiEdit className="text-xl mb-1 mr-2 inline" />
                                                            Employment History
                                                        </CardTitle>
                                                        <CardDescription>Fill in all required details below</CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="grid gap-4">
                                                        {employmentFields &&
                                                            employmentFields.map((employment, index) => (
                                                                <div key={employment.id}>
                                                                    <div className="grow mb-4">
                                                                        <FormField
                                                                            name={`employment[${index}].jobTitle`}
                                                                            render={({ field }) => (
                                                                                <FormItem>
                                                                                    <FormLabel>Job Title</FormLabel>
                                                                                    <FormControl>
                                                                                        <Input
                                                                                            placeholder="Job Title"
                                                                                            {...field}
                                                                                            onChange={(e) => {
                                                                                                field.onChange(e)
                                                                                                handleNestedInputChange("employment", index, "jobTitle", e.target.value)
                                                                                            }}
                                                                                        />
                                                                                    </FormControl>
                                                                                </FormItem>
                                                                            )}
                                                                        />
                                                                    </div>
                                                                    <div className="flex gap-3 mb-4">
                                                                        <div className="grow">
                                                                            <FormField
                                                                                name={`employment[${index}].companyName`}
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel>Company Name</FormLabel>
                                                                                        <FormControl>
                                                                                            <Input
                                                                                                placeholder="Company Name"
                                                                                                {...field}
                                                                                                onChange={(e) => {
                                                                                                    field.onChange(e)
                                                                                                    handleNestedInputChange("employment", index, "companyName", e.target.value)
                                                                                                }}
                                                                                            />
                                                                                        </FormControl>
                                                                                    </FormItem>
                                                                                )}
                                                                            />
                                                                        </div>
                                                                        <div className="grow">
                                                                            <FormField
                                                                                name={`employment[${index}].city`}
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel>City</FormLabel>
                                                                                        <FormControl>
                                                                                            <Input
                                                                                                placeholder="City		"
                                                                                                {...field}
                                                                                                onChange={(e) => {
                                                                                                    field.onChange(e)
                                                                                                    handleNestedInputChange("employment", index, "city", e.target.value)
                                                                                                }}
                                                                                            />
                                                                                        </FormControl>
                                                                                    </FormItem>
                                                                                )}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex gap-3 grow mb-4">
                                                                        <div className="grow">
                                                                            <FormField
                                                                                name={`employment[${index}].startYear`}
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel>Start Year</FormLabel>
                                                                                        <FormControl>
                                                                                            <Input
                                                                                                placeholder="Start Year"
                                                                                                {...field}
                                                                                                onChange={(e) => {
                                                                                                    field.onChange(e)
                                                                                                    handleNestedInputChange("employment", index, "startYear", e.target.value)
                                                                                                }}
                                                                                            />
                                                                                        </FormControl>
                                                                                    </FormItem>
                                                                                )}
                                                                            />
                                                                        </div>
                                                                        <div className="grow">
                                                                            <FormField
                                                                                name={`employment[${index}].endYear`}
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel>End Year</FormLabel>
                                                                                        <FormControl>
                                                                                            <Input
                                                                                                placeholder="End Year"
                                                                                                {...field}
                                                                                                onChange={(e) => {
                                                                                                    field.onChange(e)
                                                                                                    handleNestedInputChange("employment", index, "endYear", e.target.value)
                                                                                                }}
                                                                                            />
                                                                                        </FormControl>
                                                                                    </FormItem>
                                                                                )}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="grow mb-4">
                                                                        <FormField
                                                                            name={`employment[${index}].description`}
                                                                            render={({ field }) => (
                                                                                <FormItem>
                                                                                    <FormLabel>Description</FormLabel>
                                                                                    <FormControl>
                                                                                        <Textarea
                                                                                            placeholder="Description"
                                                                                            {...field}
                                                                                            onChange={(e) => {
                                                                                                field.onChange(e)
                                                                                                handleNestedInputChange("employment", index, "description", e.target.value)
                                                                                            }}
                                                                                        />
                                                                                    </FormControl>
                                                                                </FormItem>
                                                                            )}
                                                                        />
                                                                    </div>
                                                                    <Button
                                                                        type="button"
                                                                        variant="destructive"
                                                                        className="w-full"
                                                                        onClick={() => {
                                                                            const newData = {
                                                                                ...data,
                                                                            } as any
                                                                            newData.employment.splice(index, 1)
                                                                            setData(newData)

                                                                            removeEmployment(index)
                                                                        }}
                                                                    >
                                                                        <BiMinus className="mr-1" /> Remove Employment
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                        <Button
                                                            type="button"
                                                            onClick={() =>
                                                                appendEmployment({
                                                                    jobTitle: "",
                                                                    companyName: "",
                                                                    city: "",
                                                                    startYear: "",
                                                                    endYear: "",
                                                                    description: "",
                                                                })
                                                            }
                                                        >
                                                            <BiPlus className="mr-1" /> Add Employment
                                                        </Button>
                                                    </CardContent>
                                                </Card>

                                                {/* Education */}
                                                <Card className=" bg-slate-100  ">
                                                    <CardHeader>
                                                        <CardTitle className="text-lg font-bold">
                                                            <BiEdit className="text-xl mb-1 mr-2 inline" />
                                                            Educations
                                                        </CardTitle>
                                                        <CardDescription>Fill in all required details below</CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="grid gap-4">
                                                        {educationFields.map((education, index) => (
                                                            <div key={education.id}>
                                                                <div className="grow mb-4">
                                                                    <FormField
                                                                        name={`education[${index}].schoolName`}
                                                                        key={education.id}
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel>School Name</FormLabel>
                                                                                <FormControl>
                                                                                    <Input
                                                                                        placeholder="School Name"
                                                                                        {...field}
                                                                                        onChange={(e) => {
                                                                                            field.onChange(e)
                                                                                            handleNestedInputChange("education", index, "schoolName", e.target.value)
                                                                                        }}
                                                                                    />
                                                                                </FormControl>
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="flex gap-3 mb-4">
                                                                    <div className="grow">
                                                                        <FormField
                                                                            name={`education[${index}].degree`}
                                                                            render={({ field }) => (
                                                                                <FormItem>
                                                                                    <FormLabel>Degree</FormLabel>
                                                                                    <FormControl>
                                                                                        <Input
                                                                                            placeholder="Degree"
                                                                                            {...field}
                                                                                            onChange={(e) => {
                                                                                                field.onChange(e)
                                                                                                handleNestedInputChange("education", index, "degree", e.target.value)
                                                                                            }}
                                                                                        />
                                                                                    </FormControl>
                                                                                </FormItem>
                                                                            )}
                                                                        />
                                                                    </div>
                                                                    <div className="grow">
                                                                        <FormField
                                                                            name={`education[${index}].fieldOfStudy`}
                                                                            render={({ field }) => (
                                                                                <FormItem>
                                                                                    <FormLabel>Field of Study</FormLabel>
                                                                                    <FormControl>
                                                                                        <Input
                                                                                            placeholder="Field of Study"
                                                                                            {...field}
                                                                                            onChange={(e) => {
                                                                                                field.onChange(e)
                                                                                                handleNestedInputChange("education", index, "fieldOfStudy", e.target.value)
                                                                                            }}
                                                                                        />
                                                                                    </FormControl>
                                                                                </FormItem>
                                                                            )}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="flex gap-3 grow mb-4">
                                                                    <div className="grow">
                                                                        <FormField
                                                                            name={`education[${index}].startYear`}
                                                                            render={({ field }) => (
                                                                                <FormItem>
                                                                                    <FormLabel>Start Year</FormLabel>
                                                                                    <FormControl>
                                                                                        <Input
                                                                                            placeholder="Start Year"
                                                                                            {...field}
                                                                                            onChange={(e) => {
                                                                                                field.onChange(e)
                                                                                                handleNestedInputChange("education", index, "startYear", e.target.value)
                                                                                            }}
                                                                                        />
                                                                                    </FormControl>
                                                                                </FormItem>
                                                                            )}
                                                                        />
                                                                    </div>
                                                                    <div className="grow">
                                                                        <FormField
                                                                            name={`education[${index}].endYear`}
                                                                            render={({ field }) => (
                                                                                <FormItem>
                                                                                    <FormLabel>End Year</FormLabel>
                                                                                    <FormControl>
                                                                                        <Input
                                                                                            placeholder="End Year"
                                                                                            {...field}
                                                                                            onChange={(e) => {
                                                                                                field.onChange(e)
                                                                                                handleNestedInputChange("education", index, "endYear", e.target.value)
                                                                                            }}
                                                                                        />
                                                                                    </FormControl>
                                                                                </FormItem>
                                                                            )}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="grow  mb-4">
                                                                    <FormField
                                                                        name={`education[${index}].description`}
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel>Description</FormLabel>
                                                                                <FormControl>
                                                                                    <Textarea
                                                                                        placeholder="Description"
                                                                                        {...field}
                                                                                        onChange={(e) => {
                                                                                            field.onChange(e)
                                                                                            handleNestedInputChange("education", index, "description", e.target.value)
                                                                                        }}
                                                                                    />
                                                                                </FormControl>
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <Button
                                                                    type="button"
                                                                    variant="destructive"
                                                                    className="w-full"
                                                                    onClick={() => {
                                                                        const newData = {
                                                                            ...data,
                                                                        } as any
                                                                        newData.education.splice(index, 1)
                                                                        setData(newData)

                                                                        removeEducation(index)
                                                                    }}
                                                                >
                                                                    <BiMinus className="mr-1" /> Remove Education
                                                                </Button>
                                                            </div>
                                                        ))}

                                                        <Button
                                                            type="button"
                                                            onClick={() =>
                                                                appendEducation({
                                                                    schoolName: "",
                                                                    degree: "",
                                                                    fieldOfStudy: "",
                                                                    startYear: "",
                                                                    endYear: "",
                                                                    city: "",
                                                                    description: "",
                                                                })
                                                            }
                                                        >
                                                            <BiPlus className="mr-1" /> Add Education
                                                        </Button>
                                                    </CardContent>
                                                </Card>

                                                {/* Skills */}
                                                <Card className="bg-slate-100 ">
                                                    <CardHeader>
                                                        <CardTitle className="text-lg font-bold">
                                                            <BiEdit className="text-xl mb-1 mr-2 inline" />
                                                            Skills
                                                        </CardTitle>
                                                        <CardDescription>Add your skills below</CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="grid gap-4">
                                                        {skillFields.map((skill, index) => (
                                                            <div key={skill.id}>
                                                                <div className="flex gap-3 mb-4 items-end">
                                                                    <div className="grow">
                                                                        <FormField
                                                                            name={`skills[${index}].skillTitle`}
                                                                            key={skill.id}
                                                                            render={({ field }) => (
                                                                                <FormItem>
                                                                                    <FormLabel>Skill Title</FormLabel>
                                                                                    <FormControl>
                                                                                        <Input
                                                                                            placeholder="Skill Title"
                                                                                            {...field}
                                                                                            onChange={(e) => {
                                                                                                field.onChange(e)
                                                                                                handleNestedInputChange("skills", index, "skillTitle", e.target.value)
                                                                                            }}
                                                                                        />
                                                                                    </FormControl>
                                                                                </FormItem>
                                                                            )}
                                                                        />
                                                                    </div>
                                                                    <div className="grow">
                                                                        <FormField
                                                                            name={`skills[${index}].skillRating`}
                                                                            render={({ field }) => (
                                                                                <FormItem>
                                                                                    <FormLabel>Skill Rating</FormLabel>
                                                                                    <FormControl>
                                                                                        <select {...field} className="w-full border rounded-md px-3 py-2">
                                                                                            <option value="Beginner">Beginner</option>
                                                                                            <option value="Intermediate">Intermediate</option>
                                                                                            <option value="Advanced">Advanced</option>
                                                                                            <option value="Expert">Expert</option>
                                                                                        </select>
                                                                                    </FormControl>
                                                                                </FormItem>
                                                                            )}
                                                                        />
                                                                    </div>
                                                                    <Button
                                                                        type="button"
                                                                        variant="destructive"
                                                                        onClick={() => {
                                                                            const newData = {
                                                                                ...data,
                                                                            } as any
                                                                            newData.skills.splice(index, 1)
                                                                            setData(newData)

                                                                            removeSkill(index)
                                                                        }}
                                                                    >
                                                                        <BiMinus className="mr-1" /> Remove
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <Button
                                                            type="button"
                                                            onClick={() =>
                                                                appendSkill({
                                                                    skillTitle: "",
                                                                    skillRating: "Beginner", // Set a default rating
                                                                })
                                                            }
                                                        >
                                                            <BiPlus className="mr-1" /> Add Skill
                                                        </Button>
                                                    </CardContent>
                                                </Card>

                                                <Button type="submit">Submit</Button>
                                            </form>
                                        </Form>
                                        {templateId === "professional" && <Professional imagePreview={imagePreview} />}
                                    </div>
                                </TabsContent>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </div>
        </section>
    )
}

export default Builder
