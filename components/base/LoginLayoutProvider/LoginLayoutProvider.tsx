import React, { useState, useCallback, useMemo } from 'react';
import classnames from 'classnames';
import Image from 'next/image';

import { LoginContext } from '../../contexts/LoginContext';
import LoginForm from '../../Betslip/components/LoginForm/index';

import { Constants } from '../../../project/constants';

import Layout from '../Layout';
import BookmakerIcon from '../BookmakerIcon';
import IframeLogin from '../IframeLogin';
import WindowLogin from '../WindowLogin';

import { openPopUpWindow } from '../../../project/utils/helpers';
import { bookmakerLoginSuccessEvent } from '../../../project/segmentEvents';

import { convertToPascalCase } from '../../../project/utils/formatUtils';

import styles from './LoginLayoutProvider.module.scss';

const { LOGIN_TYPES } = Constants;

interface LoginBookmakerProps {
    bookmakerListPosition: number,
    location: string,
    loginType: string,
    name: string,
    displayName: string,
    shouldChangeBookmaker?: boolean,
}

interface LoginLayoutProviderProps {
    children: React.ReactNode;
    onSuccess?: () => void;
}

export const LoginLayoutProvider = ({
    children,
    onSuccess,
}: LoginLayoutProviderProps) : React.ReactElement => {
    const [isLogging, setIsLogging] = useState(false);
    const [loginBookmaker, setLoginBookmaker] = useState<LoginBookmakerProps | null>(null);

    const openLoginLayout = useCallback((bookmakerDetails) => {
        setLoginBookmaker(bookmakerDetails)
        setIsLogging(true);

        if (bookmakerDetails.loginType === LOGIN_TYPES.WINDOW) {
            openPopUpWindow('WindowLogin');

            // By returning false, we are triggering a window popup
            // It doesn't work on all browsers
            // For example for mobile/tablet devices and
            // Safari on all devices
            // It will open the new window in a new tab
            return false;
        }
    }, [])

    const closeLoginForm = useCallback(() => {
        setIsLogging(false);
        setLoginBookmaker(null);
    }, [])

    const contextValue = useMemo(() => ({
        openLoginLayout,
        closeLoginForm,
    }), [closeLoginForm, openLoginLayout])

    const handleOnSuccess = useCallback(() => {
        const {
            location,
            displayName: bookmakerName,
            bookmakerListPosition,
        } = loginBookmaker;

        bookmakerLoginSuccessEvent({
            location,
            bookmakerName,
            bookmakerListPosition,
        });

        if (onSuccess) {
            onSuccess();
        }
        closeLoginForm();
    }, [closeLoginForm, onSuccess, loginBookmaker])

    if (isLogging) {
        return (
            <Layout.LightGrey>
                <div
                    className = {styles['login-layout']}
                    data-testid = {loginBookmaker &&
                        `Container__LoginLayout${convertToPascalCase(loginBookmaker.name)}`}
                >
                    <div
                        className = {classnames(
                            styles['login-layout__header'],
                            styles[`login-layout__header--${loginBookmaker.name}`],
                        )}
                        data-testid = "Container__LoginLayoutHeader"
                    >
                        <div
                            className = {styles['login-layout__back-button']}
                            data-testid = "Container__LoginLayoutBackButton"
                        >
                            <Image
                                src = "/svgs/chevron_left_white.svg"
                                width = {24}
                                height = {24}
                                onClick = {closeLoginForm}
                                data-testid = "Icon__LoginLayoutBack"
                            />
                            <span
                                className = {styles['login-layout__header-label']}
                                data-testid = "Text__LoginLayoutHeaderLabel"
                            >
                                LOG IN
                            </span>
                        </div>
                        {
                            loginBookmaker?.loginType !== LOGIN_TYPES.IFRAME && (
                                <div
                                    className = {styles['login-layout__logo-container']}
                                >
                                    <BookmakerIcon
                                        className = "login-layout__logo"
                                        name = {loginBookmaker?.name}
                                    />
                                </div>
                            )
                        }
                    </div>
                    {
                        loginBookmaker.loginType === LOGIN_TYPES.FORM && (
                            <div
                                className = {styles['login-layout__body']}
                                data-testid = "Container__LoginLayoutBody"
                            >
                                <LoginForm
                                    bookmakerName = {loginBookmaker?.name}
                                    onSuccess = {handleOnSuccess}
                                    location = {loginBookmaker?.location}
                                    bookmakerListPosition = {loginBookmaker?.bookmakerListPosition}
                                />
                            </div>
                        )
                    }
                    {
                        loginBookmaker?.loginType === LOGIN_TYPES.IFRAME && (
                            <IframeLogin
                                bookmakerName = {loginBookmaker?.name}
                                onClose = {closeLoginForm}
                                onSuccess = {handleOnSuccess}
                                shouldChangeBookmaker = {loginBookmaker?.shouldChangeBookmaker}
                            />
                        )
                    }
                    {
                        loginBookmaker?.loginType === LOGIN_TYPES.WINDOW && (
                            <WindowLogin
                                bookmakerName = {loginBookmaker?.name}
                                onClose = {closeLoginForm}
                                onSuccess = {handleOnSuccess}
                                shouldChangeBookmaker = {loginBookmaker?.shouldChangeBookmaker}
                            />
                        )
                    }
                </div>
            </Layout.LightGrey>
        )
    }

    return (
        <LoginContext.Provider value = {contextValue}>
            {children}
        </LoginContext.Provider>
    )
}
