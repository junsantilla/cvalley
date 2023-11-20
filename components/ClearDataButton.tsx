import { BiTrash } from "react-icons/bi"
import { Button } from "./ui/button"

interface ClearDataButtonProps {
    onClearData: () => void
}

const ClearDataButton: React.FC<ClearDataButtonProps> = ({ onClearData }) => {
    const handleClearData = () => {
        // Display an alert to confirm data clearing
        const isConfirmed = window.confirm("Are you sure you want to clear all data?")

        // If the user confirms, proceed with clearing the data
        if (isConfirmed) {
            // Remove all data from local storage
            localStorage.clear()

            // Notify the parent component that data has been cleared
            onClearData()
        }
    }

    return (
        <Button type="button" onClick={handleClearData}>
            <BiTrash className="mr-1" />
            Clear Data
        </Button>
    )
}

export default ClearDataButton
