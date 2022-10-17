import React from 'react';

import styles from './Weather.module.scss';

interface DegreesInterface {
    degrees: string;
}

export const Degrees = ({
    degrees,
}: DegreesInterface): React.ReactElement => (
    degrees && (
        <span
            className = {styles.weather__degrees}
            aria-hidden = "true"
            data-testid = "Text__WeatherDegrees"
        >
            {degrees}
        </span>
    )
);
