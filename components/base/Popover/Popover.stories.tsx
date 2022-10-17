import React from 'react';

import { Popover, PopoverInterface } from './Popover';

export default {
    component: Popover,
    title: 'Components/Popover',
    argTypes: {
        position: {
            options: [
                'above',
                'below',
                'left',
                'right',
            ],
            control: { type: 'radio' },
        },
        purpose: {
            control: { type: 'text' },
        },
        children: {
            control: { type: 'text' },
        },
    },
    decorators: [
        (Story: (args?: PopoverInterface) => JSX.Element, args: PopoverInterface): JSX.Element => (
            <div style = {{
                position: 'relative',
                width: '10px',
                height: '10px',
                margin: '100px auto',
                backgroundColor: '#000000',
            }}
            >
                <Story {...args} />
            </div>
        ),
    ],
}

const Template = (args: PopoverInterface) => <Popover {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    ...Primary.args,
    position: 'left',
    purpose: 'Test',
    children: 'popover body',
};
