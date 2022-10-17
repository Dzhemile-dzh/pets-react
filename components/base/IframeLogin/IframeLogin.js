import { useEffect, useCallback } from 'react'
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux'

import { Actions } from '../../../project/common';
import { withBookmakerAccounts } from '../../../store/providers';

import Loader from '../Loader';
import Layout from '../Layout';

import styles from './IframeLogin.module.scss'

export function IframeLogin({
    bookmakerName,
    onClose,
    bookmakers,
    onSuccess,
    shouldChangeBookmaker,
}) {
    const dispatch = useDispatch();

    const currentBookmaker = bookmakers.find((item) => item.name === bookmakerName);

    useEffect(() => {
        if (!currentBookmaker.loginUrl) {
            dispatch(Actions.bookmakerLogin(bookmakerName, false))
        }
        window.addEventListener('message', onMessage);

        return () => window.removeEventListener('message', onMessage);
    }, [bookmakerName, currentBookmaker.loginUrl, dispatch, onMessage])

    const onMessage = useCallback(({ data }) => {
        if (typeof data === 'string') {
            const formattedData = JSON.parse(data) || {};
            const {
                event: eventType,
                data: eventData,
            } = formattedData;

            if (eventType === 'login') {
                if (eventData.success) {
                    dispatch(Actions.urlLoginSuccess(
                        bookmakerName,
                        shouldChangeBookmaker,
                    ));

                    onSuccess && onSuccess();
                }
            } else if (
                eventType === 'default' &&
                eventData.success
            ) {
                onClose && onClose();
            } else if (
                eventType === 'serverError' &&
                !eventData.success
            ) {
                onClose && onClose();
            }
        }
    }, [bookmakerName, dispatch, onClose, onSuccess, shouldChangeBookmaker])

    return currentBookmaker.loginUrl ? (
        <iframe
            className = {styles['bs-iframe-login']}
            title = "Bookmaker Login"
            src = {currentBookmaker.loginUrl}
        />
    ) : (
        <Layout.CenterItems>
            <Loader />
        </Layout.CenterItems>
    )
}

IframeLogin.propTypes = {
    bookmakerName: propTypes.string,
    bookmakers: propTypes.array,
    onClose: propTypes.func,
    onSuccess: propTypes.func,
    shouldChangeBookmaker: propTypes.bool,
}

export default withBookmakerAccounts(
    IframeLogin,
    ['bookmakers', 'bookmakerLoginError', 'isBookmakerSessionsLoading'],
    null,
)
