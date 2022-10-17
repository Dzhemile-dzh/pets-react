import {
    ReactElement, FC, ReactChild, ReactChildren,
} from 'react';

import styles from './IndexContent.module.scss';

interface ChildrenInterface {
    children: ReactChild | ReactChildren | ReactElement | ReactElement[];
}

export const IndexContent : FC<ChildrenInterface> = ({ children }) => {
    return (
        <div
            data-testid = "Container__IndexContent"
            className = {styles['index-content']}
        >
            {children}
        </div>
    )
}

export const LeftSideContent : FC<ChildrenInterface> = ({ children }) => (
    <div
        data-testid = "Container__IndexContentLeftSide"
        className = {styles['index-content__left-side']}
    >
        {children}
    </div>
);

export const RightSideContent : FC<ChildrenInterface> = ({ children }) => (
    <div
        data-testid = "Container__IndexContentRightSide"
        className = {styles['index-content__right-side']}
    >
        {children}
    </div>
);
