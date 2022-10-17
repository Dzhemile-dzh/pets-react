import { BookmakerAccountProviderInterface } from './Providers';
import { BookmakerInterface } from './Bookmaker';
import {
    BetHistoryItemSelectionInterface,
    SettledBetHistoryInterface,
    UnsettledBetHistoryInterface,
} from './BetHistory';

export interface MyBetsWrapperInterface extends
    Partial<BookmakerAccountProviderInterface> {
    isLogged: boolean,
    isMobile?: boolean,
    isTablet?: boolean,
    settledBetHistory?: SettledBetHistoryInterface,
    unsettledBetHistory: UnsettledBetHistoryInterface,
    getSettledBetHistory?: (value?: BetHistoryObjectInterface) => void,
    getUnsettledBetHistory?: (value?: BetHistoryObjectInterface) => void,
    onBookmakerFilterSelect?: (value) => void;
    selectedBkmOption?: string,
    loggedBookmakers: Array<BookmakerInterface>
    selectedFilterOption?: string,
    onStatusFilterSelect?: (value) => void,
    isSettled?: boolean,
}

interface BetHistoryObjectInterface {
    bookmakers: [{ name: string }],
}

export interface MyBetsHistoryReceiptInterface {
    betId: string,
    date: string,
    betType: string,
    estimatedReturns: string,
    isEachWay : boolean
    time: string
    currencySign: string,
    numberOfLines: number,
    stakePerLine: string | number,
    returns?: string,
    isWinning?: boolean,
    selections: Array<BetHistoryItemSelectionInterface>,
    isSettled?: boolean,
}
