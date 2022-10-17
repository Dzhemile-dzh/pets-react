import React from 'react';

import { WeatherIcon as Weather } from '../../../base/Icons/WeatherIcon';

import styles from './Weather.module.scss';

interface WeatherIconInterface {
    description: string;
}

export const WeatherIcon = ({ description }: WeatherIconInterface): React.ReactElement => (
    <div aria-label = {description}>
        <Weather
            className = {styles.weather__image}
            dataTestId = "Icon__Weather"
        />
    </div>
);
