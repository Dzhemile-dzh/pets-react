import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import { useSelector } from 'react-redux';

import Button from '../../../base/inputs/Button';
import { ChevronIcon } from '../../../base/Icons/ChevronIcon';
import BookmakerIcon from '../../../base/BookmakerIcon';

import styles from './FormHeader.module.scss';

export const FormHeader = ({
    focusedBookmaker,
    bookmakerUserActive,
    title,
    toggleIframeFn,
}) => {
    const bookmakerConfig = useSelector((state) => {
        return state.bookmakersDetails.find((bookie) => bookie.name === focusedBookmaker) || {}
    })

    const loginType = bookmakerConfig ? bookmakerConfig.loginType : 'form';

    return (
        <div
            className = {classnames(
                styles['bs-login-header'],
                styles[`bs-login-header--${focusedBookmaker}`],
            )}
            data-testid = "Container__FormHeader"
        >
            <Button
                styleType = "tertiary-icon"
                className = {styles['bs-login-header__back-button']}
                onClick = {() => { toggleIframeFn(); bookmakerUserActive(); }}
                data-testid = "Button__FormHeaderBack"
            >
                <ChevronIcon
                    color = "black"
                    size = "normal"
                />
            </Button>
            <span
                className = {styles['bs-login-header__label']}
                data-testid = "Text__FormHeaderLabel"
            >
                {title}
            </span>
            {loginType !== 'iframe' && (
                <div
                    className = {styles['bs-login-header__logo-container']}
                    data-testid = "Container__FormHeaderLoginHeaderLogo"
                >
                    <BookmakerIcon
                        className = {styles['bs-login-header__logo']}
                        name = {focusedBookmaker}
                    />
                </div>
            )}
        </div>
    );
}

FormHeader.propTypes = {
    toggleIframeFn: propTypes.func.isRequired,
    focusedBookmaker: propTypes.string.isRequired,
    bookmakerUserActive: propTypes.func,
    title: propTypes.string.isRequired,
}
