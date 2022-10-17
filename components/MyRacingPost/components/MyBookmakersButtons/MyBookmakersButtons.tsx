import React from 'react';
import classnames from 'classnames';
import Button from '../../../base/inputs/Button';
import { ChevronIcon } from '../../../base/Icons/ChevronIcon';
import { useBreakPoint } from '../../../contexts/BreakPointContext';

import styles from './MyBookmakersButtons.module.scss';

interface MyBookmakersButtonsInterface {
    isZeroBalance?: boolean;
    isAddBtnShown?: boolean;
}

export const MyBookmakersButtons : React.FC<MyBookmakersButtonsInterface> = ((
    { isZeroBalance, isAddBtnShown },
) => {
    const { isMobile } = useBreakPoint();

    return (
        <div
            className = {styles['my-bookmakers-buttons']}
            data-testid = "Container__MyBookmakersButtons"
        >
            {!isMobile && !isAddBtnShown && (
                <div
                    className = {styles['my-bookmakers-buttons__add-bookmaker-btn']}
                    data-testid = "Container__MyBookmakersButtonsAddBookmaker"
                >
                    <Button
                        styleType = "tertiary"
                        data-testid = "Button__MyBookmakersButtonsAddBookmaker"
                    >
                        Add a bookmaker
                    </Button>
                </div>
            )}
            <div
                className = {styles['my-bookmakers-buttons__deposit-btn']}
                data-testid = "Container__MyBookmakersButtonsDeposit"
            >
                <Button
                    styleType = "tertiary"
                    data-testid = "Button__MyBookmakersButtonsDeposit"
                >
                    Deposit funds
                </Button>
                {isMobile && (
                    <ChevronIcon
                        className = {styles['my-bookmakers-buttons__deposit-btn-svg']}
                        size = "large"
                        data-testid = "Icon__MyBookmakersButtonsDeposit"
                    />
                )}
            </div>
            <div
                className = {styles['my-bookmakers-buttons__withdraw-btn']}
                data-testid = "Container__MyBookmakersButtonsWithdraw"
            >
                <Button
                    styleType = "tertiary"
                    disabled = {isZeroBalance}
                    data-testid = "Button__MyBookmakersButtonsWithdraw"
                >
                    Withdraw funds
                </Button>
                {isMobile && (
                    <ChevronIcon
                        className = {classnames(
                            styles['my-bookmakers-buttons__withdraw-btn-svg'],
                            {
                                [styles['my-bookmakers-buttons__withdraw-btn-svg-zero']]:
                                    isZeroBalance,
                            },
                        )}
                        size = "large"
                        data-testid = "Icon__MyBookmakersButtonsWithdraw"
                    />
                )}
            </div>
        </div>
    )
})

MyBookmakersButtons.displayName = 'Bookmaker Buttons';
