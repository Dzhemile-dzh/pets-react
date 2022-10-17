import React from 'react';

import { DefaultSpinner, BetslipSpinner } from './Spinners';
import { SpinnerInterface } from '../../interfaces';

import styles from './Loader.module.scss';

export const Loader = ({ type, ...rest }: SpinnerInterface): React.ReactElement => {
    return type === 'betslip' ? (
        <div className = {styles['betslip-spinner']}>
            <BetslipSpinner type = {type} {...rest} />
        </div>
    ) : (
        <div className = {styles['default-spinner']}>
            <DefaultSpinner type = {type} {...rest} />
        </div>
    );
}

Loader.displayName = 'Loader';
