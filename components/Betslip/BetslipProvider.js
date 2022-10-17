import {
    memo, useState, useMemo, useCallback,
} from 'react';
import propTypes from 'prop-types';
import { BetslipContext } from '../contexts/BetslipContext';

export const BetslipProvider = memo((props) => {
    const [isOpened, setIsOpened] = useState(false);

    const toggleBetslip = useCallback(() => {
        setIsOpened((prevIsOpened) => !prevIsOpened);
    }, [])

    const contextValue = useMemo(
        () => {
            return {
                isOpened,
                toggleBetslip,
            }
        },
        [isOpened, toggleBetslip],
    );

    return (
        <BetslipContext.Provider value = {contextValue}>
            {props.children}
        </BetslipContext.Provider>
    )
})

BetslipProvider.displayName = 'BetslipProvider';

BetslipProvider.propTypes = {
    children: propTypes.node,
}
