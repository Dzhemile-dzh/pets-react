/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import { CustomisationBar } from './CustomisationBar';

export default {
    component: CustomisationBar,
    title: 'Race/Components/CustomisationBar',
    argTypes: {
        isResult: {
            options: [true, false],
            control: { type: 'inline-radio' },
        },
        isCommentOpen: {
            options: [true, false],
            control: { type: 'inline-radio' },
        },
        isDetailsOpen: {
            options: [true, false],
            control: { type: 'inline-radio' },
        },
    },
}

const Template = (args) => (
    <CustomisationBar
        toggleRecenRaceForm = {() => {}}
        toggleRunnerComment = {() => {}}
        toggleSubsequentForm = {() => {}}
        changeCustomozationSettings = {() => {}}
        cardCustomization = {{
            isCompactViewEnabled: false,
            numberOfRecentRaces: 3,
            priceType: 'fractional',
            runnersSortedBy: 'ODDS',
            showOdds: true,
            showRunnerAdditionalInfo: false,
            showRunnerBasicInfo: true,
        }}
        isCommentOpen = {false}
        isDetailsOpen = {false}
        {...args}
    />
);

export const ResultCustomisationBar = Template.bind({});
ResultCustomisationBar.args = {
    ...ResultCustomisationBar.args,
    isResult: true,
};

export const RaceCardCustomisationBar = Template.bind({});
RaceCardCustomisationBar.args = {
    ...RaceCardCustomisationBar.args,
    isResult: false,
};
