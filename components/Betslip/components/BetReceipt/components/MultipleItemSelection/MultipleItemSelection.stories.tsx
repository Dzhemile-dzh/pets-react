import React from 'react';
import { MultipleItemSelection } from './MultipleItemSelection';

export default {
    component: MultipleItemSelection,
    title: 'BetReceipt/MultipleItemSelection',
}

const Template = (args) => <MultipleItemSelection {...args} />;

export const WithBestOdds = Template.bind({});
WithBestOdds.args = {
    multipleBetItemSelections: [
        {
            horseName: 'Almost An Angel',
            runnerNumber: '2',
            date: '23 August 2021',
            startTime: '13:30',
            meetingName: 'Chepstow',
            useBestOddsGuaranteed: true,
            isStartingPrice: false,
            displayPrice: '13/8',
        },
    ],
};

export const WithoutBestOdds = Template.bind({});
WithoutBestOdds.args = {
    multipleBetItemSelections: [
        {
            horseName: 'Almost An Angel',
            runnerNumber: '2',
            date: '23 August 2021',
            startTime: '13:30',
            meetingName: 'Chepstow',
            useBestOddsGuaranteed: false,
            isStartingPrice: false,
            displayPrice: '13/8',
        },
    ],
};
