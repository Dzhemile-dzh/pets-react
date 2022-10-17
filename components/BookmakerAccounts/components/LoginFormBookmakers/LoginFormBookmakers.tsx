import React from 'react';
import classnames from 'classnames';
import IframeLogin from '../../../base/IframeLogin';
import WindowLogin from '../../../base/WindowLogin';
import BookmakerThumb from '../../../Betslip/components/BookmakerThumb';
import LoginForm from '../../../Betslip/components/LoginForm';
import { CrossIcon } from '../../../base/Icons/CrossIcon';

import styles from './LoginBookmakers.module.scss';

interface LoginFormBookmakersProps {
    onClose: () => void;
    name: string;
    loginType: string;
    onSuccess: () => void;
    bookmakerListPosition: number;
    location: string;
}

export const LoginFormBookmakers = ({
    onClose,
    name,
    loginType,
    onSuccess,
    bookmakerListPosition,
    location,
}: LoginFormBookmakersProps) : JSX.Element => {
    return (
        <div className = {
            classnames(styles['bookmaker-login'], styles[`bookmaker-login--${loginType}`])
        }
        >
            <div className = {styles['bookmaker-login__header']}>
                {
                    loginType !== 'iframe' && (
                        <BookmakerThumb bookmakerName = {name} />
                    )
                }
                <CrossIcon
                    className = {styles.close}
                    color = "black"
                    size = "small"
                    onClick = {onClose}
                />
            </div>
            {
                loginType === 'form' && (
                    <LoginForm
                        bookmakerName = {name}
                        onSuccess = {onSuccess}
                        location = {location}
                        bookmakerListPosition = {bookmakerListPosition}
                    />
                )
            }
            {
                loginType === 'iframe' && (
                    <IframeLogin
                        bookmakerName = {name}
                        onClose = {onClose}
                        location = {location}
                        bookmakerListPosition = {bookmakerListPosition}
                    />
                )
            }
            {
                loginType === 'window' && (
                    <WindowLogin
                        bookmakerName = {name}
                        onClose = {onClose}
                        location = {location}
                        bookmakerListPosition = {bookmakerListPosition}
                    />
                )
            }
        </div>
    )
}
