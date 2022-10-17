/* eslint-disable max-len */
import { createContext, useContext } from 'react';

export const LoginContext = createContext();

export function useLoginContext() {
    const context = useContext(LoginContext)
    if (!context) {
        throw new Error(
            'LoginLayoutProvider compound components cannot be rendered outside the LoginLayoutProvider component',
        )
    }
    return context
}
