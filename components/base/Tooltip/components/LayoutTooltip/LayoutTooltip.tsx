import React, { useRef, memo } from 'react';
import useOutsideClick from '../../../../custom-hooks/useOutsideClick';

interface LayoutTooltipProp {
    closeFunction: () => void,
    children: React.ReactElement,
    exceptElements: Array<Text>
}

export const LayoutTooltip = memo(({
    closeFunction,
    exceptElements = [],
    children,
}: LayoutTooltipProp) : JSX.Element => {
    const elementRef = useRef();

    useOutsideClick(
        elementRef,
        exceptElements,
        [closeFunction, exceptElements],
        () => {
            if (closeFunction !== undefined) {
                closeFunction()
            }
        },
        'mouseup',
    );

    return (
        <div ref = {elementRef}>{children}</div>
    )
})

LayoutTooltip.displayName = 'LayoutTooltip'
