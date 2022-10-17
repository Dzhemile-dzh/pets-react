import React from 'react';
import { OptionsHeader } from './OptionsHeader';

export default {
    component: OptionsHeader,
    title: 'Betslip/Components/OptionsHeader',
}

const Template = (args) => <OptionsHeader {...args} />;

export const Singles = Template.bind({});

Singles.args = {
    count: 5,
    isSingles: true,
    isMultiples: false,
};
