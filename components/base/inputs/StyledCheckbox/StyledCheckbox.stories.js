/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import { StyledCheckbox } from './StyledCheckbox';

export default {
    component: StyledCheckbox,
    title: 'Base/Inputs/StyledCheckbox',
}

const Template = (args) => <StyledCheckbox {...args} />

export const Default = Template.bind({});

Default.args = {
    label: 'checkbox',
    checked: false,
    handleChange: () => {},
    subtitle: 'subtitle',
}
