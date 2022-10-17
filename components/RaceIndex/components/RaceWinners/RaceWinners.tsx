import { useMemo, FC } from 'react'
import classnames from 'classnames';
import { subscript } from '@project/utils/subscriptUtils';
import { isBritishCountry } from '@project/utils/helpers';
import RunnerSilk from '@components/base/Silk';

import { FirstThreeRaceWinnersObjectInterface } from '@components/interfaces';
import styles from './RaceWinners.module.scss';

interface RaceWinnersInterface {
    raceId: string;
    isHandicap: boolean;
    numberOfRunners: string;
    winners: FirstThreeRaceWinnersObjectInterface
}

export const RaceWinners : FC<RaceWinnersInterface> = ({
    raceId,
    winners,
    isHandicap,
    numberOfRunners,
}) => {
    const raceResultsData = useMemo(() => {
        let horsePositionsData = [];

        if (!winners || !winners.data) {
            return horsePositionsData;
        }

        // Note:
        // For handicap races, max horses shown must be 5 for dead-heats and 4 for non dead-heats
        // For non-handicap, max horses shown must be 4 for dead-heats and 3 for non dead-heats
        // For non-handicap, if there are two 3rd places with dead-heats, show 4 results again
        const hasDeadHeatPosition = winners.data.some((horse) => horse.deadheat);
        const twoThirdPositions = winners.data.filter(
            (horse) => horse.deadheat && horse.officialPosition === '3',
        ).length;

        if (isHandicap && Number.parseInt(numberOfRunners) > 15 && hasDeadHeatPosition) {
            horsePositionsData = winners.data.slice(0, 5);
        } else if (
            (isHandicap && Number.parseInt(numberOfRunners) > 15 && !hasDeadHeatPosition) ||
            (hasDeadHeatPosition && twoThirdPositions)
        ) {
            horsePositionsData = winners.data.slice(0, 4);
        } else {
            horsePositionsData = winners.data.slice(0, 3);
        }

        return horsePositionsData;
    }, [winners, isHandicap, numberOfRunners]);

    return (
        <ul
            className = {styles['race-winners']}
            data-testid = {`List__${raceId}__Winners`}
        >
            {raceResultsData.map(({
                horseId,
                officialPosition,
                silkUrl,
                saddleClothNumber,
                horseName,
                countryCode,
                isFavourite,
                startingPrice,
            }) => (
                <li
                    // if its a fast result we don't receive horseId
                    key = {horseId || horseName}
                    className = {classnames(
                        styles['race-winners__runner'],
                        {
                            [styles['race-winners__runner--first']]: officialPosition === '1',
                        },
                    )}
                    data-testid = {`ListItem__${horseId ||
                        horseName}__${officialPosition === '1' && 'First'}Winner`}
                >
                    <div className = {styles['race-winners__runner-details']}>
                        <div className = {styles['race-winners__position']}>
                            <span
                                className = {styles['race-winners__position-text']}
                                data-testid = "Text__OfficialPosition"
                            >
                                {officialPosition}
                            </span>
                            <span
                                className = {styles['race-winners__subscript']}
                                data-testid = "Text__Subscript"
                            >
                                {subscript(officialPosition)}
                            </span>
                        </div>
                        <div
                            className = {styles['race-winners__silk']}
                            data-testid = "Container__ResultRaceSilk"
                        >
                            <RunnerSilk silkUrl = {silkUrl} />
                        </div>
                        <div className = {styles['race-winners__info']}>
                            <span
                                className = {styles['race-winners__saddlecloth-number']}
                                data-testid = "Text__SaddleClothNumber"
                            >
                                {saddleClothNumber}
                            </span>
                            <span
                                className = {styles['race-winners__runner-name']}
                                data-testid = "Text__RunnerName"
                            >
                                {horseName}
                            </span>
                            {
                                !isBritishCountry(countryCode) && (
                                    <sup
                                        className = {styles['race-winners__runner-country']}
                                        data-testid = "Text__ResultRaceCountryCode"
                                    >
                                        {countryCode}
                                    </sup>
                                )
                            }
                        </div>
                    </div>
                    <div className = {styles['race-winners__odds']}>
                        {isFavourite && (
                            <span
                                className = {styles['race-winners__favourite']}
                                data-testid = "Text__Favourite"
                            >
                                fav
                            </span>
                        )}
                        <span
                            className = {styles['race-winners__starting-price']}
                            data-testid = "Text__StartingPrice"
                        >
                            {startingPrice === '1/1' ? 'Evens' : startingPrice}
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    )
}
