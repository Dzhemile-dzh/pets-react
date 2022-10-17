/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import { DesktopStakeInput } from './DesktopStakeInput';

export default {
    component: DesktopStakeInput,
    title: 'Betslip/Components/DesktopStakeInput',
}

const Template = (args) => (
    <DesktopStakeInput
        updateCurrentStake = {() => {}}
        selectOption = {() => {}}
        {...args}
    />
)

export const Default = Template.bind({});

Default.args = {
    betStake: 15,
    optionId: '1',
    prefix: '$',
    limit: 1500,
    isDisabled: false,
}
