/* eslint-disable max-len */
import React from 'react';
import propTypes from 'prop-types';

export default function PaddyPowerWhiteBackground({ className }) {
    return (
        <svg
            width = "100"
            height = "27"
            viewBox = "10 0 100 27"
            className = {className}
        >
            <g>
                <path fill = "#004834" d = "M13.58,13.75c0.33-0.07,1.1-0.18,1.67-0.23c0.4-0.04,0.93-0.07,1.4-0.06c0.56,0.02,1.22,0.12,1.79,0.38    c0.93,0.43,1.74,1.25,1.86,2.67c0.06,0.68-0.06,1.29-0.27,1.78c-0.27,0.6-0.68,1.06-1.16,1.36c-0.32,0.21-0.69,0.37-1.07,0.5    c-0.44,0.14-0.92,0.22-1.38,0.27l0.27,3.07l-2.23,0.2L13.58,13.75z M18.01,16.73c-0.04-0.49-0.3-0.88-0.68-1.09    c-0.27-0.14-0.59-0.21-0.95-0.18c-0.09,0.01-0.22,0.02-0.38,0.05l0.26,2.91c0.06-0.01,0.3-0.03,0.4-0.05    c0.34-0.06,0.66-0.19,0.88-0.37c0.16-0.13,0.31-0.3,0.39-0.53c0.08-0.23,0.11-0.46,0.09-0.75V16.73z" />
                <path fill = "#004834" d = "M22.73,21.52L22.29,23l-2.44,0.22l3.6-10.55l0.33-0.03l5.31,9.78l-2.66,0.22l-0.67-1.38L22.73,21.52z     M24.91,19.42l-0.99-2.16l-0.63,2.31L24.91,19.42z M37.8,16.42c0.16,1.91-0.53,3.48-1.89,4.56c-0.82,0.66-1.98,1.05-3.31,1.16    c-0.64,0.06-1.26,0.1-1.67,0.12c-0.26,0.01-0.65,0.02-0.92,0.02l-0.87-9.88c0.25-0.05,0.57-0.11,1.16-0.19    c0.6-0.08,1.09-0.14,1.57-0.18c1.52-0.13,2.66,0.08,3.54,0.52c1.64,0.82,2.26,2.4,2.38,3.86L37.8,16.42z M35.35,16.69    c-0.08-0.9-0.46-1.7-1.15-2.15c-0.47-0.31-1.1-0.46-1.86-0.4c-0.24,0.02-0.48,0.07-0.65,0.1l0.5,5.71c0,0.02,0.02,0.02,0.03,0.02    c0.19,0.01,0.4,0.01,0.59-0.02c0.58-0.05,1.13-0.26,1.57-0.63c0.65-0.56,1.08-1.43,0.97-2.62V16.69z M47.32,15.59    c0.17,1.91-0.52,3.48-1.88,4.55c-0.83,0.66-1.98,1.05-3.32,1.16c-0.63,0.06-1.25,0.1-1.66,0.12c-0.26,0.01-0.65,0.02-0.93,0.02    l-0.86-9.88c0.91-0.15,2.25-0.32,2.73-0.37c1.52-0.13,2.66,0.08,3.54,0.51c1.63,0.82,2.26,2.41,2.38,3.87V15.59z M44.87,15.86    c-0.08-0.91-0.46-1.7-1.15-2.16c-0.47-0.31-1.1-0.46-1.86-0.39c-0.25,0.02-0.49,0.07-0.65,0.09l0.5,5.71    c0,0.03,0.02,0.03,0.03,0.03c0.19,0.01,0.4,0.01,0.59-0.01c0.58-0.05,1.13-0.27,1.57-0.65c0.65-0.56,1.08-1.42,0.97-2.61V15.86z     M52.92,16.06l0.37,4.23l-2.36,0.21l-0.36-4.11l-3.88-5.58l2.66-0.24l2.19,3.31l1.65-3.64l2.52-0.22L52.92,16.06z M56.41,10    c0.33-0.07,1.1-0.18,1.67-0.22c0.4-0.04,0.93-0.07,1.41-0.06c0.56,0.02,1.21,0.11,1.78,0.37c0.93,0.43,1.74,1.26,1.86,2.68    c0.06,0.67-0.05,1.28-0.27,1.78c-0.27,0.59-0.68,1.05-1.15,1.36c-0.32,0.21-0.69,0.36-1.08,0.48c-0.44,0.14-0.92,0.23-1.37,0.28    l0.27,3.07l-2.24,0.2L56.41,10z M60.84,12.99c-0.04-0.49-0.31-0.89-0.7-1.1c-0.27-0.14-0.58-0.21-0.94-0.18    c-0.1,0.01-0.23,0.02-0.39,0.05l0.26,2.91c0.06-0.01,0.31-0.03,0.41-0.05c0.34-0.05,0.65-0.18,0.87-0.36    c0.16-0.13,0.31-0.31,0.4-0.54c0.08-0.23,0.11-0.46,0.09-0.74V12.99z M74.7,13.34c0.26,2.94-1.76,5.39-4.78,5.66    c-2.97,0.26-5.45-1.8-5.69-4.68c-0.25-2.88,1.83-5.33,4.88-5.6c3-0.26,5.33,1.74,5.59,4.6V13.34z M72.29,13.59    c-0.14-1.64-1.42-2.83-3.04-2.69c-1.67,0.15-2.75,1.51-2.61,3.21c0.15,1.66,1.43,2.85,3.13,2.7c1.69-0.15,2.66-1.55,2.52-3.21    L72.29,13.59z M85.08,17.71l-0.32,0.03l-3.44-5.67l-2.45,6.18l-0.31,0.03l-4-9.9l2.44-0.21l1.82,4.59l2.04-4.87l0.33-0.03    l2.87,4.4L85,7.46l2.23-0.2L85.08,17.71z M88.05,7.19l5.32-0.47l0.17,1.99l-2.96,0.26l0.18,1.96l2.61-0.23l0.17,1.99l-2.61,0.23    l0.18,2.05l3.01-0.27l0.18,2l-5.38,0.47L88.05,7.19z M94.99,6.62c0.22-0.04,0.58-0.09,0.91-0.13c0.28-0.04,0.9-0.1,1.25-0.13    c0.82-0.07,1.47-0.05,2.06,0.05c0.89,0.15,2.1,0.78,2.26,2.62c0.1,1.1-0.36,1.94-0.73,2.3c-0.21,0.22-0.44,0.44-0.59,0.51v0.04    c0.09,0.12,3.24,4.04,3.24,4.04l-2.67,0.24c0,0-1.76-2.39-2.7-3.64l-0.23,0.02l0.33,3.84l-2.25,0.2L94.99,6.62z M99.21,9.4    c-0.07-0.78-0.58-1.2-1.35-1.14c-0.22,0.02-0.33,0.04-0.45,0.07l0.23,2.55c0.09,0.01,0.22-0.01,0.33-0.02    c0.33-0.03,0.62-0.15,0.82-0.33c0.22-0.18,0.47-0.57,0.42-1.12L99.21,9.4z" />
                <path fill = "#43A03E" d = "M106.89,14.47c0,0.77-0.61,1.4-1.39,1.4c-0.78-0.01-1.41-0.63-1.41-1.4c0.01-0.77,0.64-1.4,1.41-1.4    C106.29,13.07,106.89,13.7,106.89,14.47" />
            </g>
        </svg>
    );
}

PaddyPowerWhiteBackground.propTypes = {
    className: propTypes.string,
}
