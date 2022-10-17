/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import { Checkbox } from './Checkbox';

export default {
    component: Checkbox,
    title: 'Base/Inputs/Checkbox',
}

const Template = (args) => <Checkbox {...args} />

export const Default = Template.bind({});

Default.args = {
    label: 'checkbox',
    value: false,
    onChange: () => {},
    name: 'checkbox',
}
