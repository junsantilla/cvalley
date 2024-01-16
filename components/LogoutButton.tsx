import { BiLogOutCircle } from "react-icons/bi"
import { Button } from "./ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { UserAuth } from "@/context/AuthContext"

const LogoutButton: React.FC = () => {
    const { logOut } = UserAuth()

    const handleLogout = () => {
        // Remove all data from local storage
        localStorage.clear()

        logOut()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="p-2">
                <Button type="button">
                    <BiLogOutCircle className="mr-2" />
                    Log out
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>Logging out will permanently delete all your data, and cannot be undone. </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default LogoutButton
