import React from 'react';

import { RaceWinners } from './RaceWinners';

export default {
    component: RaceWinners,
    title: 'Racing/RaceWinners',
}

const Template = (args) => <RaceWinners {...args} />;

export const Default = Template.bind({});
Default.args = {
    winners: {
        data: [
            {
                horseId: 2480226,
                horseName: 'Lucky Express',
                jockeyName: 'Zac Purton',
                trainerName: 'J Size',
                officialPosition: '1',
                saddleClothNumber: '6',
                silkUrl: 'https://www.rp-assets.com/svg/7/8/4/269487.svg',
                countryCode: 'UK',
                isFavourite: true,
                startingPrice: '2/1',
                horseProfileUrl: 'lucky-express-2480226',
                deadheat: false,
            },
            {
                horseId: 1047676,
                horseName: 'Fast Most Furious',
                jockeyName: 'Matthew Poon',
                trainerName: 'D J Hall',
                officialPosition: '2',
                saddleClothNumber: '5',
                silkUrl: 'https://www.rp-assets.com/svg/5/8/1/254185.svg',
                countryCode: 'IRE',
                isFavourite: false,
                startingPrice: '3/1',
                horseProfileUrl: 'fast-most-furious-1047676',
                deadheat: false,
            },
            {
                horseId: 10476762,
                horseName: 'Furious',
                jockeyName: 'Matthew Poon',
                trainerName: 'D J Hall',
                officialPosition: '3',
                saddleClothNumber: '5',
                silkUrl: 'https://www.rp-assets.com/svg/5/8/1/254185.svg',
                countryCode: 'IRE',
                isFavourite: false,
                startingPrice: '15/1',
                horseProfileUrl: 'fast-most-furious-1047676',
                deadheat: false,
            },
            {
                horseId: 10476763,
                horseName: 'Most',
                jockeyName: 'Matthew Poon',
                trainerName: 'D J Hall',
                officialPosition: '4',
                saddleClothNumber: '5',
                silkUrl: 'https://www.rp-assets.com/svg/5/8/1/254185.svg',
                countryCode: 'IRE',
                isFavourite: false,
                startingPrice: '43/1',
                horseProfileUrl: 'fast-most-furious-1047676',
                deadheat: false,
            },
        ],
    },
    raceId: 1234,
    isHandicap: false,
    numberOfRunners: 14,
}
