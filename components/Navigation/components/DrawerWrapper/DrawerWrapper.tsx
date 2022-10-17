import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Actions } from '@project/common';
import { calculateTime } from '@project/utils/helpers';
import { NextUKOnlyRaceInterface } from '@components/interfaces';
import SideDrawer from '@components/base/SideDrawer';
import { HorseFlatIcon } from '@components/base/Icons/HorseFlatIcon';
import { convertToPascalCase } from '@project/utils/formatUtils';
import styles from './DrawerWrapper.module.scss';
import { DrawerItem } from './DrawerItem';

interface DrawerWrapperProps {
    isOpened: boolean,
    items: {
        id: number,
        path: string,
        text: string,
        info: string | undefined,
    }[]
    handleClick(): void,
    nextRace: NextUKOnlyRaceInterface,
    asPath: string,
}

export const DrawerWrapper = ({
    isOpened,
    handleClick,
    items,
    nextRace,
    asPath,
}: DrawerWrapperProps) => {
    const [raceOffTimerLabel, setRaceOffTimerLabel] = useState('')
    const dispatch = useDispatch()
    const nextRaceData = nextRace.nextUKOnlyRaceData

    useEffect(() => {
        if (isOpened) {
            dispatch(Actions.getNextUKOnlyRace())
            setRaceOffTimerLabel(calculateTime(nextRaceData?.utcTime.raceDateTime).toUpperCase())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpened, raceOffTimerLabel])

    return (
        <SideDrawer
            anchor = "right"
            isOpen = {isOpened}
            onClose = {handleClick}
            purpose = "Options"
        >
            <div
                className = {styles.drawer__content}
            >
                <div className = {styles.drawer__header} data-testid = "Container__DrawerHeader">
                    <Link
                        prefetch = {false}
                        href = {nextRaceData?.raceUrl || '/'}
                    >
                        <a
                            className = {styles['next-race__link']}
                            data-testid = "Link__DrawerNextRace"
                        >
                            <div className = {styles['drawer__header-wrapper']}>
                                <HorseFlatIcon
                                    color = "white"
                                    size = "xxl"
                                    className = {styles['drawer__header-icon']}
                                />
                                <div className = {styles['drawer__header-race']}>
                                    <span
                                        className = {styles['drawer__header-race-label']}
                                        data-testid = "Text__DrawerHeaderRaceLabel"
                                    >
                                            next race
                                    </span>
                                    <span
                                        className = {styles['drawer__header-race-info']}
                                        data-testid = "Text__DrawerHeaderRaceStartTimeMeetingName"
                                    >
                                        {nextRaceData?.startTime} {nextRaceData?.meetingName}
                                    </span>
                                </div>
                                <span
                                    className = {styles['drawer__header-race-time']}
                                    data-testid = "Text__DrawerHeaderRaceTime"
                                >
                                    { raceOffTimerLabel || 'race' }
                                </span>
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
            <ul className = {styles.drawer__list}>
                {items.map((item) => (
                    <DrawerItem
                        key = {item.id}
                        item = {item}
                        isActive = {asPath === item.path}
                        dataTestId = {`Container__${convertToPascalCase(item.text)}__DrawerItem`}
                    />
                ))}
            </ul>
        </SideDrawer>
    )
}
