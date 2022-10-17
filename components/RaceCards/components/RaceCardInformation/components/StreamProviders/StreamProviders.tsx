import React from 'react';
import Image from 'next/image';
import classnames from 'classnames';

import styles from './StreamProviders.module.scss';

export interface StreamProvidersInterface {
    liveOn: Array<string>
    className?: string,
}

export const StreamProviders = ({ liveOn, className }: StreamProvidersInterface): JSX.Element => {
    const MAX_STREAMERS_COUNT = 2;

    return (
        <div
            className = {classnames(
                styles['stream-providers'],
                className,
            )}
        >
            {liveOn.slice(0, MAX_STREAMERS_COUNT).map((liveLogoName) => (
                <div
                    key = {liveLogoName}
                    className = {styles['stream-providers__img-container']}
                    data-testid = "Container__StreamProvidersImages"
                >
                    <Image
                        src = {`/images/${liveLogoName}.png`}
                        alt = {liveLogoName}
                        layout = "fill"
                        objectFit = "contain"
                    />
                </div>
            ))}
        </div>
    )
}
