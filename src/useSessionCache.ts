import { useEffect, useState } from "react";

// A custom hook that uses sessionStorage to persist state between renders
export function useSessionCache<T>(key: string, initialValue: T) {
    const [state, setState] = useState<T>(() => {
        const cachedValue = sessionStorage.getItem(key);
        return cachedValue ? JSON.parse(cachedValue) : initialValue;
    });

    // Update state with the latest value from sessionStorage
    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    // Return the state and a function to update it
    return [state, setState] as const;
}