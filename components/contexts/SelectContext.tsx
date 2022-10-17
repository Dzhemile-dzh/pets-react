import { createContext, useContext } from 'react';

interface SelectContextProps {
    selectedOption: string,
    setSelectedOption: (value: string) => void,
    isOpen: boolean,
    hasCustomSelectedOption: boolean,
}

export const SelectContext = createContext<Partial<SelectContextProps>>({});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useSelectContext() {
    const context = useContext(SelectContext);
    if (!context) {
        throw new Error(
            'SelectContext must be used within the SelectProvider',
        )
    }
    return context;
}
