export const debounce = (fn: any, delay: number) => {
    let timeout: any
    return function (...args: any) {
        const later = () => {
            clearTimeout(timeout)

            fn(args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, delay)
    }
}
