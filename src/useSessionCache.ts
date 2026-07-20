import { useEffect, useState } from "react";

export function useSessionCache<T>(key: string, initialValue: T) {
    const [state, setState] = useState<T>(() => {
        const cachedValue = sessionStorage.getItem(key);
        return cachedValue ? JSON.parse(cachedValue) : initialValue;
    });

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState] as const;
}