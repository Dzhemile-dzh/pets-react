/* eslint-disable max-len */
import { FC } from 'react';
import Image from 'next/image';
import classnames from 'classnames';

import styles from './RaceItem.module.scss';

interface RaceItemInterface {
    category: string;
    isResult: boolean;
    raceId: string;
    startTime: string;
    displayDistance: string;
    numberOfRunners: string;
    raceTitle: string;
    shouldShowOffer?: boolean;
}

export const RaceItem : FC<RaceItemInterface> = ({
    category,
    isResult,
    raceId,
    startTime,
    displayDistance,
    numberOfRunners,
    raceTitle,
    shouldShowOffer,
}) => (
    <div
        className = {classnames(
            styles['race-item'],
            {
                [styles['race-item--result']]: isResult,
            },
        )}
        data-testid = {`Container__${raceId}__Race`}
    >
        {isResult && (
            <div
                className = {styles['race-item__result-indicator']}
                data-testid = {`Container__${raceId}__ResultIndicator`}
            >
                    &nbsp;
            </div>
        )}
        <div className = {classnames(
            styles['race-item__start-time'],
            {
                [styles['race-item__start-time--result']]: isResult,
            },
        )}
        >
            <span data-testid = "Text__StartTime">{startTime}</span>
            {
                shouldShowOffer && (
                    <span
                        data-testid = "Text__Offer"
                        className = {styles['race-item__offer']}
                    >
                        Offer
                    </span>
                )
            }
        </div>
        <div className = {styles['race-item__details']}>
            <span
                className = {styles['race-item__type']}
                data-testid = "Text__RaceDetails"
            >
                {`${category} | ${displayDistance} | ${numberOfRunners} ${isResult ? 'ran' : 'runners'}`}
            </span>
            <div className = {styles['race-item__title']}>
                <div className = {styles['race-item__icon']}>
                    <Image
                        src = "/svgs/video_dark_grey.svg"
                        width = {16}
                        height = {16}
                        data-testid = "Icon__Video"
                    />
                </div>
                <span data-testid = "Text__RaceTitle">{raceTitle}</span>
            </div>
        </div>
        <div className = {styles['race-item__chevron-icon']}>
            <Image
                src = "/svgs/chevron_right_grey.svg"
                width = {24}
                height = {24}
            />
        </div>
    </div>
)
