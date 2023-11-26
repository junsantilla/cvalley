import { BiTrash } from "react-icons/bi"
import { Button } from "./ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

interface ClearDataButtonProps {
    onClearData: () => void
}

const ClearDataButton: React.FC<ClearDataButtonProps> = ({ onClearData }) => {
    const handleClearData = () => {
        // Remove all data from local storage
        localStorage.clear()

        // Notify the parent component that data has been cleared
        onClearData()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button type="button">
                    <BiTrash className="mr-1" />
                    Clear Data
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone. This will permanently delete all your data.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearData}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ClearDataButton
