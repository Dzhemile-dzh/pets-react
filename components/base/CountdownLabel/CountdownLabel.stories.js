import React from 'react';
import { CountdownLabel } from './CountdownLabel';

import { Constants } from '../../../project/constants';

const {
    RACE_STATUSES: {
        RESULT,
        FAST_RESULT,
        DECLARED,
        VOID,
        NEXT_OFF,
    },
} = Constants;

export default {
    component: CountdownLabel,
    title: 'Base/CountDownLabel',
    argTypes: {
        status: {
            options: [RESULT,
                FAST_RESULT,
                DECLARED,
                VOID,
                NEXT_OFF],
            control: { type: 'radio' },
        },
        isFastResult: {
            control: { type: 'boolean' },
        },
    },
}

const Template = (args) => <CountdownLabel {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    ...Primary.args,
    status: RESULT,
    value: 'Later',
    isFastResult: false,
};
