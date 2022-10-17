import { useRef, useEffect } from 'react';

const useInterval = (callback: () => void, delay: number) : void => {
    const savedCallback = useRef();

    useEffect(() => {
        // @ts-ignore we always pass it
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            // @ts-ignore we always pass it
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

export default useInterval;
