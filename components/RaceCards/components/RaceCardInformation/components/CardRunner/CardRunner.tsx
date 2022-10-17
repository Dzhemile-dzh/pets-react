import { FC } from 'react';
import Link from 'next/link';
import { isBritishCountry } from '../../../../../../project/utils/helpers';
import RunnerSilk from '../../../../../base/Silk';
import Odds from '../../../../../base/Odds';
import { generateUrl } from '../../../../../../project/utils/generateUrlQueries';
import {
    FavouriteRunnerInterface,
    OddsRaceInterface,
} from '../../../../../interfaces';
import { useBreakPoint } from '../../../../../contexts/BreakPointContext';

import styles from './CardRunner.module.scss';

export interface CardRunnerPropsInterface {
    runner: FavouriteRunnerInterface,
    race: Partial<OddsRaceInterface>,
    showOdds: boolean,
}

export const CardRunner : FC<CardRunnerPropsInterface> = ({
    runner,
    race,
    showOdds,
}) => {
    const {
        silkUrl,
        saddleClothNumber,
        horseName,
        horseProfileUrl,
        countryCode,
    } = runner;

    const { isMobile } = useBreakPoint();

    const horseProfileLink = generateUrl(`/horses/${horseProfileUrl}`, { 'race-id': race.id });

    return (
        <div
            className = {styles['card-runner']}
            data-testid = "Container__RaceCardRunner"
        >
            <div
                className = {styles['card-runner__silk']}
                data-testid = "Container__RaceCardRunnerSilk"
            >
                <RunnerSilk silkUrl = {silkUrl} />
            </div>
            <div
                className = {styles['card-runner__details']}
                data-testid = "Container__RaceCardRunnerDetails"
            >
                <div
                    data-testid = "Container__RaceCardRunnerInfo"
                    className = {styles['card-runner__info']}
                >
                    <span
                        data-testid = "Text__RaceCardSaddleClothNumber"
                    >
                        {saddleClothNumber}
                    </span>
                    <Link
                        href = {horseProfileLink}
                    >
                        <a data-testid = "Link__RaceCardRunnerName">
                            {horseName}
                            {!isBritishCountry(countryCode) && (
                                <sup
                                    className = {styles['card-runner__country']}
                                    data-testid = "Text__RaceCardRunnerCountry"
                                >
                                    {countryCode}
                                </sup>
                            )}
                        </a>
                    </Link>
                </div>
                <div
                    className = {styles['card-runner__odds']}
                    data-testid = "Container__RaceCardRunnerOdds"
                >
                    <Odds
                        runner = {runner}
                        race = {race}
                        hideHistory = {isMobile}
                        historicalOddsClassName = {styles['card-runner__odds-historical']}
                        betButtonOddsClassName = {styles['card-runner__odds-bet-button']}
                        showOdds = {showOdds}
                    />
                </div>
            </div>
        </div>
    )
}
