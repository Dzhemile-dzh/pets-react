/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import { StakeKeyBoardLandscape } from './StakeKeyBoardLandscape';

export default {
    component: StakeKeyBoardLandscape,
    title: 'StakeKeyBoard/StakeKeyBoardLandscape',
}

const Template = (args) => <StakeKeyBoardLandscape {...args} />

export const Default = Template.bind({});

Default.args = {
    addQuickValue: () => {},
    addValueToStake: () => {},
    closeKeyboard: () => {},
    removeStake: () => {},
}
