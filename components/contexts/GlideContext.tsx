import { createContext, useContext } from 'react';
import { GlideProviderInterface } from '../interfaces';

export const GlideContext =
createContext<Omit<GlideProviderInterface, 'template' | 'menus'>>(null);

export const useGlideContext = ():
Omit<GlideProviderInterface, 'template' | 'menus'> => {
    const context = useContext(GlideContext);

    if (!context) {
        throw new Error(
            'useGlideContext must be used within the GlideProvider',
        )
    }

    return context;
}
