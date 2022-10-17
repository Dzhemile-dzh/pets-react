import { createTheme } from '@material-ui/core';

declare module '@material-ui/core/styles/' {
    interface BreakpointOverrides {
        xs: false;
        sm: false;
        md: false;
        lg: false;
        xl: false;
        mobile: true;
        tablet: true;
        smallDesktop: true;
        largeDesktop: true;
    }
}

// can't import these values from _variabless, because it's not allowed to import global scss here
export const theme = createTheme({
    breakpoints: {
        values: {
            mobile: 320,
            tablet: 768,
            smallDesktop: 1024,
            largeDesktop: 1280,
        },
    },
});
