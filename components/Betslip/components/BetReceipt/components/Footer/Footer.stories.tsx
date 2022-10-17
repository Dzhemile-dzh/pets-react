/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { Footer } from './Footer';

export default {
    component: Footer,
    title: 'BetReceipt/Components/Footer',
}

const Template = (args) => <Footer onReceiptClickHandler = {() => {}} {...args} />;

export const Default = Template.bind({});

Default.args = {
    nextRaceLink: 'link',
    todaysRacesLink: 'link',
    latestRacesLink: 'link',
};
