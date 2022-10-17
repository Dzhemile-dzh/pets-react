import React, { useEffect } from 'react';
import { isClickOutside } from '../../project/utils/helpers';

const useOutsideClick = (
    componentRef: React.MutableRefObject<Element>,
    exceptElements: Array<string | Text>,
    dependencies: Array<unknown>,
    handler: (event: MouseEvent) => void,
    mouseEventType = 'mousedown',
): void => {
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isClickOutside(event, componentRef, exceptElements)) {
                handler(event);
            }
        }

        document.addEventListener(mouseEventType, handleOutsideClick);
        return () => {
            document.removeEventListener(mouseEventType, handleOutsideClick);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies)
}

export default useOutsideClick;
