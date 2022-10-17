import { createContext, useContext } from 'react';

interface SlideToggleProps {
    selectedOption: string;
    setSelectedOption: (value: string) => void;
}

export const SlideToggleContext = createContext<Partial<SlideToggleProps>>({});

export const useSlideToggleContext = (): Partial<SlideToggleProps> => {
    const context = useContext(SlideToggleContext);

    if (!context) {
        throw new Error(
            'SlideToggle compound components cannot be rendered outside the SlideToggle component',
        );
    }

    return context;
}
