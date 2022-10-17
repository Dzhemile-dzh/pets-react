/* eslint-disable max-len */
import classnames from 'classnames';
import MultipleItemSelection from '../MultipleItemSelection';
import { MultipleReceiptItemInterface } from '../../../../../interfaces/BetReceipt';

import styles from './MultipleReceiptItem.module.scss';

export const MultipleReceiptItem = ({
    betId,
    betType,
    numberLines,
    potentialReturns,
    stake,
    currency,
    multipleSelections,
    freeBetStake,
}: MultipleReceiptItemInterface) : React.ReactElement => (
    <li
        className = {styles['bs-bet-receipt-multiple-item']}
        data-testid = "Container__MultiReceiptItemContainer"
    >
        <div className = {styles['bs-bet-receipt-multiple-item__primary']}>
            <div className = {styles['bs-bet-receipt-multiple-item__bet-type']}>
                <span
                    className = {styles['bs-bet-receipt-multiple-item__bet-type-label']}
                    data-testid = "Text__MultiReceiptItemBetTypeLabel"
                >
                    {betType}
                </span>
                <span data-testid = "Text__MultiReceiptItemNumberLines">{`x${numberLines}`}</span>
            </div>
        </div>
        <div
            className = {styles['bs-bet-receipt-multiple-item__secondary']}
            data-testid = "Container__MultiReceiptItemSelections"
        >
            <MultipleItemSelection multipleBetItemSelections = {multipleSelections} />
        </div>
        <div
            className = {
                classnames(
                    styles['bs-bet-receipt-multiple-item__betting'],
                    {
                        [styles['bs-bet-receipt-multiple-item__betting--with-free-bet']]: freeBetStake > 0,
                    },
                )
            }
            data-testid = "Container__MultiReceiptItemBettingContainer"
        >
            <div className = {styles['bs-bet-receipt-multiple-item__unit-stake']}>
                <span
                    className = {styles['bs-bet-receipt-multiple-item__unit-stake-label']}
                    data-testid = "Text__MultiReceiptItemUnitStakeLabel"
                >
                        Unit stake
                </span>
                <div className = {styles['bs-bet-receipt-multiple-item__unit-stake-ammount']}>
                    <span
                        className = {styles['bs-bet-receipt-multiple-item__unit-stake-currency']}
                        data-testid = "Text__MultiReceiptItemUnitStakeCurrency"
                    >
                        {currency}
                    </span>
                    <span
                        className = {styles['bs-bet-receipt-multiple-item__unit-stake-value']}
                        data-testid = "Text__MultiReceiptItemUnitStakeValue"
                    >
                        {stake}
                    </span>
                </div>
            </div>
            <div className = {styles['bs-bet-receipt-multiple-item__stake']}>
                <span
                    className = {styles['bs-bet-receipt-multiple-item__stake-label']}
                    data-testid = "Text__MultiReceiptItemStakeLabel"
                >
                        Total stake
                </span>
                <div className = {styles['bs-bet-receipt-multiple-item__stake-ammount']}>
                    <span
                        className = {styles['bs-bet-receipt-multiple-item__stake-currency']}
                        data-testid = "Text__MultiReceiptItemStakeCurrency"
                    >
                        {currency}
                    </span>
                    <span
                        className = {styles['bs-bet-receipt-multiple-item__stake-value']}
                        data-testid = "Text__MultiReceiptItemStakeValue"
                    >
                        {((Number(stake) * Number(numberLines) - Number(freeBetStake))).toFixed(2)}
                    </span>
                    { freeBetStake > 0 &&
                            (
                                <span
                                    className = {styles['bs-bet-receipt-multiple-item__free-bet-stake-value']}
                                    data-testid = "Text__MultiReceiptItemFreeBetStakeValue"
                                >
                                    {`+ ${currency}${Number(freeBetStake).toFixed(2)} free bet`}
                                </span>
                            )}
                </div>
            </div>
            <div className = {styles['bs-bet-receipt-multiple-item__returns']}>
                <span
                    className = {styles['bs-bet-receipt-multiple-item__returns-label']}
                    data-testid = "Text__MultiReceiptItemReturnsLabel"
                >
                        Estimated returns
                </span>
                <div className = {styles['bs-bet-receipt-multiple-item__returns-ammount']}>
                    <span
                        className = {styles['bs-bet-receipt-multiple-item__returns-currency']}
                        data-testid = "Text__MultiReceiptItemReturnsCurrency"
                    >
                        {currency}
                    </span>
                    <span
                        className = {styles['bs-bet-receipt-multiple-item__returns-value']}
                        data-testid = "Text__MultiReceiptItemReturnsValue"
                    >
                        {potentialReturns || 'N/A'}
                    </span>
                </div>
            </div>
        </div>
        <div
            className = {styles['bs-bet-receipt-multiple-item__separator']}
            data-testid = "Container__MultiReceiptItemSeparatorContainer"
        />
        <div className = {styles['bs-bet-receipt-multiple-item__receipt-number']}>
            <span
                className = {styles['bs-bet-receipt-multiple-item__receipt-label']}
                data-testid = "Text__MultiReceiptItemReceiptLabel"
            >
                    Receipt number
            </span>
            <span
                className = {styles['bs-bet-receipt-multiple-item__receipt-value']}
                data-testid = "Text__MultiReceiptItemReceiptValue"
            >
                {betId}
            </span>
        </div>
    </li>
)
