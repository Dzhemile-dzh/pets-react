import { useEffect } from 'react';

const useEffectOnce = (callback: () => void) : void => {
    useEffect(() => {
        callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useEffectOnce;
