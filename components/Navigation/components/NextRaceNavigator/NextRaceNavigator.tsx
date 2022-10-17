import React, { useMemo, useState } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import NextThreeRaces from '../NextThreeRaces';
import { ChevronIcon } from '../../../base/Icons/ChevronIcon';

import Tooltip from '../../../base/Tooltip';
import { NextThreeRacesProviderInterface } from '../../../interfaces';

import styles from './NextRaceNavigator.module.scss';

export interface NextRaceNavigatorPropsInterface extends Omit<NextThreeRacesProviderInterface,
'getNextThreeRaces' | 'isNextThreeRacesLoading' | 'nextThreeRacesError'
> {
    shouldShowTooltip: boolean,
}

export const NextRaceNavigator = ({
    shouldShowTooltip,
    nextThreeRacesData,
}: NextRaceNavigatorPropsInterface) : JSX.Element => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const tooltip = useMemo(() => {
        const onDropdownClick = () => setIsOverlayOpen(!isOverlayOpen);
        const onDropdownClose = () => {
            if (isOverlayOpen) {
                setIsOverlayOpen(false);
            }
        };

        return (
            <Tooltip
                title = {<NextThreeRaces nextThreeRacesData = {nextThreeRacesData} />}
                arrow
                open = {isOverlayOpen}
                placement = "bottom"
                type = "nextRaceNavigator"
                classes = {
                    {
                        tooltip: classnames(styles.tooltip, styles['next-race__wrapper-tooltip']),
                        arrow: styles['next-race__wrapper-arrow'],
                        popperArrow: styles['next-race__wrapper-arrow--popper'],
                    }
                }
                closeFunction = {onDropdownClose}
                exceptElements = {
                    ['next-three-races', 'next-three-races__divider']
                }
                data-testid = "Tooltip__NextRaceNavigator"
            >
                <div
                    className = {styles['next-race__dropdown']}
                    onClick = {onDropdownClick}
                    data-testid = "Button__NextRaceDropdown"
                >
                    <ChevronIcon
                        size = "normal"
                        className = {classnames(
                            styles['next-race__dropdown-icon'],
                            {
                                [styles['next-race__dropdown-icon--opened']]: isOverlayOpen,
                            },
                        )}
                    />
                </div>
            </Tooltip>
        )
    }, [isOverlayOpen, nextThreeRacesData]);

    return (
        <div
            className = {styles['next-race']}
            data-testid = "Container__NextRaceNavigator"
        >
            <Link href = {nextThreeRacesData?.[0]?.raceUrl || '/'}>
                <a
                    className = {styles['next-race__link']}
                    data-testid = "Button__NextRaceNavigator"
                >
                    <div className = {styles['next-race__link-wrapper']}>
                        <div className = {styles['next-race__circle']}>
                            <div className = {styles['next-race__circle-outer']}>
                                <div className = {styles['next-race__quarter-circle']} />
                                <div className = {styles['next-race__quarter-circle']} />
                                <div className = {styles['next-race__quarter-circle']} />
                                <div className = {styles['next-race__quarter-circle']} />
                                <div className = {styles['next-race__quarter-circle']} />
                            </div>
                            <div className = {styles['next-race__circle-inner']}>
                                <Image
                                    src = "/svgs/double_arrow.svg"
                                    width = {14}
                                    height = {14}
                                />
                            </div>
                        </div>
                        <div className = {styles['next-race__link-container']}>
                            <span
                                className = {styles['next-race__link-text']}
                                data-testid = "Text__NextRace"
                            >
                                Next Race
                            </span>
                        </div>
                    </div>
                </a>
            </Link>

            {shouldShowTooltip && tooltip}
        </div>
    );
}
