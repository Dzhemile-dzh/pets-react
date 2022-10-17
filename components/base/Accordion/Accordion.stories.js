import React from 'react';
import { Accordion } from './Accordion';

export default {
    component: Accordion,
    title: 'Base/Accordion',
    argTypes: {
        headerContent: {
            control: { type: 'text' },
        },
        openedContent: {
            control: { type: 'text' },
        },
        shouldShowAccordionButton: {
            control: { type: 'boolean' },
        },
        isOnVerdict: {
            control: { type: 'boolean' },
        },
        isAccordionDisabled: {
            control: { type: 'boolean' },
        },
    },
}

const Template = (args) => <Accordion {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    headerContent: 'Text of the header of the Accordion Component',
    headerContentAdditional: 'Text of the additional header of the Accordion Component',
    openedContent: 'Text in opened state of the Accordion Component',
    shouldShowAccordionButton: false,
    isOnVerdict: true,
    isAccordionDisabled: false,
}
