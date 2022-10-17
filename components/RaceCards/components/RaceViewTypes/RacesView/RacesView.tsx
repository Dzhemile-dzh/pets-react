import { FC, useMemo, Fragment } from 'react';
import { dateFormatter, compareDates } from '../../../../../project/utils';
import RaceCard from '../../RaceCard';
import {
    RaceCardsObjectInterface,
    RaceCardRunnersInformationInterface,
    RaceCardsProviderInterface,
} from '../../../../interfaces';

import styles from './RacesView.module.scss';

export interface RacesViewPropsInterface extends
    Omit<RaceCardsObjectInterface, 'allMeetings' | 'allRaces' | 'headerTitle' | 'meetings'>,
    RaceCardRunnersInformationInterface,
    Partial<RaceCardsProviderInterface> {
    showOdds: boolean,
}

export const RacesView : FC<RacesViewPropsInterface> = ({
    races,
    firstThreeWinners,
    favouriteRunners,
    shouldDisplayTimeline,
    showOdds,
    setRaceAsNow,
}) => {
    const currentTime = dateFormatter().ukISODateTimeFormat;

    const hasOneStartedRace = shouldDisplayTimeline ?
        races.some((race) => compareDates(currentTime, race.startDateTime) > 0) : false;

    const memoizedRaceView = useMemo(
        () => {
            let isTimelinePlaced = false;
            let isBeforeRace = false;

            return (
                <ul className = {styles['races-view-list']}>
                    {
                        races.length > 0 && races.map((race) => {
                            const { raceId, isResult, isFastResult } = race;

                            const firstThreeWinnersData = firstThreeWinners[raceId] || [];

                            const favouriteRunner = favouriteRunners[raceId] || {};

                            const shouldNotDisplayRaceCard = (isFastResult &&
                        firstThreeWinnersData.data?.length > 0) &&
                        firstThreeWinnersData.data
                            .every((runner) => runner.horseName && runner.saddleClothNumber &&
                        runner.officialPosition);

                            const runnersData =
                        (isResult || isFastResult) ? firstThreeWinnersData : favouriteRunner;

                            if (!isTimelinePlaced &&
                        !isBeforeRace &&
                        hasOneStartedRace &&
                        compareDates(currentTime, race.startDateTime) < 0
                            ) {
                                isBeforeRace = true;
                            }

                            const raceRow = isFastResult && !shouldNotDisplayRaceCard ? null :
                                (
                                    <Fragment key = {race.raceId}>
                                        {shouldDisplayTimeline && !isTimelinePlaced &&
                                        isBeforeRace && (
                                            <div className = {styles['races-view-list__timeline']}>
                                                <span
                                                    className = {
                                                        styles['races-view-list__timeline-text']
                                                    }
                                                >
                                                    NOW
                                                </span>
                                            </div>
                                        )}
                                        <li className = {styles['races-view-list__item']}>
                                            <RaceCard
                                                {...race}
                                                runnersData = {runnersData}
                                                showOdds = {showOdds}
                                                setRaceAsNow = {setRaceAsNow}
                                                race = {race}
                                            />
                                        </li>
                                    </Fragment>
                                )

                            if (isBeforeRace) {
                                isTimelinePlaced = true;
                            }

                            return raceRow;
                        })
                    }
                </ul>
            )
        },
        [
            currentTime,
            favouriteRunners,
            firstThreeWinners,
            hasOneStartedRace,
            races,
            setRaceAsNow,
            shouldDisplayTimeline,
            showOdds,
        ],
    )

    return memoizedRaceView;
}
