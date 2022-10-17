import { FC } from 'react'

import CountdownLabel from '@components/base/CountdownLabel';
import { PlayIcon } from '@components/base/Icons/PlayIcon';
import { ReplayDetails } from '@components/interfaces';
import SmallCardDetails from '@components/RaceIndex/components/Cards/SmallCard/components/SmallCardDetails';

import styles from './SmallResult.module.scss';

interface SmallResultInterface {
    startDateTime: string;
    status: string;
    numberOfRunners: string;
    replayDetails: ReplayDetails[];
    raceId: string;
    startTime: string;
    meetingName: string;
    raceDetailsWinner: string;
}

export const SmallResult : FC<SmallResultInterface> = ({
    startDateTime,
    status,
    numberOfRunners,
    replayDetails,
    raceId,
    startTime,
    meetingName,
    raceDetailsWinner,
}) => (
    <div
        className = {styles['small-result']}
        data-testid = {`Container__${raceId}__Result`}
    >
        <div className = {styles['small-result__header']}>
            <aside className = {styles['small-result__countdown']}>
                <CountdownLabel
                    startTime = {startDateTime}
                    status = {status}
                />
            </aside>
            <div
                className = {styles['small-result__runners']}
                data-testid = "Container__Runners"
            >
                {numberOfRunners} Ran
                {replayDetails && (
                    <PlayIcon
                        dataTestId = {`Icon__${raceId}__RaceHeader`}
                        className = {styles['small-result__play-icon']}
                    />
                )}
            </div>
        </div>

        <SmallCardDetails
            startTime = {startTime}
            meetingName = {meetingName}
            raceDetailsWinner = {raceDetailsWinner}
        />
    </div>
)
