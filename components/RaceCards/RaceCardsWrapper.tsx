import React from 'react';
import { RaceCards, RaceCardsInterface } from './RaceCards';
import { withFilters } from '../../store/providers';
import { RaceCardsWrapperInterface } from '../interfaces'

const RaceCardsWrapper = ({
    date,
    shouldDisplayTimeline,
    route,
    shouldSubscribeForFastResults,
    ...rest
}: RaceCardsWrapperInterface) : React.ReactElement => (
    <RaceCards
        date = {date}
        shouldDisplayTimeline = {shouldDisplayTimeline}
        route = {route}
        shouldSubscribeForFastResults = {shouldSubscribeForFastResults}
        {...rest as RaceCardsInterface}
    />
);

export default withFilters(
    RaceCardsWrapper,
    ['filters'],
    null,
)
