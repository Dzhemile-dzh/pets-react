import classNames from 'classnames';

import styles from './Common.module.scss';

export interface StylesInteface {
    className?: string;
    paddingTop?: boolean;
    paddingBottom?: boolean;
    paddingLeft?: boolean;
    paddingRight?: boolean;
    padding?: boolean;
    flexRow?: boolean;
    flexColumn?: boolean;
    flexAlignCenter?: boolean;
    flexAlignCenterVertically?: boolean;
    flexAlignCenterHorizontally?: boolean;
    borderTop?: boolean;
    borderBottom?: boolean;
}

export const useStyles = ({
    className = '',
    padding = false,
    paddingTop = false,
    paddingBottom = false,
    paddingLeft = false,
    paddingRight = false,
    flexRow = false,
    flexColumn = false,
    flexAlignCenter = false,
    flexAlignCenterVertically = false,
    flexAlignCenterHorizontally = false,
    borderTop = false,
    borderBottom = false,
} : StylesInteface) : string => {
    return classNames(
        {
            [styles['common--flex-row']]: flexRow,
        },
        {
            [styles['common--flex-column']]: flexColumn,
        },
        {
            [styles['common--flex-align-center']]: flexAlignCenter,
        },
        {
            [styles['common--flex-align-center-vertically']]: flexAlignCenterVertically,
        },
        {
            [styles['common--flex-align-center-horizontally']]: flexAlignCenterHorizontally,
        },
        {
            [styles['common--padding']]: padding,
        },
        {
            [styles['common--padding-top']]: paddingTop,
        },
        {
            [styles['common--padding-bottom']]: paddingBottom,
        },
        {
            [styles['common--padding-left']]: paddingLeft,
        },
        {
            [styles['common--padding-right']]: paddingRight,
        },
        {
            [styles['common--border-top']]: borderTop,
        },
        {
            [styles['common--border-bottom']]: borderBottom,
        },
        className,
    );
}
