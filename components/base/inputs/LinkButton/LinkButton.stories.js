import React from 'react';

import { LinkButton } from './LinkButton';

// This is the new way of writing stories
export default {
    component: LinkButton,
    title: 'Base/LinkButton',
};

const Template = (args) => <LinkButton {...args}>Link Button test</LinkButton>;

export const Default = Template.bind({});
Default.args = {
    styleType: 'tertiary',
    className: 'classname',
    onClick: true,
    targetName: 'WindowLogout',
    title: 'Window Logout',
    isWindowPopUp: true,
    size: 12,
};
