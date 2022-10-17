import React, { useMemo } from 'react';
import classnames from 'classnames';
import { InfoBlackIcon } from '../../../base/Icons/InfoBlackIcon';
import { BookmakerInterface } from '../../../interfaces';
import { BookmakerBalanceItem } from '../BookmakerBalanceItem';

import styles from './MyBookmakerAccountsBalance.module.scss';
import { useBreakPoint } from '../../../contexts/BreakPointContext';

export interface MyBookmakerAccountsBalanceProps {
    bookmakers: Array<BookmakerInterface>,
    totalBalance: string,
    totalFreeBetsBalance?: string,
    wrapperClassName?: string,
    mbaListClassName?: string,
    mbaBalanceClassName?: string,
}

export const MyBookmakerAccountsBalance = ({
    bookmakers,
    totalBalance,
    totalFreeBetsBalance,
    wrapperClassName,
    mbaListClassName,
    mbaBalanceClassName,
}: MyBookmakerAccountsBalanceProps): JSX.Element => {
    const { isMobile } = useBreakPoint();

    const output = useMemo(() => {
        const filteredBookmakers = bookmakers
            .filter((bookmaker) => bookmaker.isLogged)
            .sort((bookmakerA, bookmakerB) => {
                if (bookmakerA.rawBalance === bookmakerB.rawBalance) {
                    return bookmakerA.displayName.localeCompare(bookmakerB.displayName)
                }

                return bookmakerB.rawBalance - bookmakerA.rawBalance;
            });

        const maxBalance = filteredBookmakers[0]?.rawBalance;

        return filteredBookmakers.map((bookmaker) => ({
            name: bookmaker.name,
            balance: bookmaker.balance,
            rawBalance: bookmaker.rawBalance,
            percentage: maxBalance ?
                (bookmaker.rawBalance / maxBalance) * 100 :
                0,
        }))
    }, [bookmakers]);

    const zeroBalanceBookmakers = bookmakers
        .filter((bookmaker) => bookmaker.isLogged && bookmaker.rawBalance === 0)
        .length === 1 && output.length === 1;

    return (
        <div
            className = {classnames(styles['mba-wrapper'], styles[wrapperClassName])}
            data-testid = "Container__MyBookmakersAccountsBalanceWrapper"
        >
            <ul
                className = {classnames(styles['mba-list'], styles[mbaListClassName])}
                data-testid = "Container__MyBookmakersAccountsBalanceList"
            >
                {output.map((bookmaker) => (
                    <BookmakerBalanceItem
                        key = {bookmaker.name}
                        hasZeroBalance = {zeroBalanceBookmakers}
                        {...bookmaker}
                    />
                ))}
            </ul>
            {!isMobile && (
                <div
                    className = {classnames(
                        styles['mba-balance__container'],
                        styles[mbaBalanceClassName],
                    )}
                    data-testid = "Container__MyBookmakerAccountsBalanceContainer"

                >
                    <div
                        className = {classnames(styles['mba-balance'])}
                        data-testid = "Container__MyBookmakerAccountsBalance"
                    >
                        <span
                            className = {classnames(
                                styles['mba-balance__text'],
                            )}
                            data-testid = "Text__MyBookmakerAccountsBalanceTotalAmountText"
                        >
                            Total balance
                        </span>
                        <span
                            className = {classnames(
                                styles['mba-balance__amount'],
                            )}
                            data-testid = "Text__MyBookmakerAccountsBalanceTotalAmount"
                        >
                            {totalBalance}
                        </span>
                    </div>
                    {totalFreeBetsBalance && (
                        <div
                            className = {classnames(
                                styles['mba-balance'],
                                styles['mba-balance__free-bets'],
                            )}
                            data-testid = "Container__MyBookmakerAccountsBalanceFreeBets"
                        >
                            <span
                                className = {styles['mba-balance-text']}
                                data-testid = "Text__MyBookmakerAccountsBalanceFreeBets"
                            >
                                Total free bets
                            </span>
                            <span
                                className = {classnames(
                                    styles['mba-balance__amount'],
                                    styles['mba-balance__amount-free-bets'],
                                )}
                                data-testid = "Text__MyBookmakerAccountsBalanceFreeBetsAmount"
                            >
                                <InfoBlackIcon />
                                {totalFreeBetsBalance}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
