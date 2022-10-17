import React from 'react';
import classnames from 'classnames';

import { Degrees } from './Degrees'
import { WeatherIcon } from './WeatherIcon'
import { Label } from './Label'

import styles from './Weather.module.scss';

interface WeatherInterface {
    children: React.ReactElement | React.ReactElement[];
    className: string;
}

export const Weather = ({
    children,
    className,
}: WeatherInterface): React.ReactElement => (
    <div className = {classnames(styles.weather, className)}>
        {children}
    </div>
)

Weather.Degrees = Degrees;
Weather.WeatherIcon = WeatherIcon;
Weather.Label = Label;
