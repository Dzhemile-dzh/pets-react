import React, { memo } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import {
    RaceCardInformationInterface,
    RaceInterface,
} from 'components/interfaces';
import CardRunner from '@components/RaceCards/components/RaceCardInformation/components/CardRunner';
// eslint-disable-next-line max-len
import StreamProviders from '@components/RaceCards/components/RaceCardInformation/components/StreamProviders';

import { useBreakPoint } from '@components/contexts/BreakPointContext';
import styles from './RaceCardInformation.module.scss';

export interface RaceCardInformationPropsInterface extends
    RaceCardInformationInterface,
    Omit<RaceInterface, 'countryCode' | 'date' | 'bettingReturns'|
    'raceTitle' | 'runners'| 'startTime' | 'countDown' |
    'meetingName' | 'meetingId' | 'status' | 'diffusionMeetingName' |
    'utcTime' | 'localTime' | 'raceLocalTime' | 'category' |
    'raceType' | 'surfaceType' | 'hybridRaceUrl'> {
    showOdds: boolean,
}

export const RaceCardInformation = memo(({
    going,
    raceClass,
    distance,
    numberOfRunners,
    liveOn,
    favouriteRunner,
    race,
    raceUrl,
    raceTypeDescriptionText,
    isAbandoned,
    showOdds,
}: RaceCardInformationPropsInterface): JSX.Element => {
    const { isMobile } = useBreakPoint();

    const raceDetails = (
        !isMobile ? (
            <>
                <div
                    className = {styles['race-card__information-details-row']}
                    data-testid = "Container__RaceCardDetailsRow"
                >
                    <p data-testid = "Text__RaceCardRaceTypeSurfaceType">
                        {raceTypeDescriptionText}
                    </p>
                </div>
                <div
                    className = {styles['race-card__information-details-row']}
                    data-testid = "Container__RaceCardDetailsRow"
                >
                    <p data-testid = "Text__RaceCardDistance">
                        <span>Distance:</span> {distance}
                    </p>
                    <p data-testid = "Text__RaceCardGoing">
                        Going: {going}
                    </p>
                </div>
                <div
                    className = {styles['race-card__information-details-row']}
                    data-testid = "Container__RaceCardDetailsRow"
                >
                    <p data-testid = "Text__RaceCardRunners">
                        <span>Runners:</span>
                        {' '}
                        {numberOfRunners}
                    </p>
                    <p data-testid = "Text__RaceCardClass">
                        <span>Class:</span> {raceClass}
                    </p>
                    <StreamProviders liveOn = {liveOn} />
                </div>
            </>
        ) : (
            <>
                <div
                    className = {styles['race-card__information-details-row']}
                    data-testid = "Container__RaceCardDetailsRow"
                >
                    <p data-testid = "Text__RaceCardRaceTypeSurfaceType">
                        {raceTypeDescriptionText}
                    </p>
                    <p data-testid = "Text__RaceCardClass">
                        <span>Class:</span> {raceClass}
                    </p>
                </div>
                <div
                    className = {styles['race-card__information-details-row']}
                    data-testid = "Container__RaceCardDetailsRow"
                >
                    <p data-testid = "Text__RaceCardGoing">
                        <span>Going:</span> {going}
                    </p>
                    <p data-testid = "Text__RaceCardDistance">
                        <span>Distance:</span> {distance}
                    </p>
                </div>
                <div
                    className = {styles['race-card__information-details-row']}
                    data-testid = "Container__RaceCardDetailsRow"
                >
                    <p data-testid = "Text__RaceCardRunners">
                        <span>Runners:</span> {numberOfRunners}
                    </p>
                    <StreamProviders liveOn = {liveOn} />
                </div>
            </>
        )
    )

    return (
        <div
            className = {classnames(
                styles['race-card__information'],
                {
                    [styles['race-card__information-abandoned']]: isAbandoned,
                },
            )}
            data-testid = "Container__RaceCardInformation"
        >
            {isAbandoned ? (
                <span
                    className = {styles['race-card__abandoned']}
                    data-testid = "Text__RaceCardAbandoned"
                >
                    abandoned
                </span>
            ) : (
                <>
                    <Link href = {raceUrl}>
                        <a
                            className = {styles['race-container__selectable']}
                            data-testid = "Link__RaceCardDetails"
                        >
                            {raceDetails}
                        </a>
                    </Link>
                    {favouriteRunner.data && (
                        <CardRunner
                            runner = {favouriteRunner.data}
                            race = {race}
                            showOdds = {showOdds}
                        />
                    )}
                </>
            )}
        </div>
    )
})

RaceCardInformation.displayName = 'RaceCardInformation';
