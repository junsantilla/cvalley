"use client"
import React, { useRef, useState } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { BiAward, BiBriefcaseAlt2, BiBrush, BiFileFind, BiFoodMenu, BiRightArrow, BiStar } from "react-icons/bi"
import { Badge } from "./ui/badge"
import Image from "next/image"

function ChooseTemplate() {
    // Card data
    const cardData = [
        {
            id: "professional",
            title: "Professional",
            description: "Organized template with left sidebar.",
            imageURL: "/images/templates/template-professional-preview.png",
            category: "Professional",
        },
        {
            id: "simple",
            title: "Simple",
            description: "Clean with icon and background for each section title.",
            imageURL: "/images/templates/template-simple-preview.jpg",
            category: "Simple",
        },
        {
            id: "plain",
            title: "Plain",
            description: "Plain and easy to read template.",
            imageURL: "/images/templates/template-plain-preview.jpg",
            category: "Simple",
        },
    ]

    // State to keep track of the selected category
    const [selectedCategory, setSelectedCategory] = useState("All")

    // Function to filter cards based on the selected category
    const filteredCards = selectedCategory === "All" ? cardData : cardData.filter((card) => card.category === selectedCategory)

    return (
        <section className="flex flex-col py-8">
            <div className=" mb-6 flex justify-center">
                <div className="w-full max-w-screen-2xl px-8 flex justify-end">
                    <div className="flex gap-1">
                        <Button variant={selectedCategory !== "All" ? "outline" : undefined} onClick={() => setSelectedCategory("All")}>
                            <BiFoodMenu className="mr-1" />
                            All Templates
                        </Button>
                        <Button variant={selectedCategory !== "Simple" ? "outline" : undefined} onClick={() => setSelectedCategory("Simple")}>
                            <BiAward className="mr-1" />
                            Simple
                        </Button>
                        <Button variant={selectedCategory !== "Professional" ? "outline" : undefined} onClick={() => setSelectedCategory("Professional")}>
                            <BiBriefcaseAlt2 className="mr-1" />
                            Professional
                        </Button>
                        <Button variant={selectedCategory !== "Modern" ? "outline" : undefined} onClick={() => setSelectedCategory("Modern")}>
                            <BiBrush className="mr-1" /> Modern
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mb-6">
                <div className="w-full max-w-screen-2xl px-8">
                    <div className="grid grid-cols-3 gap-4">
                        {filteredCards.map((card, index) => (
                            <Card key={index} className="p-2 bg-slate-100 hover:border-slate-300 hover:bg-slate-200 rounded-none">
                                <div className="flex flex-col h-full">
                                    <CardHeader>
                                        <Image src={card.imageURL} alt={`Preview of ${card.title}`} width={500} height={500} layout="responsive" className="mb-3" />

                                        <CardTitle className="text-lg flex justify-between">
                                            {card.title}
                                            <Badge className="mx-2 text-xs ">{card.category}</Badge>
                                        </CardTitle>
                                        <CardDescription>{card.description}</CardDescription>
                                    </CardHeader>
                                    <CardFooter className="-mt-1">
                                        <Link href={`/cv-builder?templateId=${card.id}`} className="w-full">
                                            <Button className="w-full ">
                                                <BiRightArrow className="mr-1 text-md" /> Select
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ChooseTemplate
