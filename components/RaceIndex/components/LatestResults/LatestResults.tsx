import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';

import { RaceCardsRaceInterface, StateInterface } from '@components/interfaces';

import Container from '@components/Layouts/Container';
import MediumResult from '@components/RaceIndex/components/Results/MediumResult';

import styles from './LatestResults.module.scss';
import 'swiper/swiper.min.css';

interface LatestResultsInterface {
    allRaces: RaceCardsRaceInterface[];
}

export const LatestResults : FC<LatestResultsInterface> = ({ allRaces = [] }) => {
    const allWinners = useSelector((state: StateInterface) => state.firstThreeWinners)
    return (
        <Container
            flexRow
            data-testid = "Container__RacingMatrixWrapper"
        >
            <Swiper
                slidesPerView = "auto"
                spaceBetween = {10}
                className = {classnames('Swiper', styles['latest-results'])}
            >
                {allRaces.map((item) => (
                    <SwiperSlide key = {item.raceId} className = {styles['latest-results__race']}>
                        <MediumResult
                            startDateTime = {item.startDateTime}
                            status = {item.status}
                            startTime = {item.startTime}
                            meetingName = {item.meetingName}
                            replayDetails = {item.replayDetails}
                            raceTitle = {item.raceTitle}
                            numberOfRunners = {item.numberOfRunners}
                            winners = {allWinners[item.raceId]}
                            raceId = {item.raceId}
                            isHandicap = {item.isHandicap}
                            hybridRaceUrl = {item.hybridRaceUrl}
                            raceUrl = {item.raceUrl}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    )
}
