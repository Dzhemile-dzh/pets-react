import React, { useMemo } from 'react'
import Link from 'next/link';
import classnames from 'classnames';
import { isBritishCountry } from '../../../../project/utils/helpers';
import { subscript } from '../../../../project/utils/subscriptUtils';
import { generateUrl } from '../../../../project/utils/generateUrlQueries';
import RunnerSilk from '../../../base/Silk';
import {
    FirstThreeRaceWinnersObjectInterface,
    BettingReturnsInterface,
} from '../../../interfaces';
import BettingReturns from '../BettingReturns';

import { useBreakPoint } from '../../../contexts/BreakPointContext';
import styles from './ResultRaceInformation.module.scss';

interface ResultRaceInformationInterface extends BettingReturnsInterface {
    raceId: string,
    horsePositionResults: FirstThreeRaceWinnersObjectInterface;
    isHandicap: boolean,
    isAbandoned: boolean,
    numberOfRunners: string,
}

export const ResultRaceInformation = ({
    raceId,
    bettingReturns,
    horsePositionResults,
    isHandicap,
    isAbandoned,
    numberOfRunners,
} : ResultRaceInformationInterface) : React.ReactElement => {
    const { isMobile } = useBreakPoint();

    const raceResultsData = useMemo(() => {
        let horsePositionsData = [];

        if (!horsePositionResults || !horsePositionResults.data) {
            return horsePositionsData;
        }

        // Note:
        // For handicap races, max horses shown must be 5 for dead-heats and 4 for non dead-heats
        // For non-handicap, max horses shown must be 4 for dead-heats and 3 for non dead-heats
        // For non-handicap, if there are two 3rd places with dead-heats, show 4 results again
        const hasDeadHeatPosition = horsePositionResults.data.some((horse) => horse.deadheat);
        const twoThirdPositions = horsePositionResults.data.filter(
            (horse) => horse.deadheat && horse.officialPosition === '3',
        ).length;

        if (isHandicap && Number.parseInt(numberOfRunners) > 15 && hasDeadHeatPosition) {
            horsePositionsData = horsePositionResults.data.slice(0, 5);
        } else if (
            (isHandicap && Number.parseInt(numberOfRunners) > 15 && !hasDeadHeatPosition) ||
            (hasDeadHeatPosition && twoThirdPositions)
        ) {
            horsePositionsData = horsePositionResults.data.slice(0, 4);
        } else {
            horsePositionsData = horsePositionResults.data.slice(0, 3);
        }

        return horsePositionsData;
    }, [horsePositionResults, isHandicap, numberOfRunners]);

    return (
        <div
            className = {classnames(
                styles['result-race__information'],
                {
                    [styles['result-race__information-abandoned']]: isAbandoned,
                },
            )}
            data-testid = "Container__ResultRaceInformation"
        >
            {isAbandoned ? (
                <span
                    className = {styles['result-race__abandoned']}
                    data-testid = "Text__ResultRaceAbandoned"
                >
                    abandoned
                </span>
            ) : (
                <>
                    <ul
                        className = {styles['result-race__list-horse-positions']}
                        data-testid = "Container__ResultRaceListHorsePositions"
                    >
                        {raceResultsData.map((horse, index) => {
                            const horseProfileLink = generateUrl(
                                `/horses/${horse.horseProfileUrl}`,
                                { 'race-id': raceId },
                            );

                            return (
                                <li
                                    key = {`${horse.horseId}${index}`}
                                    className = {classnames(horse.officialPosition === '1' &&
                                            styles['result-race__winner'])}
                                    data-testid = "Container__ResultRaceItem"
                                >
                                    <div
                                        className = {styles['result-race__left-side']}
                                        data-testid = "Container__ResultRaceLeftSide"
                                    >
                                        <div
                                            className = {styles['result-race__position']}
                                            data-testid = "Container__ResultRaceOfficialPosition"
                                        >
                                            <span data-testid = "Text__ResultRaceOfficialPosition">
                                                {horse.officialPosition}
                                            </span>
                                            <span data-testid = "Text__ResultRaceSubscript">
                                                {subscript(horse.officialPosition)}
                                            </span>
                                        </div>
                                        <span
                                            className = {styles['result-race__silk']}
                                            data-testid = "Container__ResultRaceSilk"
                                        >
                                            <RunnerSilk silkUrl = {horse.silkUrl} />
                                        </span>
                                        <span
                                            className = {
                                                styles['result-race__horse-number-name']
                                            }
                                            data-testid = "Text__ResultRaceHorseNumberName"
                                        >
                                            {horse.saddleClothNumber}
                                            <Link href = {horseProfileLink}>
                                                <a data-testid = "Link__ResultRaceHorseName">
                                                    {horse.horseName}
                                                    <sup
                                                        data-testid = "Text__ResultRaceCountryCode"
                                                    >
                                                        {!isBritishCountry(horse.countryCode) && (
                                                            horse.countryCode
                                                        )}
                                                    </sup>
                                                </a>
                                            </Link>
                                        </span>
                                    </div>
                                    <div
                                        className = {styles['result-race__right-side']}
                                        data-testid = "Container__ResultRaceRightSide"
                                    >
                                        {horse.isFavourite && (
                                            <span
                                                className = {styles['result-race__favourite']}
                                                data-testid = "Text__ResultRaceFavourite"
                                            >
                                                fav
                                            </span>
                                        )}
                                        <span
                                            className = {styles['result-race__starting-price']}
                                            data-testid = "Text__ResultRaceStartingPrice"
                                        >
                                            {horse.startingPrice}
                                        </span>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    {!isMobile && (
                        <BettingReturns
                            bettingReturns = {bettingReturns}
                        />
                    )}
                </>
            )}
        </div>
    )
}

ResultRaceInformation.displayName = 'ResultRaceInformation';
