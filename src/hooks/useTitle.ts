import { useEffect } from "react";

// Define a custom hook to set the document title
export function useTitle(title: string) {
    useEffect(() => {
        document.title = title;
    }, [title]);
}