import React, { ReactElement } from 'react';
import classnames from 'classnames';

import styles from './VerdictText.module.scss';

interface VerdictTextInterface {
    verdict: Array<{isBold?: boolean, value: string}>,
}

export const VerdictText = ({ verdict }: VerdictTextInterface): ReactElement => (
    <div
        className = {styles.verdict}
        data-testid = "Container__Verdict"
    >
        {
            verdict.map((item, index) => (
                <span
                    key = {index}
                    className = {classnames(
                        styles.verdict__text,
                        {
                            [styles['verdict__text--bold']]: item.isBold,
                        },
                    )}
                    data-testid = {`Text__${index}__VerdictText`}
                >
                    {item.value}
                </span>
            ))
        }
    </div>
)
