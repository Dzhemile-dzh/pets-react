import React from 'react';
import Head from 'next/head';

export interface OpenGraphInterface {
    property: string;
    content: string;
}

export const OpenGraph = ({ property, content }: OpenGraphInterface): React.ReactElement => (
    <Head>
        <meta property = {property} content = {content} />
    </Head>
)
