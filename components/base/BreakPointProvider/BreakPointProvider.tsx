import React, { useMemo, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { BreakPointContext } from '../../contexts/BreakPointContext';

export const MOBILE = 'mobile';
export const TABLET = 'tablet';
export const DESKTOP = 'desktop';

export const BreakPointProvider = (
    { children } : { children: React.ReactChild | React.ReactChildren},
)
: JSX.Element => {
    const [isInitialised, setIsInitialised] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsInitialised(true)
        }
    }, []);

    const isMobile = useMediaQuery({ maxWidth: 767.9 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023.9 });
    const isSmallDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1279.9 });
    const isLargeDesktop = useMediaQuery({ minWidth: 1280 });
    const isDesktop = isSmallDesktop || isLargeDesktop

    const contextValue = useMemo(
        () => ({
            isDesktop,
            isTablet,
            isMobile,
            isSmallDesktop,
            isLargeDesktop,
        }),
        [isDesktop, isLargeDesktop, isMobile, isSmallDesktop, isTablet],
    );

    return (
        <BreakPointContext.Provider value = {contextValue}>
            {isInitialised && children}
        </BreakPointContext.Provider>
    )
}
