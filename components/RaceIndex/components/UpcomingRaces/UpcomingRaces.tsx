import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { RaceCardsRaceInterface } from '@components/interfaces/RaceCards';
import { Actions } from '@project/common';

import HybridLink from '@components/base/HybridLink';
import { formatHybridRaceUrlWithPrefTab } from '@project/utils/formatUtils';
import XSCard from '@components/RaceIndex/components/Cards/XSCard';

import 'swiper/swiper.min.css';
import styles from './UpcomingRaces.module.scss';

interface UpcomingRacesInterface {
    races: RaceCardsRaceInterface[];
}

export const UpcomingRaces: FC<UpcomingRacesInterface> = ({ races = [] }) => {
    const dispatch = useDispatch()
    return (
        <div data-testid = "Container__UpcomingRaces">
            <Swiper
                slidesPerView = "auto"
                className = {classnames('Swiper', styles['upcoming-races'])}
            >
                {races.map((race) => (
                    <SwiperSlide
                        className = {styles['upcoming-races__race']}
                        key = {race.raceId}
                        data-testid = "Container__UpcomingRacesSwiperSlide"
                    >
                        <HybridLink
                            hybridUrl = {formatHybridRaceUrlWithPrefTab(race.hybridRaceUrl)}
                            url = {race.raceUrl}
                        >
                            <XSCard
                                startDateTime = {race.startDateTime}
                                status = {race.status}
                                raceId = {race.raceId}
                                meetingName = {race.meetingName}
                                startTime = {race.startTime}
                                // eslint-disable-next-line max-len
                                raceDetailsTitle = {`${race.raceType} | ${race.numberOfRunners} runners`}
                                onStatusNowUpdate = {() => dispatch(
                                    Actions.setRaceAsNow(race.ukDateFormat, race.raceId),
                                )}
                            />
                        </HybridLink>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
