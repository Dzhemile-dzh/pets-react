import { FC, ReactElement, useRef } from 'react';
import classnames from 'classnames';
import useOutsideClick from '../../custom-hooks/useOutsideClick';

import styles from './Popover.module.scss';

export interface PopoverInterface {
    children?: ReactElement | Array<ReactElement>;
    // this is relative to the icon you click to open the popover
    position: 'below' | 'above' | 'left' | 'right';
    purpose: string;
    className?: string;
    setShouldShowPopover?: (value: boolean) => void;
    shouldStopClickEventPropagation?: boolean;
}

export const Popover : FC<PopoverInterface> = ({
    children,
    position = 'below',
    purpose,
    className,
    setShouldShowPopover,
    shouldStopClickEventPropagation = false,
}) => {
    const wrapperRef = useRef<HTMLDivElement>();

    useOutsideClick(
        wrapperRef,
        null,
        [setShouldShowPopover, shouldStopClickEventPropagation],
        (event) => {
            if (shouldStopClickEventPropagation) {
                event.stopPropagation();
            }

            if (setShouldShowPopover) {
                setShouldShowPopover(false);
            }
        },
        'click',
    )

    return (
        <div
            className = {classnames(
                styles.popover,
                styles[`popover--${position}`],
                className,
            )}
            data-testid = {`Container__${purpose}Popover`}
            ref = {wrapperRef}
        >
            {children}
        </div>
    )
}

Popover.displayName = 'Popover'
