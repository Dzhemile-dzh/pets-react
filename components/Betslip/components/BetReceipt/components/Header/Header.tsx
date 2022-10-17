import React, { memo } from 'react';
import RacingPostLogo from '../../../../../base/RacingPostLogo';
import BookmakerIcon from '../../../../../base/BookmakerIcon';
import { CrossIcon } from '../../../../../base/Icons/CrossIcon';
import { PartialLogoIcon } from '../../../../../base/Icons/PartialLogoIcon';

import styles from './Header.module.scss';

interface HeaderProps {
    onReceiptClickHandler?: () => void,
    selectedBookmakerName?: string,
    showBookmakerMessage?: boolean,
}

export const Header = ({
    selectedBookmakerName,
    showBookmakerMessage,
    onReceiptClickHandler,
}: HeaderProps) : React.ReactElement => {
    return (
        <div
            className = {styles['bs-bet-receipt-header']}
            data-testid = "Container__BetReceiptHeader"
        >
            <div
                className = {styles['bs-bet-receipt-header__text-1']}
                data-testid = "Container__BetReceiptHeaderTextOne"
            >
                <PartialLogoIcon />
                <span data-testid = "Text__BetReceiptHeaderTextOne">Thank you</span>
                {showBookmakerMessage ? (
                    <button
                        className = {styles['bs-bet-receipt-header__close']}
                        onClick = {() => { onReceiptClickHandler() }}
                        data-testid = "Button__BetReceiptHeaderClose"
                        type = "button"
                    >
                        <CrossIcon
                            size = "normal"
                            color = "black"
                        />
                    </button>
                ) : null}
            </div>
            <div
                className = {styles['bs-bet-receipt-header__text-2']}
                data-testid = "Container__BetReceiptHeaderTextTwo"
            >
                <span
                    data-testid = "Text__BetReceiptHeaderTextTwo"
                >
                    for betting through
                </span>
                <RacingPostLogo
                    height = "11px"
                    width = "98px"
                />
            </div>
            {showBookmakerMessage ? (
                <div
                    className = {styles['bs-bet-receipt-header__text-3']}
                    data-testid = "Container__BetReceiptHeaderTextThree"
                >
                    <span
                        data-testid = "Text__BetReceiptHeaderTextThree"
                    >
                        You placed your bet with
                    </span>
                    <BookmakerIcon name = {`${selectedBookmakerName}whitebackground`} />
                </div>
            ) : (
                <div
                    className = {styles['bs-bet-receipt-header__divider']}
                    data-testid = "Container__BetReceiptHeaderTextThreeDivider"
                />
            )}

        </div>
    )
}

export const HeaderMemo = memo(Header);
