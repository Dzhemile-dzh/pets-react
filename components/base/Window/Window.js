import React, { useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
import Overlay from '../Overlay';
import useWindowUnloadEffect from '../../custom-hooks/useWindowUnloadEffect';

export function Window({
    url,
    onOpen,
    onMessage,
    onUnload,
    targetName,
}) {
    const container = document.createElement('div');
    const windowObject = useRef(null);
    let checkWindowInterval = null;

    const closeWindow = useCallback(() => {
        windowObject.current.close()
        window.removeEventListener('message', onMessageListener, true);
        window.removeEventListener('click', onClickListener, true);
        window.removeEventListener('mouseup', onClickListener, true);
        window.removeEventListener('mousedown', onClickListener, true);
    }, [onClickListener, onMessageListener])

    useWindowUnloadEffect(() => {
        if (windowObject.current) {
            closeWindow()
        }
    }, true)

    useEffect(() => {
        openChild();
        return () => {
            if (windowObject.current) {
                closeWindow()
            }
        }
    }, [closeWindow, openChild, windowObject]);

    const openChild = useCallback(() => {
        // Now we need to find our opened window, by targetName
        windowObject.current = window.open('', targetName)
        // And to set our wanted location
        windowObject.current.location = url

        // Check if the new window was succesfully opened.
        // So we can add the event listeners to it
        if (windowObject.current) {
            windowObject.current.document.body.appendChild(container)
            if (typeof onOpen === 'function') {
                onOpen(windowObject.current)
            }
            window.addEventListener('message', onMessageListener, true);
            window.addEventListener('click', onClickListener, true);
            window.addEventListener('mouseup', onClickListener, true);
            window.addEventListener('mousedown', onClickListener, true);
        }

        // When a new window use content from a cross-origin there's no way we can attach event
        // to it. Therefore, we need to detect in a interval when the new window was destroyed
        // or was closed.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        checkWindowInterval = setInterval(() => {
            if (!windowObject.current || windowObject.current.closed) {
                release()
            }
        }, 300)
    }, []);

    /**
     * Prevent user from firing actions on the overlay clicking
     * @param {*} event
     */
    const onClickListener = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation()
    }, [])

    const onMessageListener = useCallback((event) => {
        const { data } = event;
        if (typeof onMessage === 'function' && typeof data === 'string') {
            onMessage(JSON.parse(data));
        }
    }, [onMessage])

    /**
    * Release the new window and anything that was bound to it.
    */
    const release = () => {
        // Remove checker interval.
        clearInterval(checkWindowInterval)

        if (typeof onUnload === 'function') {
            onUnload(null)
        }
    }

    /**
    * Render the Window component.
    */
    if (!url) return null;

    return (
        <>
            <Overlay />
            {createPortal(null, container)}
        </>
    )
}

Window.propTypes = {
    url: propTypes.string,
    onOpen: propTypes.func,
    onMessage: propTypes.func,
    onUnload: propTypes.func,
    targetName: propTypes.string,
}
