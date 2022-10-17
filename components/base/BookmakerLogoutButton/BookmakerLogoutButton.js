import { useCallback, useEffect } from 'react';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Actions } from '../../../project/common';
import { withBookmakerAccounts } from '../../../store/providers';
import { openPopUpWindow } from '../../../project/utils/helpers';

import Button from '../inputs/Button/index.tsx';
import LinkButton from '../inputs/LinkButton';
import Window from '../Window';

const IframeLogout = ({ logoutUrl, onSuccess }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener('message', onMessage);

        return () => window.removeEventListener('message', onMessage);
    }, [onMessage])

    const onMessage = useCallback(({ data }) => {
        if (typeof data === 'string') {
            const formattedData = JSON.parse(data) || {};
            const {
                event: eventType,
                data: eventData,
            } = formattedData;

            if (eventType === 'logout') {
                if (eventData.success) {
                    dispatch(Actions.urlLogoutSuccess());
                }
                onSuccess && onSuccess();
            } else if (
                eventType === 'default' &&
                eventData.success
            ) {
                onSuccess && onSuccess();
            } else if (
                eventType === 'serverError' &&
                !eventData.success
            ) {
                onSuccess && onSuccess();
            }
        }
    }, [dispatch, onSuccess]);

    return (
        <iframe
            className = "ba-item__logout-iframe"
            title = "Bookmaker Logout"
            src = {logoutUrl}
        />
    )
}

IframeLogout.propTypes = {
    logoutUrl: propTypes.string,
    onSuccess: propTypes.func,
}

const WindowLogout = ({
    logoutUrl,
    onSuccess,
}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener('message', onMessage);

        return () => window.removeEventListener('message', onMessage);
    }, [onMessage])

    const onMessage = useCallback((response) => {
        const {
            event,
            data,
        } = response || {};

        if (event === 'logout') {
            if (data.success) {
                dispatch(Actions.urlLogoutSuccess());
            }
            onSuccess && onSuccess();
        } else if (
            event === 'default' &&
            data.success
        ) {
            onSuccess && onSuccess();
        } else if (
            event === 'serverError' &&
            !data.success
        ) {
            onSuccess && onSuccess();
        }
    }, [dispatch, onSuccess])

    return logoutUrl && (
        <Window
            url = {logoutUrl}
            onMessage = {onMessage}
            windowName = "Bookmaker Logout"
            targetName = "WindowLogout"
            onUnload = {onSuccess}
        />
    )
}

WindowLogout.propTypes = {
    onSuccess: propTypes.func,
    logoutUrl: propTypes.string,
}

export function BookmakerLogoutButton({
    className,
    bookmakerName,
    bookmakers,
    icon,
    onSuccess,
    size,
}) {
    const dispatch = useDispatch();
    const currentBookmaker = bookmakers.find((item) => item.name === bookmakerName);

    const onLogout = useCallback((event) => {
        event.stopPropagation();

        if (!currentBookmaker.logoutUrl) {
            dispatch(Actions.bookmakerLogout(bookmakerName))

            if (currentBookmaker.logoutType === 'delete') {
                onSuccess && onSuccess();
            }
        }

        if (currentBookmaker.logoutType === 'window') {
            openPopUpWindow('WindowLogout');
            return false;
        }
    }, [
        bookmakerName,
        currentBookmaker.logoutType,
        currentBookmaker.logoutUrl,
        dispatch,
        onSuccess,
    ])

    return (
        <>
            {
                currentBookmaker.logoutType === 'window' ? (
                    <LinkButton
                        styleType = "tertiary"
                        className = {className}
                        onClick = {onLogout}
                        targetName = "WindowLogout"
                        title = "Window Logout"
                        isWindowPopUp
                        size = {size}
                    >
                        {icon}
                        Log out
                    </LinkButton>
                ) : (
                    <Button
                        styleType = "tertiary"
                        className = {className}
                        onClick = {onLogout}
                        size = {size}
                        data-testid = "Button__BookmakerLogout"
                    >
                        {icon}
                        Log out
                    </Button>
                )
            }
            {
                currentBookmaker.logoutUrl && (
                    <>
                        {
                            currentBookmaker.logoutType === 'iframe' && (
                                <div style = {{ display: 'none' }}>
                                    <IframeLogout
                                        logoutUrl = {currentBookmaker.logoutUrl}
                                        onSuccess = {onSuccess}
                                    />
                                </div>
                            )
                        }
                        {
                            currentBookmaker.logoutType === 'window' && (
                                <WindowLogout
                                    logoutUrl = {currentBookmaker.logoutUrl}
                                    onSuccess = {onSuccess}
                                />
                            )
                        }
                    </>
                )
            }
        </>
    )
}

BookmakerLogoutButton.propTypes = {
    bookmakers: propTypes.array,
    bookmakerName: propTypes.string,
    className: propTypes.string,
    icon: propTypes.node,
    onSuccess: propTypes.func,
    size: propTypes.string,
}

export default withBookmakerAccounts(
    BookmakerLogoutButton,
    ['bookmakers'],
    null,
)
