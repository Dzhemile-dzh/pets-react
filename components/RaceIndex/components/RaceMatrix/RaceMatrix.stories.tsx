import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { RaceMatrix } from './RaceMatrix';

const races = [
    {
        raceId: 1,
        raceTitle: 'raceTitle1',
    },
    {
        raceId: 2,
        raceTitle: 'raceTitle2',
    },
    {
        raceId: 3,
        raceTitle: 'raceTitle3',
    },
    {
        raceId: 4,
        raceTitle: 'raceTitle4',
    },
    {
        raceId: 5,
        raceTitle: 'raceTitle5',
    },
    {
        raceId: 6,
        raceTitle: 'raceTitle6',
    },
]

const meetings = [
    {
        meetingId: 1,
        meetingName: 'meetingName1',
        races: [1, 2, 3],
        meetingType: 'meetingType',
        numberOfRaces: 3,
    },
    {
        meetingId: 2,
        meetingName: 'meetingName2',
        races: [4, 5, 6],
        meetingType: 'meetingType',
        numberOfRaces: 3,
    },
]

const mockStore = configureStore();

const store = mockStore({
    bookmakerOffers: {},
});

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'RaceMatrix',
    component: RaceMatrix,
};

// @ts-ignore we don't need full data
const Template = () => <RaceMatrix races = {races} meetings = {meetings} />;

export const Primary = Template.bind({});

Primary.decorators = [
    (Story) => (
        <Provider store = {store}>
            <Story />
        </Provider>
    ),
];
