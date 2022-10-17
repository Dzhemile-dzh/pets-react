import { FC } from 'react'
import moment from 'moment';
import { Constants } from '@project/constants';

import styles from './RacingWillResumeMessage.module.scss';

const { DATE_FORMATS: { MMMM_DD } } = Constants;

export const RacingWillResumeMessage : FC<{raceDate: string}> = ({ raceDate }) => (
    <div
        className = {styles['racing-matrix__no-racing']}
        data-testid = "Container__RacingMatrixNoRacingToday"
    >
        <div className = {styles['racing-matrix__no-racing-title']}>
            No racing scheduled for today
        </div>
        <div className = {styles['racing-matrix__no-racing-subtitle']}>
            Racing will resume {moment(raceDate).format(MMMM_DD)}
        </div>
    </div>
)
