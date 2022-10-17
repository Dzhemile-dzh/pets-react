import { FC } from 'react'
import CountdownLabel from '@components/base/CountdownLabel';
import { PlayIcon } from '@components/base/Icons/PlayIcon';

import { FirstThreeRaceWinnersObjectInterface, ReplayDetails } from '@components/interfaces';

import { formatHybridRaceUrlWithPrefTab } from '@project/utils/formatUtils';
import HybridConditionalLink from '@components/base/HybridConditionalLink';
import RaceWinners from '../../RaceWinners';

import styles from './MediumResult.module.scss';

interface MediumResultInterface {
    startDateTime: string;
    status: string;
    startTime: string;
    meetingName: string;
    replayDetails: ReplayDetails[];
    raceTitle: string;
    numberOfRunners: string;
    winners: FirstThreeRaceWinnersObjectInterface;
    raceId: string;
    isHandicap: boolean;
    hybridRaceUrl: string;
    raceUrl: string;
}

export const MediumResult :FC<MediumResultInterface> = ({
    startDateTime,
    status,
    startTime,
    meetingName,
    replayDetails,
    raceTitle,
    numberOfRunners,
    winners,
    raceId,
    isHandicap,
    hybridRaceUrl,
    raceUrl,
}) => (
    <HybridConditionalLink
        hybridUrl = {formatHybridRaceUrlWithPrefTab(hybridRaceUrl)}
        url = {raceUrl}
        condition
    >
        <div
            className = {styles['medium-result']}
            data-testid = {`Container__${raceId}__Result`}
        >
            <div className = {styles['medium-result__header']}>
                <aside className = {styles['medium-result__countdown']}>
                    <CountdownLabel
                        status = {status}
                        startTime = {startDateTime}
                    />
                </aside>
                <div className = {styles['medium-result__details']}>
                    <div className = {styles['medium-result__course']}>
                        <span
                            className = {styles['medium-result__course-name']}
                            data-testid = "Text__ResultItemCourseName"
                        >
                            {startTime} {meetingName}
                        </span>
                        {replayDetails && (
                            <PlayIcon
                                color = "primary"
                                size = "normal"
                                data-testid = "Icon__Replay"
                            />
                        )}
                    </div>
                    <div className = {styles['medium-result__race']}>
                        <span
                            className = {styles['medium-result__race-title']}
                            data-testid = "Text__RaceTitle"
                        >
                            {raceTitle}
                        </span>
                        <span data-testid = "Text__RunnersRan">
                            {numberOfRunners} ran
                        </span>
                    </div>
                </div>
            </div>
            <div
                className = {styles['medium-result__winners']}
                data-testid = "Container__Winners"
            >
                <RaceWinners
                    raceId = {raceId}
                    winners = {winners}
                    isHandicap = {isHandicap}
                    numberOfRunners = {numberOfRunners}
                />
            </div>
        </div>
    </HybridConditionalLink>
)
