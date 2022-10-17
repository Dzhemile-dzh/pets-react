import React, { useMemo, useCallback } from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import Image from 'next/image';

import styles from './ExpandedCourses.module.scss';

const Item = ({
    label,
    onClickHandler,
    id,
    isChecked,
}) => {
    const handleOnItemClick = useCallback(
        () => {
            onClickHandler(id)
        },
        [id, onClickHandler],
    )
    return (
        <div
            className = {styles['expanded-courses__item-wrapper']}
        >
            <div
                className = {
                    classnames(
                        styles['expanded-courses__item'],
                        {
                            [styles['expanded-courses__item--selected']]: isChecked,
                        },
                    )
                }
                onClick = {handleOnItemClick}
            >
                <div className = {styles['expanded-courses__checkbox']}>
                    {
                        isChecked && (
                            <div className = {styles['expanded-courses__svg-icon']}>
                                <Image
                                    src = "/svgs/tick_primary.svg"
                                    width = {28}
                                    height = {28}
                                />
                            </div>
                        )
                    }
                </div>
                <span className = {styles['expanded-courses__item-label']}>{label}</span>
            </div>
        </div>
    )
}

Item.displayName = 'Item';

Item.propTypes = {
    label: propTypes.string,
    onClickHandler: propTypes.func,
    isChecked: propTypes.bool,
    id: propTypes.string,
}

export function ExpandedCourses({
    courses,
    onClickHandler,
    meetings,
}) {
    const memoizedMeetingItems = useMemo(() => {
        return meetings
            .filter((item) => !item.isMeetingAbandoned)
            .map((item) => {
                return (
                    <Item
                        key = {item.meetingId}
                        onClickHandler = {onClickHandler}
                        id = {item.meetingId}
                        label = {item.name}
                        isChecked = {courses.indexOf(item.meetingId) > -1}
                    />
                )
            })
    }, [courses, meetings, onClickHandler])

    return (
        <div className = {styles['expanded-courses']}>
            <Item
                onClickHandler = {onClickHandler}
                label = "ALL"
                isChecked = {courses.length === 0}
            />
            {memoizedMeetingItems}
        </div>
    )
}

ExpandedCourses.propTypes = {
    courses: propTypes.array,
    onClickHandler: propTypes.func,
    meetings: propTypes.array,
}
