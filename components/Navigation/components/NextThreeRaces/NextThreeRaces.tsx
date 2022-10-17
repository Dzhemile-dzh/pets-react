import React, { useMemo } from 'react';
import Link from 'next/link';
import { ChevronIcon } from '../../../base/Icons/ChevronIcon';

import { NextThreeRacesProviderInterface } from '../../../interfaces';
import styles from './NextThreeRaces.module.scss';

export const NextThreeRaces = ({ nextThreeRacesData }: Omit<NextThreeRacesProviderInterface,
'getNextThreeRaces' | 'isNextThreeRacesLoading' | 'nextThreeRacesError'
>) : JSX.Element => {
    const nextThreeRaces = useMemo(() => {
        return nextThreeRacesData.map((race, index) => {
            return (
                <div key = {index} data-testid = {`Container__${index}__NextThreeRacesItem`}>
                    <Link href = {race.raceUrl}>
                        <a data-testid = "Button__NextThreeRacesItem">
                            <span className = {styles['next-three-races__link']}>
                                <div
                                    className = {styles['next-three-races__link-title']}
                                    data-testid = "Text__NextThreeRacesItem"
                                >
                                    {`${race.startTime} ${race.venueName}`}
                                </div>

                                <ChevronIcon
                                    size = "normal"
                                    color = "primary"
                                    className = {styles['next-three-races__chevron-icon']}
                                />
                            </span>
                        </a>
                    </Link>
                    <div
                        className = {styles['next-three-races__divider']}
                        data-testid = {`Divider__${index}__NextThreeRacesButtons`}
                    />
                </div>
            )
        })
    }, [nextThreeRacesData])

    return (
        <div className = {styles['next-three-races']} data-testid = "Dropdown__NextThreeRaces">
            {nextThreeRaces}

            <div
                className = {styles['next-three-races__link']}
                data-testid = "Container__TodaysBigRace"
            >
                <span
                    className = {styles['next-three-races__link-title']}
                    data-testid = "Text__TodaysBigRace"
                >
                    TODAY'S BIG RACE
                </span>
                <ChevronIcon
                    size = "normal"
                    color = "primary"
                    className = {styles['next-three-races__chevron-icon']}
                />
            </div>

            <div
                className = {styles['next-three-races__divider']}
                data-testid = {`Divider__${nextThreeRacesData.length}__NextThreeRaces`}
            />
            <Link href = "/today">
                <a
                    className = {styles['next-three-races__link-title']}
                    data-testid = "Button__TodaysRacesAndResults"
                >
                    <span className = {styles['next-three-races__link']}>
                        <div
                            className = {styles['next-three-races__link-title']}
                            data-testid = "Text__TodaysRacesAndResults"
                        >
                            TODAY'S RACES AND RESULTS
                        </div>

                        <ChevronIcon
                            size = "normal"
                            color = "primary"
                            className = {styles['next-three-races__chevron-icon']}
                        />
                    </span>
                </a>
            </Link>
        </div>
    )
}

NextThreeRaces.displayName = 'NextThreeRaces'
