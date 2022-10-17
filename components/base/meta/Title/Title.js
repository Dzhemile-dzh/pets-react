import React from 'react'
import propTypes from 'prop-types'
import Head from 'next/head';

export const Title = ({ title }) => (
    <Head>
        <title> {title} </title>
    </Head>
)

Title.propTypes = {
    title: propTypes.string.isRequired,
}
