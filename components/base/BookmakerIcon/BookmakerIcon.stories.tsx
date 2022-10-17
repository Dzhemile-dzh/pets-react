import React from 'react';

import { BookmakerIcon } from './BookmakerIcon';

export default {
    component: BookmakerIcon,
    title: 'Base/BookmakerIcon',
    argTypes: {
        color: {
            options: ['primary', 'secondary', 'black', 'white', 'dark-grey'],
            control: { type: 'radio' },
        },
        size: {
            options: [
                'xs', 'small', 'normal', 'medium', 'large', 'xl', 'xxl',
            ],
            control: { type: 'select' },
        },
        transform: {
            options: [
                null, 'rotate', 'rotate-left',
            ],
            control: { type: 'inline-radio' },
        },
    },
}

const Template = (args) => (
    <BookmakerIcon
        size = "large"
        color = "primary"
        {...args}
    />
);

export const BestOddsBookmakerlogo = Template.bind({});
BestOddsBookmakerlogo.args = {
    ...BestOddsBookmakerlogo.args,
    name: 'bestoddsbookmaker',
};

export const Coral = Template.bind({});
Coral.args = { ...Coral.args, name: 'coral' };
export const Ladbrokes = Template.bind({});
Ladbrokes.args = { ...Ladbrokes.args, name: 'ladbrokes' };
export const Bet365 = Template.bind({});
Bet365.args = { ...Bet365.args, name: 'bet365' };
export const Betway = Template.bind({});
Betway.args = { ...Betway.args, name: 'betway' };
export const PaddyPower = Template.bind({});
PaddyPower.args = { ...PaddyPower.args, name: 'paddypower' };
export const Betfair = Template.bind({});
Betfair.args = { ...Betfair.args, name: 'betfair' };
export const Tote = Template.bind({});
Tote.args = { ...Tote.args, name: 'tote' };
export const WilliamHill = Template.bind({});
WilliamHill.args = { ...WilliamHill.args, name: 'williamhill' };

export const WilliamHillWhiteBackground = Template.bind({});
WilliamHillWhiteBackground.args = {
    ...WilliamHillWhiteBackground.args,
    name: 'williamhillwhitebackground',
};

export const CoralWhiteBackground = Template.bind({});
CoralWhiteBackground.args = {
    ...CoralWhiteBackground.args,
    name: 'coralwhitebackground',
};

export const BetwayWhiteBackground = Template.bind({});
BetwayWhiteBackground.args = {
    ...BetwayWhiteBackground.args,
    name: 'betwaywhitebackground',
};

export const LadbrokesWhiteBackground = Template.bind({});
LadbrokesWhiteBackground.args = {
    ...LadbrokesWhiteBackground.args,
    name: 'ladbrokeswhitebackground',
};

export const Bet365WhiteBackground = Template.bind({});
Bet365WhiteBackground.args = {
    ...Bet365WhiteBackground.args,
    name: 'bet365whitebackground',
};

export const PaddyPowerWhiteBackground = Template.bind({});
PaddyPowerWhiteBackground.args = {
    ...PaddyPowerWhiteBackground.args,
    name: 'paddypowerwhitebackground',
};

export const Bet365Square = Template.bind({});
Bet365Square.args = { ...Bet365Square.args, name: 'bet365square' };

export const BetFairSquare = Template.bind({});
BetFairSquare.args = { ...BetFairSquare.args, name: 'betfairsquare' };

export const CoralSquare = Template.bind({});
CoralSquare.args = { ...CoralSquare.args, name: 'coralsquare' };

export const LadbrokesSquare = Template.bind({});
LadbrokesSquare.args = { ...LadbrokesSquare.args, name: 'ladbrokessquare' };

export const PaddyPowerSquare = Template.bind({});
PaddyPowerSquare.args = { ...PaddyPowerSquare.args, name: 'paddypowersquare' };

export const SkyBetSquare = Template.bind({});
SkyBetSquare.args = { ...SkyBetSquare.args, name: 'skybetsquare' };

export const WilliamHillSquare = Template.bind({});
WilliamHillSquare.args = { ...WilliamHillSquare.args, name: 'williamhillsquare' };
