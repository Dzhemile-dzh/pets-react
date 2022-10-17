import React from 'react';
import classnames from 'classnames';
import { SilkIcon } from '../Icons/SilkIcon';
import RunnerTipsNumber from '../../Runner/components/RunnerTipsNumber';

import { SilkInterface } from '../../interfaces';

import styles from './Silk.module.scss';

const onFailedSilkImage = (ev) => {
    ev.target.src = '/images/default_silk.png'
}

export const Silk = ({
    silkUrl,
    tips = '6',
    displayTips = true,
    isRunner,
}: SilkInterface): React.ReactElement => (
    <div
        className = {
            classnames(
                styles.silk,
                {
                    [styles.silk__runner]: isRunner,
                },
            )
        }
        data-testid = "Container__SilkAndTips"
    >
        {silkUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src = {silkUrl}
                alt = "Silk"
                onError = {onFailedSilkImage}
                className = {
                    classnames(
                        styles.silk__img,
                        {
                            [styles['silk__runner-img']]: isRunner,
                        },
                    )
                }
                data-testid = "Image__SilkImage"
            />
        ) : (
            <SilkIcon
                className = {styles['silk__default-svg']}
                data-testid = "Icon__SilkDefaultIcon"
            />
        )}
        {displayTips && isRunner && (
            <RunnerTipsNumber tips = {tips} isRunner = {isRunner} />
        )}
    </div>
)
