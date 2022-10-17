import { createContext, useContext } from 'react';

interface BreakPointContextInterface {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isSmallDesktop: boolean;
    isLargeDesktop: boolean;
}

export const BreakPointContext = createContext<Partial<BreakPointContextInterface>>({});

export function useBreakPoint() : Partial<BreakPointContextInterface> {
    const context = useContext(BreakPointContext);

    if (!context) {
        throw new Error('BreakPointContext must be used within a BreakPointProvider')
    }

    return context;
}
