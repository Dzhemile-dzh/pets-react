import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import propTypes from 'prop-types';
import classnames from 'classnames';

import BookmakerThumb from '../../../Betslip/components/BookmakerThumb';
import { ChevronIcon } from '../../../base/Icons/ChevronIcon';
import { InfoBlackIcon } from '../../../base/Icons/InfoBlackIcon';
import BookmakerLogoutButton from '../../../base/BookmakerLogoutButton';
import Tooltip from '../../../base/Tooltip';
import { MyBookmakersButtons } from '../../../MyRacingPost/components';
import { convertToPascalCase } from '../../../../project/utils/formatUtils';
import WindowMyBetsHistory from '../../../MyBets/components/WindowMyBetsHistory';
import { FreeBetsItems } from '../FreeBets';

import { openPopUpWindow } from '../../../../project/utils/helpers';
import { Constants } from '../../../../project/constants';
import { setSessionStorageItem } from '../../../../project/utils/storage';

import styles from './LoggedBookmakerItem.module.scss';

const {
    BET_HISTORY_STORAGE_ITEM,
    BOOKMAKER_NAMES: { SKYBET },
} = Constants;

export const LoggedBookmakerItem = React.memo(({
    name,
    username,
    balance,
    skybetBetHistoryUrl,
    feed,
    freeBetBalance,
    currencySign,
    freeBets,
}) => {
    const [isMyBetsHistoryWindowOpen, setIsMyBetsHistoryWindowOpen] = useState(false);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    const router = useRouter();

    const isZeroBalance = balance === '£0.00';
    const isSkyBet = name === SKYBET;
    const linkUrl = isSkyBet ? '' : '/my-bets';

    const onBetHistoryClick = useCallback(() => {
        if (isSkyBet && !!skybetBetHistoryUrl) {
            setIsMyBetsHistoryWindowOpen(true);
            openPopUpWindow('MyBetsHistory');
            return false;
        }

        if (!isSkyBet) {
            setSessionStorageItem(BET_HISTORY_STORAGE_ITEM, feed);
            router.push('/my-bets');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [feed, isSkyBet, skybetBetHistoryUrl]);

    return (
        <>
            <li
                className = {styles['lba-item']}
                data-testid = {`Container__LoggedBookmakerItem${convertToPascalCase(name)}`}
            >
                <div
                    className = {styles['lba-item__primary']}
                    data-testid = "Container__LoggedBookmakerItemPrimary"
                >
                    <div
                        className = {styles['lba-item__thumb']}
                        data-testid = "Container__LoggedBookmakerItemThumb"
                    >
                        <BookmakerThumb
                            bookmakerName = {name}
                        />
                    </div>
                    <div
                        className = {styles['lba-item__account']}
                        data-testid = "Container__LoggedBookmakerItemAccount"
                    >
                        <div
                            className = {styles['lba-item__account-username']}
                            data-testid = "Container__LoggedBookmakerItemAccountUsername"
                        >
                            <span
                                className = {styles['lba-item__account-username-text']}
                                data-testid = "Text__LoggedBookmakerItemAccountUsername"
                            >
                                {username}
                            </span>
                        </div>
                        <div
                            className = {styles['lba-item__account-bet-history']}
                            data-testid = "Container__LoggedBookmakerItemBetHistory"
                        >
                            <Link href = {linkUrl}>
                                <a
                                    onClick = {onBetHistoryClick}
                                    className = {
                                            styles['lba-item__view-all-bets-link']
                                        }
                                    data-testid = "Link__LoggedBookmakerItemViewAllBets"
                                >
                                    <span
                                        className = {styles['lba-item__account-bet-history-text']}
                                        data-testid = "Text__LoggedBookmakerItemBetHistory"
                                    >
                                        Bet history
                                    </span>
                                    <ChevronIcon
                                        color = "default"
                                        size = "small"
                                    />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div
                    className = {styles['lba-item__secondary']}
                    data-testid = "Container__LoggedBookmakerItemSecondary"
                >
                    <div
                        className = {styles['lba-item__balance-and-bets']}
                        data-testid = "Container__LoggedBookmakerItemBalanceAndBets"
                    >
                        <div
                            className = {styles['lba-item__balance']}
                            data-testid = "Container__LoggedBookmakerItemBalance"
                        >
                            <span
                                className = {styles['lba-item__balance-text']}
                                data-testid = "Text__LoggedBookmakerItemBalance"
                            >
                                Balance
                            </span>
                            <span
                                className = {styles['lba-item__balance-ammount']}
                                data-testid = "Text__LoggedBookmakerItemBalanceAmount"
                            >
                                {balance}
                            </span>
                        </div>

                        <div
                            className = {styles['lba-item__free-bets']}
                            data-testid = "Container__LoggedBookmakerItemFreeBets"
                        >
                            {freeBets.length > 0 && (
                                <>
                                    <span
                                        className = {styles['lba-item__free-bets-text']}
                                        data-testid = "Text__LoggedBookmakerItemFreeBets"
                                    >
                                        Free Bets
                                    </span>
                                    <span
                                        className = {styles['lba-item__free-bets-ammount']}
                                        data-testid = "Text__LoggedBookmakerItemFreeBetsAmount"
                                    >
                                        {freeBetBalance}
                                    </span>
                                    <Tooltip
                                        title = {(
                                            <div className =
                                                {styles['lba-item__free-bets-container']}
                                            >
                                                <FreeBetsItems
                                                    freeBets = {freeBets}
                                                    freeBetBalance = {freeBetBalance}
                                                    bookmakerName = {name}
                                                    currencySign = {currencySign}
                                                />
                                            </div>
                                    )}
                                        arrow
                                        open = {isTooltipOpen}
                                        placement = "bottom"
                                        classes = {
                                        {
                                            tooltip: classnames(
                                                styles['lba-item__free-bets-tooltip'],
                                            ),
                                            arrow: classnames(
                                                styles['lba-item__free-bets-arrow'],
                                                styles['lba-item__free-bets-arrow--popper'],
                                            ),
                                        }
                                    }
                                        data-testid = "Tooltip__LoggedBookmakerItemFreeBetsPopper"
                                    >
                                        <div
                                            onClick = {() => setIsTooltipOpen(!isTooltipOpen)}
                                            data-testid =
                                             "Button__LoggedBookmakerItemFreeBetsPopper"
                                            className = {styles['lba-item__free-bets-icon']}
                                        >
                                            <InfoBlackIcon
                                                color = "default"
                                                size = "small"
                                            />
                                        </div>
                                    </Tooltip>
                                </>

                            )}
                        </div>
                    </div>
                    <div
                        className = {styles['lba-item__buttons']}
                        data-testid = "Container__LoggedBookmakerItemButtons"
                    >
                        <div
                            className = {styles['my-racing-post__my-bookmakers-buttons']}
                            data-testid = "Container__LoggedBookmakerItemMyBookmakersButtons"
                        >
                            <MyBookmakersButtons
                                isAddBtnShown
                                isZeroBalance = {isZeroBalance}
                            />
                        </div>
                        <BookmakerLogoutButton
                            className = {styles['lba-item__logout-button']}
                            bookmakerName = {name}
                            size = "small"
                        />
                    </div>
                </div>
            </li>
            {
                isMyBetsHistoryWindowOpen && !!skybetBetHistoryUrl && (
                    <WindowMyBetsHistory
                        onClose = {() => setIsMyBetsHistoryWindowOpen(false)}
                        url = {skybetBetHistoryUrl}
                    />
                )
            }
        </>
    )
})

LoggedBookmakerItem.displayName = 'BookmakerLoggedAccountItem';

LoggedBookmakerItem.propTypes = {
    name: propTypes.string,
    username: propTypes.string,
    balance: propTypes.string,
    freeBetBalance: propTypes.string,
    skybetBetHistoryUrl: propTypes.string,
}
