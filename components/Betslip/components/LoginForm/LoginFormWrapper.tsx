import React from 'react';

import {
    withBookmakerAccounts,
    withBetSlip,
} from '../../../../store/providers';
import LoginForm, { LoginFormProviderProps } from './LoginForm';

import './LoginForm.module.scss';

interface LoginFormWrapperProps extends LoginFormProviderProps {
    bookmakerName: string,
    forgottenPasswordUrl?: string,
    onSuccess?: () => void,
}

const LoginFormWrapper = ({
    bookmakerName,
    bookmakerLoginError,
    forgottenPasswordUrl,
    isBookmakerSessionsLoading,
    onSuccess,
    bookmakers,
    location,
    bookmakerListPosition,
    selectedBookmaker,
    ...rest
}: LoginFormWrapperProps) => {
    return (
        <LoginForm
            bookmakerName = {bookmakerName}
            bookmakerLoginError = {bookmakerLoginError}
            forgottenPasswordUrl = {forgottenPasswordUrl}
            isBookmakerSessionsLoading = {isBookmakerSessionsLoading}
            onSuccess = {onSuccess}
            bookmakers = {bookmakers}
            location = {location}
            bookmakerListPosition = {bookmakerListPosition}
            selectedBookmaker = {selectedBookmaker}
            {...rest}
        />
    );
}

const LoginFormWrapperWithBetSlip = withBetSlip(
    LoginFormWrapper,
    ['selectedBookmaker'],
    null,
)

export default withBookmakerAccounts(
    LoginFormWrapperWithBetSlip,
    ['bookmakerLoginError', 'isBookmakerSessionsLoading', 'bookmakers'],
    null,
)
