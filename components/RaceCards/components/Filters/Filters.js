import {
    memo, useState, useCallback, useMemo, useEffect, useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import classnames from 'classnames';
import Image from 'next/image';

import { Constants } from '../../../../project/constants';
import { Actions } from '../../../../project/common';

import { HorseFlatIcon } from '../../../base/Icons/HorseFlatIcon';
import { HorseFlatOffIcon } from '../../../base/Icons/HorseFlatOffIcon';
import { HorseJumpIcon } from '../../../base/Icons/HorseJumpIcon';
import { HorseJumpOffIcon } from '../../../base/Icons/HorseJumpOffIcon';

import SlideToggle from '../../../base/inputs/SlideToggle';
import Toggle from '../../../base/inputs/Toggle';

import FiltersDraw from './components/FiltersDraw';
import RaceIndexNavigation from './components/RaceIndexNavigation';
import ExpandableFilter from './components/ExpandableFilter';
import ExpandedCourses from './components/ExpandedCourses';

import { useBreakPoint } from '../../../contexts/BreakPointContext';

import styles from './Filters.module.scss';

const {
    RACE_FILTERS: {
        RACE_TYPE,
    },
} = Constants

const useCourseFilterDisplayName = (coursesIds, meetings) => {
    const [coursesFilterDisplayName, setCoursesFilterDisplayName] = useState('All courses');

    useEffect(() => {
        if (coursesIds.length > 0) {
            const firstSelectedCourseName = meetings
                .find((item) => item.meetingId === coursesIds[0])?.name;
            const plusAdditionalCoursesText = coursesIds?.length > 1 ?
                ` +${coursesIds.length - 1}` : '';

            setCoursesFilterDisplayName(`${firstSelectedCourseName}${plusAdditionalCoursesText}`);
        } else {
            setCoursesFilterDisplayName('All courses')
        }
    }, [coursesIds, meetings])

    return coursesFilterDisplayName;
}

export function Filters({
    from,
    sortMeetings,
    sortMeetingsFilterValue,
    indexViewToggleItems,
    filters: {
        shouldShowRaceTypeFilter,
        shouldShowHandicapFilter,
        shouldShowRaceStatusFilter,
        raceType,
        isHandicap,
        courses,
    },
    meetings,
}) {
    const dispatch = useDispatch();
    const [focusedFilter, setFocusedFilter] = useState('');
    const [focusedDrawFilter, setFocusedDrawFilter] = useState(false);
    const coursesFilterDisplayName = useCourseFilterDisplayName(courses, meetings);

    const { isMobile, isTablet } = useBreakPoint();

    const indexViewFilterRef = useRef(null);

    const onFlatFilterClickHandle = useCallback(() => {
        // When we click on the Flat race filter we should either
        // Change to Jumps if are already on All or Flat
        // Or we should change it to All if its Jumps selected
        const filterValue = raceType === RACE_TYPE.ALL || raceType === RACE_TYPE.FLAT ?
            RACE_TYPE.JUMPS :
            RACE_TYPE.ALL;
        dispatch(Actions.setRaceTypeFilter(filterValue));
    }, [dispatch, raceType])

    const onJumpsFilterClickHandle = useCallback(() => {
        // When we click on the Jumps race filter we should either
        // Change to Flat if are already on All or Jumps
        // Or we should change it to All if its Flat selected
        const filterValue = raceType === RACE_TYPE.ALL || raceType === RACE_TYPE.JUMPS ?
            RACE_TYPE.FLAT :
            RACE_TYPE.ALL
        dispatch(Actions.setRaceTypeFilter(filterValue));
    }, [dispatch, raceType])

    const openDrawFilter = useCallback(() => {
        setFocusedDrawFilter(true)
    }, []);

    const handleFocusFilter = useCallback((value) => {
        setFocusedFilter(focusedFilter === value ? '' : value);
    }, [focusedFilter]);

    const courseFilterExpandedContentMemo = useMemo(() => {
        return (
            <ExpandedCourses
                courses = {courses}
                meetings = {meetings}
                onClickHandler = {(courseId) => dispatch(Actions.setCourseFilter(courseId))}
            />
        )
    }, [courses, dispatch, meetings])

    const handicapOnlyFilterMemo = useMemo(() => {
        return (
            <div className = {styles.filters__handicap}>
                <Toggle
                    handleClick = {(value) => dispatch(Actions.setHandicapFilter(value))}
                    defaultOption = {isHandicap}
                    purpose = "Handicap"
                    className = "filters-toggle"
                >
                    <Toggle.Button
                        className = "filters-toggle"
                    />
                    <Toggle.Label
                        label = "Handicap only"
                        className = "filters-toggle"
                    />
                </Toggle>
            </div>
        )
    }, [dispatch, isHandicap])

    return (
        <div className = {styles.filters}>
            <div className = {
                    classnames(
                        styles.filters__content,
                        {
                            [styles['filters__content-race-filter']]:
                                shouldShowRaceStatusFilter,
                        },
                    )
                }
            >
                <ExpandableFilter
                    className = {classnames(
                        styles.filters__course,
                        {
                            [styles['filters__course--focused']]: focusedFilter === 'course',
                        },
                    )}
                    name = "course"
                    label = "course"
                    icon = {(
                        <Image
                            src = "/svgs/course.svg"
                            width = {20}
                            height = {20}
                        />
                        )}
                    displayName = {coursesFilterDisplayName}
                    isMobile = {isMobile}
                    isFocused = {focusedFilter === 'course'}
                    onFilterClick = {handleFocusFilter}
                    mobileExpandedContent = {courseFilterExpandedContentMemo}
                />
                {!isMobile && shouldShowRaceTypeFilter && (
                <div className = {styles['filters__race-type']}>
                    <button
                        className = {styles['filters__race-type-flat']}
                        type = "button"
                        onClick = {onFlatFilterClickHandle}
                    >
                        {
                                (raceType === RACE_TYPE.FLAT || raceType === RACE_TYPE.ALL) ? (
                                    <HorseFlatIcon color = "black" />
                                ) : (
                                    <HorseFlatOffIcon color = "black" />
                                )
                            }
                        <span>Flat</span>
                    </button>
                    <button
                        className = {styles['filters__race-type-jumps']}
                        type = "button"
                        onClick = {onJumpsFilterClickHandle}
                    >
                        {
                                (raceType === RACE_TYPE.JUMPS || raceType === RACE_TYPE.ALL) ? (
                                    <HorseJumpIcon color = "black" />
                                ) : (
                                    <HorseJumpOffIcon color = "black" />
                                )
                            }
                        <span>Jumps</span>
                    </button>
                </div>
                )}
                {!isMobile && shouldShowHandicapFilter && (
                    handicapOnlyFilterMemo
                )}
                <div
                    className = {styles['filters__races-more']}
                    ref = {indexViewFilterRef}
                >
                    <SlideToggle
                        className = {styles['filters__slide-toggle']}
                        currentOption = {sortMeetingsFilterValue}
                        handleClick = {sortMeetings}
                        purpose = "MeetingType"
                    >
                        {indexViewToggleItems.map((option, index) => (
                            <SlideToggle.Button
                                className = {styles['filters__slide-toggle-button']}
                                key = {index}
                                optionLabel = {option.label}
                                optionValue = {option.value}
                            />
                        ))}
                    </SlideToggle>
                    {
                            isMobile && (
                                <div
                                    className = {styles.filters__combined}
                                    onClick = {openDrawFilter}
                                >
                                    <Image
                                        src = "/svgs/customise.svg"
                                        width = {18}
                                        height = {18}
                                    />
                                    <span className = {styles['filters__combined-label']}>
                                        More
                                    </span>
                                </div>
                            )
                        }
                </div>
            </div>
            {
                    !isMobile && (
                        <>
                            {
                                focusedFilter === 'date' && <RaceIndexNavigation date = {from} />
                            }
                            {
                                focusedFilter === 'course' && (
                                    <div className = {styles['filters__more-content']}>
                                        {courseFilterExpandedContentMemo}
                                    </div>
                                )
                            }
                            {
                                focusedFilter === 'more' && isTablet && (
                                    <div className = {styles['filters__more-content']}>
                                        {handicapOnlyFilterMemo}
                                    </div>
                                )
                            }
                        </>
                    )
                }
            {
                    isMobile && focusedDrawFilter && (
                        <FiltersDraw
                            setFocusedDrawFilter = {setFocusedDrawFilter}
                            isHandicap = {isHandicap}
                            raceType = {raceType}
                            shouldShowRaceTypeFilter = {shouldShowRaceTypeFilter}
                            shouldShowHandicapFilter = {shouldShowHandicapFilter}
                        />
                    )
                }
        </div>
    )
}

export const FiltersMemoized = memo(Filters);

Filters.propTypes = {
    from: propTypes.string,
    indexViewToggleItems: propTypes.array,
    sortMeetings: propTypes.func,
    sortMeetingsFilterValue: propTypes.string,
    filters: propTypes.object.isRequired,
    courses: propTypes.array,
    meetings: propTypes.array,
}
