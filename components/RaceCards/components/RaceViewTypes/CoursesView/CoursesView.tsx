import { useMemo, FC } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import Weather from '../../../../Race/components/Weather';
import Accordion from '../../../../base/Accordion';
import RacesView from '../RacesView';
import {
    RaceCardsObjectInterface,
    RaceCardRunnersInformationInterface,
    RaceCardsProviderInterface,
} from '../../../../interfaces';

import styles from './CoursesView.module.scss';

export interface CoursesViewPropsInterface extends
    Omit<RaceCardsObjectInterface, 'allMeetings' | 'allRaces' | 'headerTitle'>,
    RaceCardRunnersInformationInterface,
    Partial<RaceCardsProviderInterface> {
    showOdds: boolean,
}

export const CoursesView : FC<CoursesViewPropsInterface> = ({
    date,
    meetings,
    races,
    firstThreeWinners,
    favouriteRunners,
    showOdds,
    setRaceAsNow,
}) => {
    // Note:
    // Single brackets are used, because TS
    // Recognises the return as return of [], instead of single component
    // This way we return single component and TS doesn't throw error

    const memoizedCourseView = useMemo(() => {
        return (
            <>
                {meetings.map((course) => {
                    if (!course.races && course.races.length === 0) {
                        return null;
                    }

                    const raceData = course.races.map(
                        (raceId) => races.find((race) => race.raceId === raceId),
                    );

                    if (!raceData || raceData.length === 0) {
                        return null;
                    }

                    const content = (
                        <RacesView
                            firstThreeWinners = {firstThreeWinners}
                            favouriteRunners = {favouriteRunners}
                            races = {raceData}
                            showOdds = {showOdds}
                            setRaceAsNow = {setRaceAsNow}
                        />
                    );

                    const headerContent = (
                        <div
                            className = {classnames(
                                styles['course-view__meeting'],
                                {
                                    [styles['course-view__meeting--abandoned']]:
                                        course.isMeetingAbandoned,
                                },
                            )}
                            data-testid = "Container__CourseViewMeeting"
                        >
                            <h4 data-testid = "Text__CourseViewMeeting">{course.name}</h4>
                            {!course.isMeetingAbandoned ? (
                                <div
                                    className = {styles['course-view__meeting--details']}
                                    data-testid = "Container__CourseViewMeetingDetails"
                                >
                                    {course.weather && !moment(date).isBefore(moment(), 'days') ? (
                                        <span data-testid = "Text__CourseViewMeetingDetailsWeather">
                                            Forecast:
                                            <Weather
                                                className = {styles['course-view__meeting-weather']}
                                            >
                                                <Weather.Label
                                                    description = {course.weather}
                                                />
                                                <Weather.WeatherIcon
                                                    description = {course.weather}
                                                />
                                            </Weather>
                                        </span>
                                    ) : null}
                                    <span data-testid = "Text__CourseViewMeetingDetails">
                                        {course.meetingType}
                                        {' '}| {course.numberOfRaces} races |{' '}
                                        {course.meetingStartTime} - {course.meetingEndTime}
                                    </span>
                                </div>
                            ) : (
                                <span
                                    data-testid = "Text__CourseViewMeetingAbandoned"
                                >
                                    abandoned
                                </span>
                            )}
                        </div>
                    );

                    const headerContentAdditional = (
                        <div
                            className = {styles['course-view__meeting-additional-info']}
                            data-testid = "Container__CourseViewMeetingAdditionalInfo"
                        >
                            {course.numberNonRunners > 0 && (
                                <p
                                    className = {styles['course-view__meeting-non-runners']}
                                    data-testid = "Text__CourseViewMeetingNonRunners"
                                >
                                    {course.numberNonRunners}
                                    {course.numberNonRunners > 1 ? ' non-runners' : ' non-runner'}
                                </p>
                            )}
                            <p
                                className = {styles['course-view__meeting-going-details']}
                                data-testid = "Text__CourseViewMeetingGoing"
                            >
                                <span
                                    data-testid = "Label__CourseViewMeetingGoingLabel"
                                >
                                    going:
                                </span> {course.goingDetails}
                            </p>
                        </div>
                    );

                    return (
                        <Accordion
                            key = {course.name}
                            headerContent = {headerContent}
                            headerContentAdditional = {headerContentAdditional}
                            openedContent = {content}
                            isOnRaceIndex
                            isAccordionDisabled = {course.isMeetingAbandoned}
                            accordionHeaderClassName = {styles['course-view__accordion-header']}
                            accordionButtonClassName = {styles['course-view__accordion-button']}
                            dataTestIdPrefix = "CourseView"
                        />
                    )
                })}
            </>
        )
    }, [date, favouriteRunners, firstThreeWinners, meetings, races, setRaceAsNow, showOdds]);

    return memoizedCourseView;
}
