import React from 'react';
import propTypes from 'prop-types';

import styles from './IframeSignUp.module.scss';

// TODO: Currently it is not clarified what will happen on successful sign up.
// Whenever it is clear, think about combining the functionality with IframeLogin.
export const IframeSignUp = ({
    url,
}) => {
    return url && (
        <iframe
            className = {styles['bs-iframe-login']}
            title = "Bookmaker Sign up"
            src = {url}
        />
    )
}

IframeSignUp.propTypes = {
    url: propTypes.string,
    // TODO: there will be other props like (close the iframe, etc.)
}
