import React, { memo, ReactElement, useMemo } from 'react';
import Link from 'next/link';
import { ChevronIcon } from '../../../base/Icons/ChevronIcon';
import { EllipsisIcon } from '../../../base/Icons/EllipsisIcon';
import { MyBetsHistory } from '../MyBetsHistory';
import { UnsettledBetHistoryInterface } from '../../../interfaces/BetHistory';

import styles from './MyRecentBets.module.scss';
import { useBreakPoint } from '../../../contexts/BreakPointContext';

interface MyRecentBetsInterface {
    unsettledBetHistory: UnsettledBetHistoryInterface;
}

export const MyRecentBets = ({
    unsettledBetHistory,
}: MyRecentBetsInterface): ReactElement => {
    const { isMobile } = useBreakPoint();

    const betHistory = useMemo(() => {
        if (isMobile) {
            return unsettledBetHistory.unsettledBetHistoryBets.slice(0, 3);
        }
        return unsettledBetHistory.unsettledBetHistoryBets;
    }, [isMobile, unsettledBetHistory.unsettledBetHistoryBets]);

    return (
        <div
            className = {styles['my-recent-bets']}
            data-testid = "Container__MyRacingPostRecentBets"
        >
            <div
                className = {styles['my-recent-bets__header']}
                data-testid = "Container__MyRacingPostRecentBetsHeader"
            >
                <span
                    className = {styles['my-recent-bets__header-text']}
                    data-testid = "Text__MyRacingPostRecentBetsHeader"
                >
                    My recent bets
                </span>
                <Link href = "/my-bets">
                    <a
                        className = {styles['my-recent-bets__header-view-all-bets-link']}
                        data-testid = "Link__MyRacingPostRecentBetsAll"
                    >
                        <EllipsisIcon />
                    </a>
                </Link>
            </div>
            <div
                className = {styles['my-recent-bets__wrapper']}
                data-testid = "Container__MyRacingPostRecentBetsWrapper"
            >
                <div
                    className = {styles['my-recent-bets__bets-container']}
                    data-testid = "Container__MyRacingPostRecentBetsContainer"
                >
                    {betHistory.length === 0 ? (
                        <div
                            className = {styles['my-recent-bets__no-recent']}
                            data-testid = "Container__MyRacingPostNoRecentBets"
                        >
                            <span
                                className = {styles['my-recent-bets__bets-text']}
                                data-testid = "Text__MyRacingPostRecentBetsLabel"
                            >
                                Recent placed bets will show here
                            </span>
                            <Link href = "/today">
                                <a
                                    className = {styles['my-recent-bets__races-link']}
                                    data-testid = "Link__MyRacingPostTodaysRaces"
                                >
                                    <span
                                        className = {styles['my-recent-bets__races-text']}
                                        data-testid = "Text__MyRacingPostTodaysRaces"
                                    >
                                        See todays races
                                        <ChevronIcon
                                            className = {styles['my-recent-bets__races-svg']}
                                            size = "large"
                                        />
                                    </span>
                                </a>
                            </Link>
                        </div>
                    ) : (
                        <MyBetsHistory
                            betHistory = {betHistory}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export const MyRecentBetsMemo = memo(MyRecentBets);
