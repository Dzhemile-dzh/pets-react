import { FC } from 'react';
import classnames from 'classnames'

import ConditionalLink from '@components/shared/ConditionalLink';
import { RaceInterface } from '../../../../../interfaces';

import styles from './RaceElement.module.scss';

export interface RaceElementInterface extends Partial<RaceInterface> {
    isSameRace: boolean
}

export const RaceElement : FC<RaceElementInterface> = ({
    isAbandoned,
    isResult,
    isSameRace,
    startTime,
    raceUrl,
    raceId,
}) => (
    <ConditionalLink
        url = {raceUrl}
        condition = {!isAbandoned}
    >
        <div
            data-testid = {`Container__${raceId}__RaceElement`}
            className = {classnames(
                styles['race-element'],
                {
                    [styles['race-element--selected']]: isSameRace,
                    [styles['race-element--result']]: isResult,
                    [styles['race-element--abandoned']]: isAbandoned,
                },
            )}
        >
            <span data-testid = "Text__RaceElementStartTime">
                {startTime}
            </span>
            {isAbandoned && (
                <span data-testid = "Text__RaceElementAbandoned">
                    ABD
                </span>
            )}
        </div>
    </ConditionalLink>
)
