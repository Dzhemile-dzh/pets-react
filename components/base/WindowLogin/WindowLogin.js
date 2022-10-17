import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';

import { Actions } from '../../../project/common';
import { withBookmakerAccounts } from '../../../store/providers';
import Window from '../Window';

import Loader from '../Loader';
import Layout from '../Layout';

export function WindowLogin({
    bookmakerName,
    onClose,
    bookmakers,
    onSuccess,
    shouldChangeBookmaker,
}) {
    const dispatch = useDispatch();
    const currentBookmaker = bookmakers.find((item) => item.name === bookmakerName);

    const onMessage = useCallback((response) => {
        const {
            event,
            data,
        } = response || {};

        if (event === 'login') {
            if (data.success) {
                dispatch(Actions.urlLoginSuccess(
                    bookmakerName,
                    shouldChangeBookmaker,
                ));

                onSuccess && onSuccess();
            }
        } else if (
            event === 'default' &&
            data.success
        ) {
            onClose && onClose();
        } else if (
            event === 'serverError' &&
            !data.success
        ) {
            onClose && onClose();
        }
    }, [bookmakerName, dispatch, onClose, onSuccess, shouldChangeBookmaker])

    useEffect(() => {
        if (!currentBookmaker.loginUrl) {
            dispatch(Actions.bookmakerLogin(bookmakerName, false))
        }
        window.addEventListener('message', onMessage);

        return () => window.removeEventListener('message', onMessage);
    }, [bookmakerName, currentBookmaker.loginUrl, dispatch, onMessage])

    return (
        <>
            {
                currentBookmaker.loginUrl && (
                    <Window
                        url = {currentBookmaker.loginUrl}
                        onUnload = {onClose}
                        onMessage = {onMessage}
                        targetName = "WindowLogin"
                    />
                )
            }
            <Layout.CenterItems>
                <Loader />
            </Layout.CenterItems>
        </>
    )
}

WindowLogin.propTypes = {
    bookmakerName: propTypes.string,
    bookmakers: propTypes.array,
    onClose: propTypes.func,
    onSuccess: propTypes.func,
    shouldChangeBookmaker: propTypes.bool,
}

export default withBookmakerAccounts(
    WindowLogin,
    ['bookmakers', 'bookmakerLoginError', 'isBookmakerSessionsLoading'],
    null,
)
