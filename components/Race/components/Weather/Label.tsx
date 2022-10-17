import React from 'react';

import styles from './Weather.module.scss';

interface LabelInterface {
    description: string;
}

export const Label = ({
    description,
}: LabelInterface): React.ReactElement => (
    <span
        className = {styles.weather__description}
        aria-hidden = "true"
        data-testid = "Text__WeatherLabel"
    >
        {description}
    </span>
);
