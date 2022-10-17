import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import dynamic from 'next/dynamic';
import styles from './BookmakerIcon.module.scss';

const Coral = dynamic(() => import('./components/Coral'));
const Ladbrokes = dynamic(() => import('./components/Ladbrokes'));
const Bet365 = dynamic(() => import('./components/Bet365'));
const Betway = dynamic(() => import('./components/Betway'));
const PaddyPower = dynamic(() => import('./components/PaddyPower'));
const Betfair = dynamic(() => import('./components/Betfair'));
const Skybet = dynamic(() => import('./components/Skybet'));
const WilliamHill = dynamic(() => import('./components/WilliamHill'));
const Tote = dynamic(() => import('./components/Tote'));
const Sport888 = dynamic(() => import('./components/Sport888'));
const WilliamHillWhiteBackground = dynamic(() => import('./components/WilliamHillWhiteBackground'));
const CoralWhiteBackground = dynamic(() => import('./components/CoralWhiteBackground'));
const BetwayWhiteBackground = dynamic(() => import('./components/BetwayWhiteBackground'));
const LadbrokesWhiteBackground = dynamic(() => import('./components/LadbrokesWhiteBackground'));
const Bet365WhiteBackground = dynamic(() => import('./components/Bet365WhiteBackground'));
const PaddyPowerWhiteBackground = dynamic(() => import('./components/PaddyPowerWhiteBackground'));
const BestOddsBookmaker = dynamic(() => import('./components/BestOddsBookmaker'));
const Bet365Square = dynamic(() => import('./components/Bet365Square'));
const CoralSquare = dynamic(() => import('./components/CoralSquare'));
const BetFairSquare = dynamic(() => import('./components/BetFairSquare'));
const LadbrokesSquare = dynamic(() => import('./components/LadbrokesSquare'));
const PaddyPowerSquare = dynamic(() => import('./components/PaddyPowerSquare'));
const SkyBetSquare = dynamic(() => import('./components/SkybetSquare'));
const WilliamHillSquare = dynamic(() => import('./components/WilliamHillSquare'));
const Sport888Square = dynamic(() => import('./components/Sport888Square'));
const ToteSquare = dynamic(() => import('./components/ToteSquare'));

const ICON_COMPONENTS = {
    bestoddsbookmaker: BestOddsBookmaker, // return with bookmakers
    coral: Coral,
    bet365: Bet365,
    ladbrokes: Ladbrokes,
    betway: Betway,
    paddypower: PaddyPower,
    betfair: Betfair,
    skybet: Skybet,
    williamhill: WilliamHill,
    tote: Tote,
    '888sport': Sport888,

    bet365square: Bet365Square,
    betfairsquare: BetFairSquare,
    coralsquare: CoralSquare,
    ladbrokessquare: LadbrokesSquare,
    paddypowersquare: PaddyPowerSquare,
    skybetsquare: SkyBetSquare,
    williamhillsquare: WilliamHillSquare,
    totesquare: ToteSquare,
    '888sportsquare': Sport888Square,

    williamhillwhitebackground: WilliamHillWhiteBackground,
    coralwhitebackground: CoralWhiteBackground,
    betwaywhitebackground: BetwayWhiteBackground,
    ladbrokeswhitebackground: LadbrokesWhiteBackground,
    bet365whitebackground: Bet365WhiteBackground,
    paddypowerwhitebackground: PaddyPowerWhiteBackground,
    betfairwhitebackground: Betfair,
    skybetwhitebackground: Skybet,
    totewhitebackground: Tote,
    '888sportwhitebackground': Sport888,
}

export class BookmakerIcon extends PureComponent {
    render() {
        const {
            className, name, size, color, transform, ...rest
        } = this.props;
        const sizeSelector = size ? styles[`ui-icon--${size}`] : '';
        const colorSelector = color ? styles[`ui-icon--${color}`] : '';
        const iconName = styles[`ui-icon__${name}`];
        const transformSelector = transform ? styles[`ui-icon__${transform}`] : '';

        if (!ICON_COMPONENTS[name]) {
            throw new Error(`"${name}" is missing in icons list`);
        }
        const IconComponent = ICON_COMPONENTS[name];

        return (
            <IconComponent
                className = {
                    classnames(
                        styles['ui-icon'],
                        className,
                        sizeSelector,
                        colorSelector,
                        iconName,
                        transformSelector,
                    )
                }
                {...rest}
            />
        )
    }
}

BookmakerIcon.propTypes = {
    className: propTypes.string,
    name: propTypes.string.isRequired,
    size: propTypes.string,
    color: propTypes.string,
    transform: propTypes.string,
    dataTestId: propTypes.string,
}

BookmakerIcon.displayName = 'Icon';
