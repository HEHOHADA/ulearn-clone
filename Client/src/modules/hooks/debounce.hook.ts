import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay: number) => {
    const [lastValue, setLastValue] = useState<T | any>()

    useEffect(() => {
        const handler = setTimeout(() => {
            setLastValue(value)
        }, delay)
        return () => clearTimeout(handler)
    }, [value, delay])
    return lastValue
}
