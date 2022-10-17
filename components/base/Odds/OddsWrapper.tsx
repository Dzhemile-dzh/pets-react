import React from 'react';
import { withOdd, withBetSlip } from '@store/providers';
import { Odds } from './Odds';

import { OddsWrapperInterface, OddsInterface } from '../../interfaces';

const OddsWrapper = ({
    race,
    runner,
    shouldShowFavLabel,
    showCompareOdds,
    ...rest
}: OddsWrapperInterface) => (
    <Odds
        race = {race}
        runner = {runner}
        shouldShowFavLabel = {shouldShowFavLabel}
        showCompareOdds = {showCompareOdds}
        {...rest as OddsInterface}
    />
)

const OddsWrapperWithBetSlip = withBetSlip(
    OddsWrapper,
    ['selectedBookmaker', 'betSelectionsCount', 'betOptions'],
    null,
);

export default withOdd(
    OddsWrapperWithBetSlip,
    ['betSelection', 'isDiffusionLoaded', 'isInBetslip', 'priceData', 'priceType'],
    null,
);
