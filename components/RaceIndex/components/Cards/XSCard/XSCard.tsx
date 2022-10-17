import { FC } from 'react'

import CountdownLabel from '@components/base/CountdownLabel';

import styles from './XSCard.module.scss';

interface XSCardInterface {
    raceDetailsTitle: string;
    startDateTime: string;
    status: string;
    startTime: string;
    meetingName: string;
    raceId: string;
    onStatusNowUpdate: () => void;
}

export const XSCard : FC<XSCardInterface> = ({
    startDateTime,
    status,
    startTime,
    meetingName,
    raceDetailsTitle,
    raceId,
    onStatusNowUpdate,
}) => (
    <div
        className = {styles.xscard}
        data-testid = {`Container__${raceId}__XSCard`}
    >
        <div className = {styles.xscard__header}>
            <aside className = {styles.xscard__countdown}>
                <CountdownLabel
                    startTime = {startDateTime}
                    status = {status}
                    onStatusNowUpdate = {onStatusNowUpdate}
                />
            </aside>
        </div>
        <span
            className = {styles['xscard__race-title']}
            title = {`${startTime} ${meetingName}`}
            data-testid = "Text__RaceTimeAndMeeting"
        >
            {startTime} {meetingName}
        </span>
        <span
            className = {styles['xscard__race-details']}
            title = {raceDetailsTitle}
            data-testid = "Text__RaceTypeRunnersAndDistance"
        >
            {raceDetailsTitle}
        </span>
    </div>
)
