import { createContext, useContext } from 'react';

interface ToggleProps {
    isToggled: boolean;
    handleToggle: () => void;
}

export const ToggleContext = createContext<Partial<ToggleProps>>({});

export const useToggleContext = (): Partial<ToggleProps> => {
    const context = useContext(ToggleContext);

    if (!context) {
        throw new Error(
            'Toggle compound components cannot be rendered outside the Toggle component',
        );
    }

    return context;
}
