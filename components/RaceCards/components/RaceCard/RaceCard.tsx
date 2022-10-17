import { FC, memo, useMemo } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { ChevronIcon } from '../../../base/Icons/ChevronIcon';
import { PlayIcon } from '../../../base/Icons/PlayIcon';
import CountdownLabel from '../../../base/CountdownLabel';
import ResultRaceInformation from '../ResultRaceInformation';
import RaceCardInformation from '../RaceCardInformation';
import { OddsRaceInterface, RaceCardsRaceInterface, RaceInterface } from '../../../interfaces';

import { useBreakPoint } from '../../../contexts/BreakPointContext';
import styles from './RaceCard.module.scss';

export interface RaceCardPropsInterface extends RaceInterface {
    runnersData: {
        data: never;
        error: string;
        isLoading: boolean;
    },
    showOdds: boolean;
}

interface RaceContainerInterface extends RaceCardsRaceInterface {
    isCountdownAvailable: boolean;
    setRaceAsNow: (date: string, raceId: string) => void;
    isMobile: boolean;
}

const RaceContainer : FC<Partial<RaceContainerInterface>> = memo(({
    isCountdownAvailable,
    isAbandoned,
    status,
    startDateTime,
    isFastResult,
    setRaceAsNow,
    startTime,
    meetingName,
    isMobile,
    isResult,
    raceTitle,
    raceTypeDescriptionText,
    displayDistance,
    raceClass,
    raceId,
    ukDateFormat,
}) => (
    <div
        className = {styles['race-container__wrapper']}
        data-testid = "Container__RaceCardRace"
    >
        {isCountdownAvailable && !isAbandoned && (
            <aside
                className = {styles['race-container__countdown']}
                data-testid = "Container__CountdownLabelWrapper"
            >
                <CountdownLabel
                    status = {status}
                    startTime = {startDateTime}
                    testIdPrefix = "RaceCard"
                    onStatusNowUpdate = {() => setRaceAsNow(ukDateFormat, raceId)}
                />
            </aside>
        )}
        <div
            className = {styles['race-container__main']}
            data-testid = "Container__RaceCardRaceMain"
        >
            <span
                className = {styles['race-container__race-time']}
                data-testid = "Text__RaceCardTime"
            >
                {startTime}
            </span>
            <div
                className = {styles['race-container__meeting-race']}
                data-testid = "Container__RaceCardMeetingRace"
            >
                <span
                    className = {styles['race-container__meeting']}
                    title = {meetingName}
                    data-testid = "Text__RaceCardMeetingName"
                >
                    {meetingName}
                    {!isMobile && (isResult || isFastResult) && !isAbandoned && (
                        <div
                            className = {styles['race-container__title-chevron']}
                            data-testid = "Container__RaceCardChevron"
                        >
                            <ChevronIcon
                                color = "primary"
                                size = "small"
                            />
                        </div>
                    )}
                </span>
            </div>
            {!isAbandoned && (
                <div
                    className = {styles['race-container__description']}
                    data-testid = "Container__RaceCardMeetingDescription"
                >
                    <span
                        className = {styles['race-container__title']}
                        title = {raceTitle}
                        data-testid = "Text__RaceCardMeetingTitle"
                    >
                        {raceTitle}
                    </span>
                    {!isMobile && (isResult || isFastResult) && (
                        <div
                            className = {styles['race-container__type-description']}
                            data-testid = "Container__RaceCardMeetingTypeDescription"
                        >
                            <span data-testid = "Text__RaceCardMeetingDescription">
                                {raceTypeDescriptionText}
                            </span>
                            <span data-testid = "Text__RaceCardMeetingDistance">
                                Distance: {displayDistance}
                            </span>
                            <span data-testid = "Text__RaceCardMeetingRaceClass">
                                Class: {raceClass}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
))

RaceContainer.displayName = 'RaceContainer';

const RaceLink : FC<Partial<RaceContainerInterface>> = memo(({
    isAbandoned,
    raceId,
    raceUrl,
    isResult,
    isFastResult,
    replayDetails,
    numberOfRunners,
    isCountdownAvailable,
    status,
    startDateTime,
    ukDateFormat,
    setRaceAsNow,
    startTime,
    meetingName,
    isMobile,
    raceTitle,
    raceTypeDescriptionText,
    displayDistance,
    raceClass,
}) => {
    return isAbandoned ? (
        <RaceContainer
            isCountdownAvailable = {isCountdownAvailable}
            isAbandoned = {isAbandoned}
            status = {status}
            startDateTime = {startDateTime}
            isFastResult = {isFastResult}
            ukDateFormat = {ukDateFormat}
            raceId = {raceId}
            setRaceAsNow = {setRaceAsNow}
            startTime = {startTime}
            meetingName = {meetingName}
            isMobile = {isMobile}
            isResult = {isResult}
            raceTitle = {raceTitle}
            raceTypeDescriptionText = {raceTypeDescriptionText}
            displayDistance = {displayDistance}
            raceClass = {raceClass}
        />
    ) :
        (
            <div className = {styles['race-container__race-description']}>
                <Link
                    key = {raceId}
                    href = {raceUrl}
                >
                    <a
                        className = {styles['race-container__selectable']}
                        data-testid = "Container__RaceCardContentSelectable"
                    >
                        <RaceContainer
                            isCountdownAvailable = {isCountdownAvailable}
                            isAbandoned = {isAbandoned}
                            status = {status}
                            startDateTime = {startDateTime}
                            isFastResult = {isFastResult}
                            ukDateFormat = {ukDateFormat}
                            raceId = {raceId}
                            setRaceAsNow = {setRaceAsNow}
                            startTime = {startTime}
                            meetingName = {meetingName}
                            isMobile = {isMobile}
                            isResult = {isResult}
                            raceTitle = {raceTitle}
                            raceTypeDescriptionText = {raceTypeDescriptionText}
                            displayDistance = {displayDistance}
                            raceClass = {raceClass}
                        />
                    </a>
                </Link>
                {(isResult || isFastResult) && (
                    <div
                        className = {styles['race-container__play-video']}
                        data-testid = "Container__RaceCardPlayVideo"
                    >
                        {replayDetails && (
                            <PlayIcon
                                color = "primary"
                                size = "normal"
                            />
                        )}
                        {numberOfRunners && (
                            <span data-testid = "Text__RaceCardNumberOfRunners">
                                {numberOfRunners} ran
                            </span>
                        )}
                    </div>
                )}
            </div>
        )
})
RaceLink.displayName = 'RaceLink';

interface RaceCardsInterface extends RaceCardPropsInterface {
    setRaceAsNow: (date: string, raceId: string) => void;
    ukDateFormat: string;
    race: Partial<OddsRaceInterface>;
}

export const RaceCard : FC<Partial<RaceCardsInterface>> = memo(({
    raceId,
    isResult,
    isFastResult,
    runnersData,
    status,
    startTime,
    raceTitle,
    meetingName,
    going,
    raceClass,
    displayDistance,
    ageRestriction,
    numberOfRunners,
    ratingBand,
    liveOn,
    raceUrl,
    bettingReturns,
    startDateTime,
    isAbandoned,
    isHandicap,
    raceTypeDescriptionText,
    replayDetails,
    showOdds,
    ukDateFormat,
    setRaceAsNow,
    race,
}) => {
    const mobileDistanceClass = useMemo(() => {
        if (!displayDistance && !raceClass) {
        // Note:
        // We need to return empty space, since the display distance-class is first child
        // And if its missing, different field will
        // be the first one (in our case numberOfRunners)
            return ' ';
        }

        const displayRaceClass = raceClass ? `Class ${raceClass}` : '';

        return [displayDistance, displayRaceClass].filter((item) => item !== '').join(', ');
    }, [displayDistance, raceClass])

    const isCountdownAvailable = status !== 'official' &&
        status !== 'abandoned';

    const { isMobile } = useBreakPoint();

    const containerClassName = classnames(
        styles['race-container'],
        {
            [styles['race-container--result']]: (isResult || isFastResult),
        },
        {
            [styles['race-container--abandoned']]: isAbandoned,
        },
    );

    return (
        <div
            className = {containerClassName}
            data-testid = {`Container__${raceId}__RaceCard`}
        >
            <RaceLink
                isAbandoned = {isAbandoned}
                raceId = {raceId}
                raceUrl = {raceUrl}
                isResult = {isResult}
                isFastResult = {isFastResult}
                replayDetails = {replayDetails}
                numberOfRunners = {numberOfRunners}
                isCountdownAvailable = {isCountdownAvailable}
                status = {status}
                startDateTime = {startDateTime}
                ukDateFormat = {ukDateFormat}
                setRaceAsNow = {setRaceAsNow}
                startTime = {startTime}
                meetingName = {meetingName}
                isMobile = {isMobile}
                raceTitle = {raceTitle}
                raceTypeDescriptionText = {raceTypeDescriptionText}
                displayDistance = {displayDistance}
                raceClass = {raceClass}
            />
            {isResult || isFastResult ? (
                <ResultRaceInformation
                    raceId = {raceId}
                    horsePositionResults = {runnersData}
                    bettingReturns = {bettingReturns}
                    isHandicap = {isHandicap}
                    isAbandoned = {isAbandoned}
                    numberOfRunners = {numberOfRunners}
                />
            ) : (
                <RaceCardInformation
                    race = {race}
                    going = {going}
                    raceClass = {raceClass}
                    ageRestriction = {ageRestriction}
                    distance = {displayDistance}
                    numberOfRunners = {numberOfRunners}
                    ratingBand = {ratingBand}
                    liveOn = {liveOn}
                    favouriteRunner = {runnersData}
                    mobileDistanceClass = {mobileDistanceClass}
                    raceId = {raceId}
                    isResult = {isResult}
                    raceUrl = {raceUrl}
                    raceTypeDescriptionText = {raceTypeDescriptionText}
                    isAbandoned = {isAbandoned}
                    showOdds = {showOdds}
                />
            )}
        </div>
    )
})
RaceCard.displayName = 'RaceCard';
