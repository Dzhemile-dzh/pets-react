/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import { calculateTime } from '@project/utils/helpers'
import { Constants } from '../../../project/constants';
import useInterval from '../../custom-hooks/useInterval';
import useEffectAfterMount from '../../custom-hooks/useEffectAfterMount';

import styles from './CountdownLabel.module.scss';

const {
    RACE_STATUSES: {
        FAST_RESULT,
        NEXT_OFF,
        RESULT,
        VOID,
        NOW,
    },
} = Constants;

export interface CountdownLabelPropsInterface {
    status: string;
    testIdPrefix?: string;
    startTime?: string;
    onStatusNowUpdate?: () => void;
}

const setInitialTime = (status, time) => {
    if (status === RESULT || status === FAST_RESULT || status === VOID) {
        return '';
    }

    return calculateTime(time);
}

const calculateClassModifier = (status) => {
    switch (status) {
        case RESULT: {
            return 'result'
        }

        case FAST_RESULT: {
            return 'fast-results';
        }

        case VOID: {
            return 'void'
        }

        case NEXT_OFF: {
            return 'next-off'
        }

        default: {
            return 'upcoming';
        }
    }
}

const labelModifierMap = {
    result: 'result',
    void: 'void',
    'next-off': 'next off',
    'fast-results': 'fast result',
}

export const CountdownLabel : FC<CountdownLabelPropsInterface> = ({
    status,
    testIdPrefix = '',
    startTime,
    onStatusNowUpdate = () => {},
}) => {
    const [time, setTime] = useState<string>(setInitialTime(status, startTime))
    const [classModifier, setClassModifier] = useState<string>(calculateClassModifier(status));
    const [label, setLabel] = useState<string>(labelModifierMap[classModifier] || time);

    // We will check every 30 secs for the time updating
    // Only if its upcoming race (we don't care about the status as long it is not a result or now)
    useInterval(() => {
        if (
            status !== RESULT &&
            status !== VOID &&
            status !== FAST_RESULT &&
            status !== NOW
        ) {
            setTime(calculateTime(startTime));
        }
    }, 30000);

    // Once time is being updated to now
    // We'll call the fn which will notify the user
    // That a status should be changed
    useEffect(() => {
        if (time === NOW && status !== NOW) {
            onStatusNowUpdate();
        }
    }, [onStatusNowUpdate, status, time])

    // After a new status has been provided
    // We'll update the class modifier and the label
    // We are updating it after mount, since on mount we'll be having the correct values
    useEffectAfterMount(() => {
        const updatedModifier = calculateClassModifier(status)
        setClassModifier(updatedModifier)
        setLabel(labelModifierMap[updatedModifier] || time)
    }, [status, time])

    return (
        <div
            className = {
                classnames(
                    styles['countdown-label'],
                    styles[`countdown-label--${classModifier}`],
                )
            }
            data-testid = {`Container__${testIdPrefix}Countdown`}
        >
            <span
                className = {styles['countdown-label__text']}
                data-testid = {`Text__${testIdPrefix}CountdownValue`}
            >
                {label}
            </span>
        </div>
    );
}
