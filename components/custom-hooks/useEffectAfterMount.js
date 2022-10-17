import { useRef, useEffect } from 'react';

// Use if you don't need to use useEffect on mount phase
export default function useEffectAfterMount(cb, dependencies) {
    const justMounted = useRef(true)

    useEffect(() => {
        if (!justMounted.current) {
            return cb()
        }
        justMounted.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies)
}
