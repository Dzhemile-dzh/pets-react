import React from 'react';
import BestOddsIcon from '../BestOddsIcon';
import styles from './OptionsHeader.module.scss';

export const OptionsSinglesHeader = ({ count } : { count: number }) : JSX.Element => {
    return (
        <div
            className = {styles['bs-options-header']}
            data-testid = "Container__OptionsSinglesHeader"
        >
            <div
                className = {styles['bs-options-header__heading']}
                data-testid = "Container__OptionsSinglesHeading"
            >
                <span
                    className = {styles['bs-options-header__label']}
                    data-testid = "Text__OptionsSinglesHeaderLabel"
                >
                    {count > 1 ? 'Singles' : 'Single'}
                </span>
            </div>
            <div
                className = {styles['bs-options-header__separator']}
                data-testid = "Container__OptionsSinglesHeaderSeparator"
            />
            <div
                className = {styles['bs-options-header__bog']}
                data-testid = "Container__OptionsSinglesHeaderBog"
            >
                <div
                    className = {styles['bs-options-header__bog-primary']}
                    data-testid = "Container__OptionsSinglesHeaderBogPrimary"
                >
                    <BestOddsIcon />
                    <span
                        className = {styles['bs-options-header__bog-label']}
                        data-testid = "Text__OptionsSinglesHeaderBogLabel"
                    >
                        Indicates best
                    </span>
                </div>
                <span
                    className = {styles['bs-options-header__bog-sub-label']}
                    data-testid = "Text__OptionsSinglesHeaderBogSubLabel"
                >
                    odds guaranteed
                </span>
            </div>
        </div>
    )
}
