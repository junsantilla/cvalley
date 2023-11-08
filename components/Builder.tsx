import React, { useEffect, useRef, useState } from "react";
import {
	BiDownload,
	BiEdit,
	BiMinus,
	BiPlus,
	BiPrinter,
	BiSave,
	BiUser,
} from "react-icons/bi";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import ReactToPrint from "react-to-print";
import { Professional } from "@/templates/Professional";
import { useRouter } from "next/router";

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
				.refine((rating) =>
					["Beginner", "Intermediate", "Advanced", "Expert"].includes(
						rating
					)
				)
				.optional(),
		})
	),
});

export function ResumeForm() {
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
	});

	const { control, register, handleSubmit } = form;

	const {
		fields: employmentFields,
		append: appendEmployment,
		remove: removeEmployment,
	} = useFieldArray({
		control,
		name: "employment",
	});

	const {
		fields: educationFields,
		append: appendEducation,
		remove: removeEducation,
	} = useFieldArray({
		control,
		name: "education",
	});

	const {
		fields: skillFields,
		append: appendSkill,
		remove: removeSkill,
	} = useFieldArray({
		control,
		name: "skills",
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{/* Personal Information */}
				<Card className=" bg-slate-100 ">
					<CardHeader>
						<CardTitle className="text-lg font-bold">
							<BiUser className="text-xl mb-1 mr-2 inline" />
							Personal Information
						</CardTitle>
						<CardDescription>
							Fill in all required details below
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4">
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
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>

				{/* Employment History */}
				<Card className="bg-slate-100">
					<CardHeader>
						<CardTitle className="text-lg font-bold">
							<BiEdit className="text-xl mb-1 mr-2 inline" />
							Employment History
						</CardTitle>
						<CardDescription>
							Fill in all required details below
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4">
						{employmentFields.map((employment, index) => (
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
													<FormLabel>
														Company Name
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Company Name"
															{...field}
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
															placeholder="City"
															{...field}
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
													<FormLabel>
														Start Year
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Start Year"
															{...field}
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
													<FormLabel>
														End Year
													</FormLabel>
													<FormControl>
														<Input
															placeholder="End Year"
															{...field}
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
												<FormLabel>
													Description
												</FormLabel>
												<FormControl>
													<Textarea
														placeholder="Description"
														{...field}
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
										removeEmployment(index);
									}}
								>
									<BiMinus className="mr-1" /> Remove
									Employment
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
				<Card className=" bg-slate-100 ">
					<CardHeader>
						<CardTitle className="text-lg font-bold">
							<BiEdit className="text-xl mb-1 mr-2 inline" />
							Educations
						</CardTitle>
						<CardDescription>
							Fill in all required details below
						</CardDescription>
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
												<FormLabel>
													School Name
												</FormLabel>
												<FormControl>
													<Input
														placeholder="School Name"
														{...field}
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
													<FormLabel>
														Degree
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Degree"
															{...field}
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
													<FormLabel>
														Field of Study
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Field of Study"
															{...field}
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
													<FormLabel>
														Start Year
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Start Year"
															{...field}
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
													<FormLabel>
														End Year
													</FormLabel>
													<FormControl>
														<Input
															placeholder="End Year"
															{...field}
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
												<FormLabel>
													Description
												</FormLabel>
												<FormControl>
													<Textarea
														placeholder="Description"
														{...field}
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
										removeEducation(index);
									}}
								>
									<BiMinus className="mr-1" /> Remove
									Education
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
				<Card className="bg-slate-100">
					<CardHeader>
						<CardTitle className="text-lg font-bold">
							<BiEdit className="text-xl mb-1 mr-2 inline" />
							Skills
						</CardTitle>
						<CardDescription>Add your skills below</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4">
						{skillFields.map((skill, index) => (
							<div key={index}>
								<div className="flex gap-3 mb-4 items-end">
									<div className="grow">
										<FormField
											name={`skills[${index}].skillTitle`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Skill Title
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Skill Title"
															{...field}
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
													<FormLabel>
														Skill Rating
													</FormLabel>
													<FormControl>
														<select
															{...field}
															className="w-full border rounded-md px-3 py-2"
														>
															<option value="Beginner">
																Beginner
															</option>
															<option value="Intermediate">
																Intermediate
															</option>
															<option value="Advanced">
																Advanced
															</option>
															<option value="Expert">
																Expert
															</option>
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
											removeSkill(index);
										}}
									>
										<BiMinus className="mr-1" /> Remove
										Skill
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
	);
}

function Builder() {
	const componentRef = useRef(null);
	const [templateId, setTemplateId] = useState(null);

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const queryTemplateId = searchParams.get("templateId");

		if (queryTemplateId) {
			setTemplateId(queryTemplateId as any);
		}
	}, []);

	return (
		<section className="py-10 flex flex-col">
			<div className="flex justify-center mb-6">
				<div className="w-full max-w-screen-lg flex justify-between">
					<h2 className="font-bold text-2xl">
						Template Name
						{/* <BiEdit className="ml-1 text-2xl inline mb-1" /> */}
					</h2>
					<div className="flex gap-1">
						<Button type="button">
							<BiSave className="mr-1" />
							Save
						</Button>
					</div>
				</div>
			</div>
			<div className="flex justify-center mb-6">
				<div className="w-full max-w-screen-lg flex justify-between">
					<Tabs defaultValue="account" className="w-full p-0">
						<TabsList className="mb-6 border">
							<TabsTrigger value="account">
								<BiUser className="inline-block mr-2" /> Enter
								Information
							</TabsTrigger>
							<TabsTrigger value="review">
								<BiEdit className="inline-block mr-2" /> Review
							</TabsTrigger>
							<TabsTrigger value="download">
								<BiDownload className="inline-block mr-2" />{" "}
								Download
							</TabsTrigger>
						</TabsList>

						<TabsContent value="account">
							<ResumeForm />
						</TabsContent>

						<TabsContent value="review">
							{templateId === "professional" && (
								<Professional ref={componentRef} />
							)}
							<ReactToPrint
								trigger={() => {
									return (
										<Button type="button">
											<BiPrinter className="mr-1" />
											Print
										</Button>
									);
								}}
								content={() => componentRef.current}
							/>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</section>
	);
}

export default Builder;
