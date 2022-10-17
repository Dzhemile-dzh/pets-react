import { FC } from 'react';
import { useSelector } from 'react-redux';

import RaceElement from './components/RaceElement';

import { RaceInterface, StateInterface } from '../../../interfaces';

import styles from './RaceToRaceNavigation.module.scss'

export interface RaceToRaceNavigationInterface extends Partial<RaceInterface> {
    meetingId: string
}

export const RaceToRaceNavigation : FC<RaceToRaceNavigationInterface> = (
    {
        raceId, meetingId, meetingName, date,
    },
) => {
    const races = useSelector((state: StateInterface) => {
        return state.raceCards[date]?.raceCardsData?.allRaces
            ?.filter((race) => race.meetingId === meetingId) || []
    })

    return (
        <div className = {styles['race-to-race']}>
            <span
                className = {styles['race-to-race__meeting-name']}
                data-testid = "Container__RaceToRaceNavigationMeetingName"
            >
                {meetingName}
            </span>
            <div
                className = {styles['race-to-race__races']}
                data-testid = "Container__RaceToRaceNavigationRaces"
            >
                {races.map((race) => (
                    <RaceElement
                        isSameRace = {race.raceId === raceId}
                        key = {race.raceId}
                        {...race}
                    />
                ))}
            </div>
            <div
                className = {styles['race-to-race__show-more']}
                data-testid = "Container__RaceToRaceNavigationShowMoreMeetings"
            >
                <div
                    data-testid = "Container__RaceToRaceNavigationShowMoreMeetingsButton"
                    className = {styles['race-to-race__show-more-button']}
                >
                    <span data-testid = "Text__RaceToRaceNavigationShowMoreMeetingsButton">
                        Show all meetings
                    </span>
                </div>
            </div>
        </div>
    )
}
