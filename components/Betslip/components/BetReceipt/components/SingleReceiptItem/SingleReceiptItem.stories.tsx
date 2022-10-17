import React from 'react';

import { SingleReceiptItem } from './SingleReceiptItem';

export default {
    component: SingleReceiptItem,
    title: 'BetReceipt/SingleReceiptItem',
}

const Template = (args) => <SingleReceiptItem {...args} />;

export const WithoutBestOdds = Template.bind({})
WithoutBestOdds.args = {
    betId: '8079d1ccfffe2f99353c42f1cc7e6975',
    startTime: '16:40',
    meetingName: 'Ballinrobe',
    places: '1st 3 places',
    payOut: '@ 1/5',
    startPosition: '2',
    horseName: 'Kendancer',
    betType: 'single',
    numberLines: 1,
    displayPrice: '9/4',
    potentialReturns: '0.33',
    useBestOddsGuaranteed: false,
    isStartingPrice: false,
    isEachWay: false,
    stake: '0.10',
    date: '23 Aug 2021',
    currency: '£',
}

export const WithBestOdds = Template.bind({})
WithBestOdds.args = {
    betId: '8079d1ccfffe2f99353c42f1cc7e6975',
    startTime: '16:40',
    meetingName: 'Ballinrobe',
    places: '1st 3 places',
    payOut: '@ 1/5',
    startPosition: '2',
    horseName: 'Kendancer',
    betType: 'single',
    numberLines: 1,
    displayPrice: '9/4',
    potentialReturns: '0.33',
    useBestOddsGuaranteed: true,
    isStartingPrice: false,
    isEachWay: false,
    stake: '0.10',
    date: '23 Aug 2021',
    currency: '£',
}
