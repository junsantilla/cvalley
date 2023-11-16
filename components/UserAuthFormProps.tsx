"use client"
import * as React from "react"
import { UserAuth } from "../context/AuthContext"
import { cn } from "@/lib/utils"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { BiLogoGoogle } from "react-icons/bi"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm() {
    const { user, googleSignIn, logOut } = UserAuth()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const handleSignIn = async () => {
        try {
            await googleSignIn()
        } catch (error) {
            console.log(error)
        }
    }

    const handleSignOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.log(error)
        }
    }

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <div className="grid gap-2">
            <Button type="button" onClick={handleSignIn}>
                <BiLogoGoogle className="mr-1 text-lg" /> Google
            </Button>
        </div>
    )
}
