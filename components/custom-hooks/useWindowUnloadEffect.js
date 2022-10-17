/* eslint-disable max-len */
import { useEffect, useRef } from 'react'

const useWindowUnloadEffect = (cb, callOnCleanup) => {
    const isSafariMobile = () => {
        return navigator && /Safari/.test(navigator.userAgent) && /iPhone|iPad/.test(navigator.userAgent)
    }
    const ref = useRef();
    const event = isSafariMobile ? 'unload' : 'beforeunload';

    ref.current = cb;

    useEffect(() => {
        const eventHandler = () => ref.current()

        window.addEventListener(event, eventHandler)

        return () => {
            if (callOnCleanup) eventHandler()

            window.removeEventListener(event, eventHandler)
        }
    }, [callOnCleanup, event])
}

export default useWindowUnloadEffect;
