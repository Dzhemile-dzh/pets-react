import React from 'react';
import propTypes from 'prop-types';
import Head from 'next/head';

export const MetaDescription = ({ metaDescription }) => (
    <Head>
        <meta name = "description" content = {metaDescription} />
    </Head>
)

MetaDescription.propTypes = {
    metaDescription: propTypes.string.isRequired,
}
