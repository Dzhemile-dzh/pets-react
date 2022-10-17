import React from 'react';
import { Constants } from '../../../../../project/constants';
import CoursesView from '../CoursesView';
import RacesView from '../RacesView';
import {
    RaceCardsObjectInterface,
    RaceCardRunnersInformationInterface,
    RaceCardsProviderInterface,
} from '../../../../interfaces';

const {
    RACE_FILTERS: {
        VIEW,
    },
} = Constants;

export interface IndexViewPropsInterface extends
    Omit<RaceCardsObjectInterface, 'allMeetings' | 'allRaces' | 'headerTitle'>,
    RaceCardRunnersInformationInterface,
    Partial<RaceCardsProviderInterface> {
    indexView: string,
    showOdds: boolean,
}

export const IndexView = ({
    date,
    indexView,
    meetings,
    races,
    firstThreeWinners,
    favouriteRunners,
    shouldDisplayTimeline,
    showOdds,
    setRaceAsNow,
}: IndexViewPropsInterface): JSX.Element => (
    indexView === VIEW.TIME ? (
        <RacesView
            races = {races}
            firstThreeWinners = {firstThreeWinners}
            favouriteRunners = {favouriteRunners}
            shouldDisplayTimeline = {shouldDisplayTimeline}
            showOdds = {showOdds}
            setRaceAsNow = {setRaceAsNow}
        />
    ) : (
        <CoursesView
            date = {date}
            meetings = {meetings}
            races = {races}
            firstThreeWinners = {firstThreeWinners}
            favouriteRunners = {favouriteRunners}
            showOdds = {showOdds}
            setRaceAsNow = {setRaceAsNow}
        />
    )
);
