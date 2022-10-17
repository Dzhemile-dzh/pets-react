import { FC } from 'react'
import { Constants } from '@project/constants';
import { useBreakPoint } from '@components/contexts/BreakPointContext';
import {
    RaceCardsMeetingInterface,
    RaceCardsRaceInterface,
    StateInterface,
} from '@components/interfaces';
import { useSelector } from 'react-redux';
import MatrixMeeting from '../MatrixMeeting';

import styles from './RaceMatrix.module.scss';

const {
    PAGE_SIZE_TABLET,
    PAGE_SIZE_SMALL_DESKTOP,
    PAGE_SIZE_LARGE_DESKTOP,
} = Constants.RACE_MATRIX_PAGE_SIZES;

interface RaceMatrixInterface {
    meetings: RaceCardsMeetingInterface[];
    races: RaceCardsRaceInterface[];
}

export const RaceMatrix : FC<RaceMatrixInterface> = ({ meetings, races }) => {
    const { isTablet, isSmallDesktop } = useBreakPoint();
    const offers = useSelector((state: StateInterface) => state.bookmakerOffers)

    const pageSize = (
        (isTablet && PAGE_SIZE_TABLET) ||
        (isSmallDesktop && PAGE_SIZE_SMALL_DESKTOP) ||
        PAGE_SIZE_LARGE_DESKTOP
    )
    return (
        <div className = {styles['race-matrix']}>
            {
                meetings.map((meeting) => {
                    return (
                        <MatrixMeeting
                            key = {meeting.meetingId}
                            meeting = {meeting}
                            races = {races}
                            offers = {offers}
                            pageSize = {pageSize}
                        />
                    )
                })
            }
        </div>
    )
}
