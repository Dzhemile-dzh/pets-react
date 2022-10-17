import React from 'react';
import Head from 'next/head';

export interface LinkInterface {
    href: string;
    rel: string;
}

export const Link = ({ href, rel }: LinkInterface): React.ReactElement => (
    <Head>
        <link href = {href} rel = {rel} />
    </Head>
)
