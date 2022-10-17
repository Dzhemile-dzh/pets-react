import { createContext, useContext } from 'react';

interface BetslipContextProps {
    toggleBetslip: () => void,
    isOpened: boolean,
}

// eslint-disable-next-line no-undef
export const BetslipContext = createContext<Partial<BetslipContextProps>>({});

export function useBetslip() {
    const context = useContext(BetslipContext);

    if (!context) {
        throw new Error('BetslipContext must be used within a BetslipProvider')
    }

    return context;
}
