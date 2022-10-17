/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import { StakeKeyBoardPortrait } from './StakeKeyBoardPortrait';

export default {
    component: StakeKeyBoardPortrait,
    title: 'StakeKeyBoard/StakeKeyBoardPortrait',
}

const Template = (args) => <StakeKeyBoardPortrait {...args} />

export const Default = Template.bind({});

Default.args = {
    addQuickValue: () => {},
    addValueToStake: () => {},
    closeKeyboard: () => {},
    removeStake: () => {},
}
