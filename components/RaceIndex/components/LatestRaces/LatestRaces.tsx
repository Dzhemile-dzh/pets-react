import { useMemo, FC } from 'react';

import { Actions } from '@project/common';
import { Constants } from '@project/constants';

import {
    RaceCardsRaceInterface,
    FirstThreeWinnersRunnerInterface,
    StateInterface,
} from '@components/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useBreakPoint } from '@components/contexts/BreakPointContext';
import classnames from 'classnames';
import HybridLink from '@components/base/HybridLink';
import { formatHybridRaceUrlWithPrefTab } from '@project/utils/formatUtils';
import { IS_REDIRECT_TO_RP1_ENABLED } from '@project/featureFlags';
import SmallResult from '@components/RaceIndex/components/Results/SmallResult';
import SmallCard from '@components/RaceIndex/components/Cards/SmallCard';

import styles from './LatestRaces.module.scss';

const { PAGES } = Constants;
const { RACES_COUNT, RACES_COUNT_LARGE_DESKTOP } = Constants.RACE_INDEX;
interface LatestRacesInterface {
    races: Array<RaceCardsRaceInterface>;
    racesCount?: number;
}

export const LatestRaces : FC<LatestRacesInterface> = ({
    races,
}) => {
    const { isLargeDesktop } = useBreakPoint();
    const racesCount = isLargeDesktop ? RACES_COUNT_LARGE_DESKTOP : RACES_COUNT;
    const dispatch = useDispatch();
    const offers = useSelector((state: StateInterface) => state.bookmakerOffers);
    const winners = useSelector((state: StateInterface) => state.firstThreeWinners);

    const racesToDisplay = useMemo(
        () => {
            const upcomingRaces = races.filter((race) => race.isUpcoming);
            const lastResults = races.filter((race) => race.isResult || race.isFastResult);

            if (lastResults.length === 0) {
                return upcomingRaces.slice(0, racesCount);
            }
            if (upcomingRaces.length >= racesCount - 1) {
                return [
                    lastResults[lastResults.length - 1],
                    ...upcomingRaces.slice(0, racesCount - 1),
                ];
            }
            return [...lastResults.slice(-racesCount + upcomingRaces.length), ...upcomingRaces];
        },
        [races, racesCount],
    );

    return (
        <div
            className = {styles['latest-races']}
            data-testid = "Container__LatestRaces"
        >
            {racesToDisplay.map((race) => {
                if (race.isUpcoming) {
                    const hasOffers = offers[race.raceId]?.hasOffers;
                    // eslint-disable-next-line max-len
                    const raceDetailsTitle = `${race.raceType} | ${race.numberOfRunners} runners | ${race.displayDistance}`;

                    return (
                        <HybridLink
                            key = {race.raceId}
                            hybridUrl = {formatHybridRaceUrlWithPrefTab(race.hybridRaceUrl)}
                            url = {race.raceUrl}
                            availableClassName = {classnames(
                                styles['latest-races__race'],
                                {
                                    [styles['latest-races__race--five-races']]: racesCount ===
                                    RACES_COUNT_LARGE_DESKTOP,
                                },
                            )}
                            availableDataTestId = "Link__LatestRacesRaceResult"
                        >
                            <SmallCard
                                startDateTime = {race.startDateTime}
                                status = {race.status}
                                startTime = {race.startTime}
                                meetingName = {race.meetingName}
                                hasOffers = {hasOffers}
                                raceId = {race.raceId}
                                raceDetailsTitle = {raceDetailsTitle}
                                onStatusNowUpdate = {() => dispatch(Actions.setRaceAsNow(
                                    race.ukDateFormat,
                                    race.raceId,
                                ))}
                            />
                        </HybridLink>
                    )
                }

                const firstWinner = winners?.[race.raceId]?.data
                    ?.find((winner: FirstThreeWinnersRunnerInterface) => {
                        return winner.officialPosition === '1'
                    });
                // TODO there will be another ticket for handling the fast results
                const raceUrl = race.isFastResult && !IS_REDIRECT_TO_RP1_ENABLED ?
                    `${PAGES.RESULTS}?view=time` : race.raceUrl;

                const raceDetailsWinner = firstWinner?.deadheat ?
                    'Dead-heat' : firstWinner?.horseName ? `1st - ${firstWinner?.horseName}` : '';

                return (

                    <HybridLink
                        key = {race.raceId}
                        hybridUrl = {formatHybridRaceUrlWithPrefTab(race.hybridRaceUrl)}
                        url = {raceUrl}
                        availableClassName = {classnames(
                            styles['latest-races__race'],
                            { [styles['latest-races__race--five-races']]: racesCount === RACES_COUNT_LARGE_DESKTOP },
                        )}
                        availableDataTestId = "Link__LatestRacesRaceResult"
                    >
                        <SmallResult
                            raceDetailsWinner = {raceDetailsWinner}
                            startDateTime = {race.startDateTime}
                            status = {race.status}
                            numberOfRunners = {race.numberOfRunners}
                            replayDetails = {race.replayDetails}
                            raceId = {race.raceId}
                            startTime = {race.startTime}
                            meetingName = {race.meetingName}
                        />
                    </HybridLink>
                )
            })}
        </div>
    );
}
