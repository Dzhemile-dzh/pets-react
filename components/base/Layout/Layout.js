import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Layout.module.scss';

const LayoutPropTypes = {
    children: propTypes.any,
}

export function Layout({ children }) {
    return (
        <div
            className = {styles.layout}
            data-testid = "Container__Layout"
        >
            {children}
        </div>
    )
}

Layout.propTypes = LayoutPropTypes;

function LightGrey({ children }) {
    return (
        <div
            className = {classnames(styles.layout, styles['layout--light-grey'])}
            data-testid = "Container__LayoutLightGrey"
        >
            {children}
        </div>
    )
}

function CenterItems({ children }) {
    return (
        <div
            className = {classnames(styles.layout, styles['layout--center-items'])}
            data-testid = "Container__LayoutCenterItems"
        >
            {children}
        </div>
    )
}

CenterItems.propTypes = LayoutPropTypes;
LightGrey.propTypes = LayoutPropTypes;

Layout.LightGrey = LightGrey;
Layout.CenterItems = CenterItems;
