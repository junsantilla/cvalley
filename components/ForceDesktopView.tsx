import { useEffect } from "react"

const ForceDesktopView: React.FC = () => {
    useEffect(() => {
        // Function to set the viewport meta tag for desktop view
        const setDesktopViewport = () => {
            const viewport = document.querySelector("meta[name=viewport]")
            if (viewport) {
                viewport.setAttribute(
                    "content",
                    "width=1024, initial-scale=1" // You can adjust the width based on your desired desktop width
                )
            }
        }

        // Call the function to set the desktop viewport when the component mounts
        setDesktopViewport()

        // Optionally, you can remove the viewport settings when the component unmounts
        return () => {
            const viewport = document.querySelector("meta[name=viewport]")
            if (viewport) {
                viewport.setAttribute("content", "") // Reset to default
            }
        }
    }, []) // The empty dependency array ensures that this effect runs only once

    return <div>{/* Your page content goes here */}</div>
}

export default ForceDesktopView
