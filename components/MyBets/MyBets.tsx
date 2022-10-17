import {
    useEffect, FC, useState, useCallback, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '@project/common';
import { Constants } from '@project/constants';
import { getSessionStorageItem, clearSessionStorageItem } from '@project/utils/storage';
import useEffectOnce from '@components/custom-hooks/useEffectOnce';
import { MyBetsMobile } from './MyBetsMobile';
import { MyBetsDesktopTablet } from './MyBetsDesktopTablet';
import { MyBetsWrapperInterface, StateInterface } from '../interfaces';
import { FilterOptionValue } from './FilterOptionValue';
import { useBreakPoint } from '../contexts/BreakPointContext';
import useWindowUnloadEffect from '../custom-hooks/useWindowUnloadEffect';

const { BOOKMAKER_NAMES, BET_HISTORY_STORAGE_ITEM } = Constants;

export const MyBets : FC<Partial<MyBetsWrapperInterface>> = ({
    bookmakers,
    totalBalance,
    totalFreeBetsBalance,
}) => {
    const dispatch = useDispatch();
    const unsettledBetHistory = useSelector((state: StateInterface) => state.betHistory.unsettled);
    const settledBetHistory = useSelector((state: StateInterface) => state.betHistory.settled);

    const betHistoryStorageItem = getSessionStorageItem(BET_HISTORY_STORAGE_ITEM);
    const [selectedBkmOption, setSelectedBkmOption] = useState(betHistoryStorageItem || 'all');
    const [selectedFilterOption, setSelectedFilterOption] = useState(FilterOptionValue.OPEN)

    const loggedBookmakers = useMemo(() => bookmakers.filter((bkm) => bkm.isLogged), [bookmakers]);
    const isLogged = loggedBookmakers.length > 0;

    const { isMobile, isTablet } = useBreakPoint();

    useEffectOnce(() => {
        dispatch(Actions.bookmakerUserActive());
    })

    useEffect(() => {
        if (betHistoryStorageItem) {
            dispatch(Actions.getSettledBetHistory(
                { bookmakers: [{ name: BOOKMAKER_NAMES[betHistoryStorageItem] }] },
            ))
            dispatch(Actions.getUnsettledBetHistory({
                bookmakers: [{ name: BOOKMAKER_NAMES[betHistoryStorageItem] }],
            }))
            setSelectedBkmOption(betHistoryStorageItem)
        } else if (isLogged) {
            dispatch(Actions.getSettledBetHistory())
            dispatch(Actions.getUnsettledBetHistory())
            setSelectedBkmOption('all')
        }
    }, [betHistoryStorageItem, dispatch, isLogged])

    useWindowUnloadEffect(() => {
        clearSessionStorageItem(BET_HISTORY_STORAGE_ITEM)
    }, true)

    const onBookmakerFilterSelect = useCallback((value) => {
        if (value === 'all') {
            dispatch(Actions.getSettledBetHistory())
            dispatch(Actions.getUnsettledBetHistory())
        } else {
            dispatch(Actions.getSettledBetHistory({
                bookmakers: [{ name: BOOKMAKER_NAMES[value] }],
            }))
            dispatch(Actions.getUnsettledBetHistory({
                bookmakers: [{ name: BOOKMAKER_NAMES[value] }],
            }))
        }
    }, [dispatch])

    return isMobile ? (
        <MyBetsMobile
            isLogged = {isLogged}
            unsettledBetHistory = {unsettledBetHistory}
            settledBetHistory = {settledBetHistory}
            onBookmakerFilterSelect = {onBookmakerFilterSelect}
            selectedBkmOption = {selectedBkmOption}
            loggedBookmakers = {loggedBookmakers}
            selectedFilterOption = {selectedFilterOption}
            onStatusFilterSelect = {setSelectedFilterOption}
        />
    ) : (
        <MyBetsDesktopTablet
            isLogged = {isLogged}
            bookmakers = {bookmakers}
            totalBalance = {totalBalance}
            totalFreeBetsBalance = {totalFreeBetsBalance}
            unsettledBetHistory = {unsettledBetHistory}
            settledBetHistory = {settledBetHistory}
            onBookmakerFilterSelect = {onBookmakerFilterSelect}
            selectedBkmOption = {selectedBkmOption}
            loggedBookmakers = {loggedBookmakers}
            selectedFilterOption = {selectedFilterOption}
            onStatusFilterSelect = {setSelectedFilterOption}
            isTablet = {isTablet}
        />
    )
}
