import React from 'react';
import { useRouter } from 'next/router';

import GlideContent from '../../components/Glide';

const DevHomePage = () => {
    const { asPath } = useRouter();

    return (
        <GlideContent path = {asPath} />
    );
}

DevHomePage.displayName = 'DevHomePage';

export default DevHomePage;

DevHomePage.displayName = 'DevHomePage';
DevHomePage.isHavingSSR = false;
