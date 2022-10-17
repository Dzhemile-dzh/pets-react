import { SmallCardDetailsInterface } from '@components/interfaces/Card';

import styles from './SmallCardDetails.module.scss';

export const SmallCardDetails = ({
    startTime,
    meetingName,
    raceDetailsTitle,
    raceDetailsWinner,
} : SmallCardDetailsInterface) => {
    return (
        <div
            className = {styles['small-card-details']}
            data-testid = "Container__SmallCardRaceDetails"
        >
            <span
                className = {styles['small-card-details__race-title']}
                title = {`${startTime} ${meetingName}`}
                data-testid = "Text__SmallCardRaceTimeAndMeeting"
            >
                {startTime} {meetingName}
            </span>
            <span
                className = {styles['small-card-details__race-details']}
                title = {raceDetailsTitle}
                data-testid = "Text__SmallCardRaceTypeRunnersAndDistance"
            >
                {raceDetailsTitle || raceDetailsWinner}
            </span>
        </div>
    )
}
