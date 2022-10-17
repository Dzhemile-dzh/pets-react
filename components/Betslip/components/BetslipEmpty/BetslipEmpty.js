import React from 'react';
import propTypes from 'prop-types';
import Link from 'next/link';
import Button from '../../../base/inputs/Button/index.tsx';

import styles from './BetslipEmpty.module.scss';

export const BetslipEmpty = ({ toggleBetslip }) => (
    <div
        className = {styles['bs-empty']}
        data-testid = "Container__BetslipEmpty"
    >
        <p
            data-testid = "Text__BetSlipEmpty"
        >
            {'This betslip is empty.\nSelect a horse to place a bet.'}
        </p>
        <Link
            href = "/today"
            passHref
        >
            <Button
                styleType = "secondary"
                type = "button"
                onClick = {toggleBetslip}
                data-testid = "Button__ViewRacesToday"
            >
                View Today’s Races
            </Button>
        </Link>
    </div>
)

BetslipEmpty.propTypes = {
    toggleBetslip: propTypes.func,
}
