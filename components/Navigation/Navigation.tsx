import { useDispatch, useSelector } from 'react-redux';
import { StateInterface } from '@components/interfaces';
import useEffectOnce from '@components/custom-hooks/useEffectOnce';
import { Actions } from '@project/common';
import { useBreakPoint } from '@components/contexts/BreakPointContext';
import { NavigationInterface } from './interfaces';

import styles from './Navigation.module.scss';

export const Navigation = ({
    nextThreeRacesData,
    children,
} : NavigationInterface) : JSX.Element => {
    const dispatch = useDispatch()
    const nextRace = useSelector(
        (state: StateInterface) => state.nextUKOnlyRace,
    )

    useEffectOnce(() => {
        dispatch(Actions.getNextUKOnlyRace())
    });

    const betSelectionsCount = useSelector((state: StateInterface) => {
        return Object.keys(state.betslip.betSelections).length
    })

    const { isMobile } = useBreakPoint();

    return (
        <div className = {styles.navigation}>
            {children({
                isMobile,
                betSelectionsCount,
                nextRace,
                nextThreeRacesData,
            })}
        </div>
    )
}
