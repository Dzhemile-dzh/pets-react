import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

import styles from './RunnerTipsNumber.module.scss';

export const RunnerTipsNumber = ({ tips, isRunner }) => {
    return tips > 0 && (
        <div
            className = {classnames(
                styles['runner-tips-number'],
                {
                    [styles['runner-tips-number__runner']]: isRunner,
                },
            )}
            data-testid = "Container__RunnerTips"
        >
            {isRunner && (
            <span
                className = {classnames(
                    styles['runner-tips-number__count'],
                    {
                        [styles['runner-tips-number__count-runner']]: isRunner,
                    },
                )}
                data-testid = "Text__RunnerTipsNumber"
            >
                {tips}
            </span>
            )}
            <span
                className = {classnames(
                    styles['runner-tips-number__label'],
                    {
                        [styles['runner-tips-number__label-runner']]: isRunner,
                    },
                )}
                data-testid = "Text__RunnerTipsLabel"
            >
                {tips === '1' ? 'tip' : 'tips'}
            </span>
        </div>
    );
}

RunnerTipsNumber.propTypes = {
    tips: propTypes.string,
    isRunner: propTypes.bool,
};
