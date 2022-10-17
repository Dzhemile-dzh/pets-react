import React, { memo } from 'react';
import RaceOutcome from '../RaceOutcome';
import VerdictText from './VerdictText';

import styles from './PredictorAndVerdict.module.scss';

export const MobilePredictorOutcome = () => {
    const title = 'Data predictor';
    const predictorComment = [
        { isBold: true, value: 'Hassadd' },
        { isBold: false, value: ' to win, followed by Major Pugsey' },
    ];

    return (
        <div
            className = {styles['predictor-verdict__predictor-container']}
            data-testid = "Container__MobilePredictor"
        >
            <div className = {styles['predictor-verdict__predictor']}>
                <div
                    className = {styles['predictor-verdict__predictor-summary']}
                    data-testid = "Container__PredictorSummary"
                >
                    <span
                        data-testid = "Text__PredictorTitle"
                    >
                        {title}
                    </span>
                </div>
                <div
                    className = {styles['predictor-verdict__comments']}
                    data-testid = "Container__PredictorComments"
                >
                    <VerdictText verdict = {predictorComment} />
                </div>
                <RaceOutcome horses = {[7, 9, 2, 5, 4, 6]} />
            </div>
        </div>
    );
}

export const MobilePredictorOutcomeMemo = memo(MobilePredictorOutcome);
