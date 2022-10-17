import React from 'react';

// For debugging reasons for re-rendering components we use whyDidYouRender in dev mode
if (__DEV__ && typeof window !== 'undefined') {
    // eslint-disable-next-line max-len
    const whyDidYouRender = require('@welldone-software/why-did-you-render');

    whyDidYouRender(React);
}
