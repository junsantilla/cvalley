import React, { useEffect, useRef, useState } from "react"
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
import useLocalStorage from "use-local-storage"
import jsPDF from "jspdf"
import AddDummyDataButton from "./AddDummyDataButton"
import ClearDataButton from "./ClearDataButton"
import domtoimage from "dom-to-image"

// Templates
import Professional from "@/templates/Professional/Professional"
import Simple from "@/templates/Simple/Simple"

// Form schema
const formSchema = z.object({
    fullName: z.string().max(100).optional(),
    jobTitle: z.string().max(100).optional(),
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

            description: z.string().optional(),
        })
    ),
    skills: z.array(
        z.object({
            skillTitle: z.string().max(100).optional(),
        })
    ),
    image: z.string().max(500).optional(),
})

// Initial state for the data object
const initialData = {
    fullName: "",
    jobTitle: "",
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
            description: "",
        },
    ],
    skills: [
        {
            skillTitle: "",
        },
    ],
}

function Builder() {
    const searchParams = useSearchParams()
    const templateId = searchParams.get("templateId")

    const router = useRouter()

    const [data, setData] = useLocalStorage("data", formSchema.parse(initialData))

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

                    description: "",
                },
            ],
            skills: [
                {
                    skillTitle: "",
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

    const hasEffectRunEmployment = useRef(false)
    useEffect(() => {
        if (data.employment && data.employment.length > 0 && !hasEffectRunEmployment.current) {
            for (let i = 1; i < data.employment.length; i++) {
                appendEmployment(data.employment[i])
            }

            hasEffectRunEmployment.current = true
        }
    }, [data.employment, appendEmployment])

    const hasEffectRunEducation = useRef(false)
    useEffect(() => {
        if (data.education && data.education.length > 0 && !hasEffectRunEducation.current) {
            for (let i = 1; i < data.education.length; i++) {
                appendEducation(data.education[i])
            }

            hasEffectRunEducation.current = true
        }
    }, [data.education, appendEducation])

    const hasEffectRunSkills = useRef(false)
    useEffect(() => {
        if (data.skills && data.skills.length > 0 && !hasEffectRunSkills.current) {
            for (let i = 1; i < data.skills.length; i++) {
                appendSkill(data.skills[i])
            }

            hasEffectRunSkills.current = true
        }
    }, [data.skills, appendSkill])

    //Handle input change
    const handleInputChange = (name: string, value: string | number) => {
        // Update the data state with the new value
        setData((prevData) => ({
            ...prevData!,
            [name]: value,
        }))

        // Reset the flags for useFieldArray useEffects
        hasEffectRunEmployment.current = false
        hasEffectRunEducation.current = false
        hasEffectRunSkills.current = false
    }

    // Handle nested input change
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

    // Generate PDF from HTML
    const generatePDFfromHTML = async (htmlContentId: string, outputPath: string) => {
        const input = document.getElementById(htmlContentId)
        const scale = 2

        if (!input) {
            console.error(`HTML element with ID ${htmlContentId} not found.`)
            return
        }

        const scaledWidth = input.offsetWidth * scale
        const scaledHeight = input.offsetHeight * scale

        try {
            const dataUrl = await domtoimage.toPng(input, {
                width: scaledWidth,
                height: scaledHeight,
                style: {
                    transform: "scale(" + scale + ")",
                    transformOrigin: "top left",
                },
            })

            const pdf = new jsPDF()

            const img = new Image()
            img.src = dataUrl

            img.onload = () => {
                const pdfWidth = pdf.internal.pageSize.getWidth()
                const pdfHeight = (img.height * pdfWidth) / img.width
                pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight)
                pdf.save(outputPath)
            }
        } catch (error) {
            console.error("Error generating PDF:", error)
        }
    }

    // Download image from html
    const downloadImageFromHTML = async (htmlContentId: string, outputPath: string) => {
        const htmlElement = document.getElementById(htmlContentId)

        if (!htmlElement) {
            console.error(`Element with ID '${htmlContentId}' not found.`)
            return
        }

        // Increase the quality setting for dom-to-image
        const scale = 1 // You can adjust the scale as needed
        const options = {
            quality: 1.0,
            style: {
                transform: `scale(${scale})`,
                transformOrigin: "top left",
            },
        }

        try {
            const dataUrl = await domtoimage.toJpeg(htmlElement, options)

            // Create a link element to trigger the download
            const link = document.createElement("a")
            link.href = dataUrl
            link.download = outputPath

            // Trigger the download
            link.click()
        } catch (error) {
            console.error("Error generating image:", error)
        }
    }

    // Handle data change
    const handleDataChange = (newData: any) => {
        setData(newData)
    }

    // Clear dta
    const handleClearData = () => {
        setData(formSchema.parse(initialData))

        for (let i = employmentFields.length - 1; i > 0; i--) {
            removeEmployment(i)
        }
        for (let i = educationFields.length - 1; i > 0; i--) {
            removeEducation(i)
        }
        for (let i = skillFields.length - 1; i > 0; i--) {
            removeSkill(i)
        }

        hasEffectRunEmployment.current = false
        hasEffectRunEducation.current = false
        hasEffectRunSkills.current = false
    }

    return (
        <section className="flex flex-col ">
            <div className="flex justify-center">
                <div className="w-full">
                    <Tabs value={templateId == null ? "template" : "account"} className="p-0">
                        <div className="bg-slate-900 text-slate-100 w-full flex justify-between py-3 px-8">
                            <h2 className="font-bold text-lg flex items-center capitalize">{templateId ?? "Choose Template"}</h2>
                            <TabsList className="bg-slate-900 p-0">
                                <TabsTrigger
                                    value="template"
                                    onClick={() => {
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

                            {/* <Button type="button" onClick={() => downloadImageFromHTML("element-to-capture", "cvalley")} disabled={!templateId} className="bg-slate-800 hover:bg-slate-950 h-8 mt-1">
                                <BiSolidFilePdf className="mr-1" />
                                Downlaod JPEG
                            </Button> */}

                            <Button type="button" onClick={() => generatePDFfromHTML("element-to-capture", "cvalley")} disabled={!templateId} className="bg-slate-800 hover:bg-slate-950 h-8 mt-1">
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
                                    <div className="flex -mt-2">
                                        <div className="flex flex-col ">
                                            <Form {...form}>
                                                <form className="cvForm space-y-8 overflow-auto no-scrollbar p-8 bg-slate-500">
                                                    <div className="flex justify-end gap-3">
                                                        <ClearDataButton onClearData={handleClearData} />
                                                        <AddDummyDataButton onDataAdd={handleDataChange} />
                                                    </div>
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

                                                            <div className="flex gap-4">
                                                                <FormField
                                                                    control={form.control}
                                                                    name="fullName"
                                                                    render={({ field }) => (
                                                                        <FormItem className="grow">
                                                                            <FormLabel>Full Name</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    placeholder="John Doe"
                                                                                    {...field}
                                                                                    value={data.fullName || ""}
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
                                                                    name="jobTitle"
                                                                    render={({ field }) => (
                                                                        <FormItem className="grow">
                                                                            <FormLabel>Job Title</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    placeholder="Web Developer"
                                                                                    {...field}
                                                                                    value={data.jobTitle || ""}
                                                                                    onChange={(e) => {
                                                                                        field.onChange(e)
                                                                                        handleInputChange("jobTitle", e.target.value)
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            </div>

                                                            <div className="flex gap-4">
                                                                <FormField
                                                                    control={form.control}
                                                                    name="phoneNumber"
                                                                    render={({ field }) => (
                                                                        <FormItem className="grow">
                                                                            <FormLabel>Phone Number</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    placeholder="123-456-7890"
                                                                                    {...field}
                                                                                    value={data.phoneNumber || ""}
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
                                                                        <FormItem className="grow">
                                                                            <FormLabel>Email Address</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    placeholder="you@example.com"
                                                                                    {...field}
                                                                                    value={data.emailAddress || ""}
                                                                                    onChange={(e) => {
                                                                                        field.onChange(e)
                                                                                        handleInputChange("emailAddress", e.target.value)
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            </div>
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
                                                                                value={data.address || ""}
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
                                                                                value={data.objective || ""}
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
                                                                                                value={data.employment?.[index]?.jobTitle || ""}
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
                                                                                                    value={data.employment?.[index]?.companyName || ""}
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
                                                                                                    value={data.employment?.[index]?.city || ""}
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
                                                                                            <FormLabel>Start Date</FormLabel>
                                                                                            <FormControl>
                                                                                                <Input
                                                                                                    placeholder="Start Date"
                                                                                                    {...field}
                                                                                                    value={data.employment?.[index]?.startYear || ""}
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
                                                                                            <FormLabel>End Date</FormLabel>
                                                                                            <FormControl>
                                                                                                <Input
                                                                                                    placeholder="End Date"
                                                                                                    {...field}
                                                                                                    value={data.employment?.[index]?.endYear || ""}
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
                                                                                                value={data.employment?.[index]?.description || ""}
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
                                                                                            value={data.education?.[index]?.schoolName || ""}
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
                                                                                                value={data.education?.[index]?.degree || ""}
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
                                                                                                value={data.education?.[index]?.fieldOfStudy || ""}
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
                                                                                                value={data.education?.[index]?.startYear || ""}
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
                                                                                                value={data.education?.[index]?.endYear || ""}
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
                                                                                            value={data.education?.[index]?.description || ""}
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
                                                                                                value={data.skills?.[index]?.skillTitle || ""}
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
                                                                    })
                                                                }
                                                            >
                                                                <BiPlus className="mr-1" /> Add Skill
                                                            </Button>
                                                        </CardContent>
                                                    </Card>

                                                    {/* <Button type="submit">Submit</Button> */}
                                                </form>
                                            </Form>
                                        </div>
                                        {templateId === "professional" && <Professional imagePreview={imagePreview} />}
                                        {templateId === "simple" && <Simple imagePreview={imagePreview} />}
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
