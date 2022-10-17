import {
    FC, useState, useCallback, useEffect,
} from 'react';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { Actions } from '@project/common';
import useEffectOnce from '../../../custom-hooks/useEffectOnce';

import { ChevronIcon } from '../../../base/Icons/ChevronIcon';
import { Eye1Icon } from '../../../base/Icons/Eye1Icon';
import {
    Form,
    FormSubmit,
    FormError,
    FormControl,
} from '../../../base/Form';
import InputField from '../../../base/inputs/InputField';
import Checkbox from '../../../base/inputs/Checkbox';
import { bookmakerLoginFailureEvent } from '../../../../project/segmentEvents';
import { BookmakerInterface } from '../../../interfaces';

import styles from './LoginForm.module.scss';

export interface LoginFormProviderProps {
    isBookmakerSessionsLoading?: boolean,
    bookmakerLoginError?: {
        message: string,
    },
    bookmakers?: Array<BookmakerInterface>,
    location?: string,
    bookmakerListPosition?: number,
    selectedBookmaker?: string,
}

interface LoginFormProps extends LoginFormProviderProps {
    bookmakerName: string,
    forgottenPasswordUrl: string,
    onSuccess: () => void,
}

export const LoginForm : FC<LoginFormProps> = ({
    bookmakerName,
    bookmakerLoginError,
    forgottenPasswordUrl,
    isBookmakerSessionsLoading,
    onSuccess,
    bookmakers,
    location,
    bookmakerListPosition,
    selectedBookmaker,
}) => {
    const dispatch = useDispatch();
    const [isPasswordFieldTypeChanged, setIsPasswordFieldTypeChanged] = useState(false);

    const togglePasswordFieldType = useCallback(() => {
        setIsPasswordFieldTypeChanged((prevIsShown) => (!prevIsShown))
    }, [])

    const onSubmitLoginBookmaker = useCallback(({ username, password }) => {
        dispatch(Actions.bookmakerLogin(
            bookmakerName,
            true,
            username,
            password,
        ));
    }, [bookmakerName, dispatch])

    useEffect(() => {
        if (!isBookmakerSessionsLoading) {
            const loggedInCurrentBookie = bookmakers
                .find((item) => item.name === bookmakerName &&
                    item.feed === selectedBookmaker &&
                    item.isLogged);

            if (loggedInCurrentBookie && onSuccess) {
                onSuccess();
            }
        }
    }, [bookmakerName, bookmakers, isBookmakerSessionsLoading,
        location, onSuccess, selectedBookmaker])

    // We want to clean errors when login form is unmounted
    // To make sure there are not errors left
    useEffectOnce(() => {
        return () => {
            dispatch(Actions.clearBookmakerLoginError())
        }
    })

    useEffect(() => {
        if (Object.keys(bookmakerLoginError).length > 0) {
            const currentBookmaker = bookmakers
                .find((item) => item.name === bookmakerName);

            bookmakerLoginFailureEvent({
                location,
                bookmakerName: currentBookmaker?.displayName,
                bookmakerLoginError,
                bookmakerListPosition,
            });
        }
    }, [bookmakerListPosition, bookmakerLoginError, bookmakerName, bookmakers, location])

    return (
        <div
            className = {styles['bookmaker-login-form']}
            data-testid = "Container__LoginForm"
        >
            <Form
                onSubmit = {onSubmitLoginBookmaker}
                clearErrors = {() => dispatch(Actions.clearBookmakerLoginError())}
                className = {styles['bookmaker-login-form__body']}
                isFormLoading = {isBookmakerSessionsLoading}
                data-testid = "Form__LoginForm"
            >
                <div
                    className = {styles['bookmaker-login-form__fields']}
                    data-testid = "Container__LoginFormFields"
                >
                    <FormControl>
                        <InputField
                            label = "Username"
                            type = "text"
                            name = "username"
                            className = {styles['bookmaker-login-form__input']}
                        />
                    </FormControl>

                    <FormControl>
                        <InputField
                            label = "Password"
                            type = {!isPasswordFieldTypeChanged ?
                                'password' : 'text'}
                            name = "password"
                            className = {styles['bookmaker-login-form__input']}
                            icon = {(
                                <Eye1Icon
                                    className = {classnames(
                                        styles['bookmaker-login-form__eye'],
                                        {
                                            [styles['bookmaker-login-form__eye--inactive']]:
                                                !isPasswordFieldTypeChanged,
                                        },
                                    )}
                                    onClick = {togglePasswordFieldType}
                                />
                            )}
                        />
                    </FormControl>

                    <div
                        className = {styles['bookmaker-login-form__details']}
                        data-testid = "Container__LoginFormDetails"
                    >
                        <FormControl>
                            <Checkbox
                                label = "Remember me"
                                name = "rememberme"
                                data-testid = "Container__LoginFormCheckbox"
                            />
                        </FormControl>
                        <a
                            className = {styles['bookmaker-login-form__forgotten']}
                            target = "_blank"
                            rel = "noreferrer"
                            href = {forgottenPasswordUrl}
                            data-testid = "Link__LoginFormForgotten"
                        >
                            <span
                                className = {styles['bookmaker-login-form__forgotten-text']}
                                data-testid = "Text__LoginFormForgotten"
                            >
                                Forgot your details?
                            </span>
                            <ChevronIcon
                                className = {styles['bookmaker-login-form__chevron']}
                            />
                        </a>
                    </div>
                    {
                        bookmakerLoginError && bookmakerLoginError.message && (
                            <div
                                className = {styles['bookmaker-login-form__error']}
                                data-testid = "Container__LoginFormError"
                            >
                                <FormError>{bookmakerLoginError.message}</FormError>
                            </div>
                        )
                    }
                </div>

                <FormSubmit label = "LOG IN" data-testid = "Button__LoginFormSubmit" />
            </Form>
        </div>
    );
}

export default LoginForm
