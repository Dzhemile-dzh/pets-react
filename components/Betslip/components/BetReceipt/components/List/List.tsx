import React from 'react';
import moment from 'moment-timezone';
import OptionsHeader from '../OptionsHeader';
import SingleReceiptItem from '../SingleReceiptItem';
import MultipleReceiptItem from '../MultipleReceiptItem';
import {
    BetReceiptItemInterface,
    BetSelectionsInterface,
} from '../../../../../interfaces/BetReceipt';
import { UserBalanceInterface } from '../../../../../interfaces/Betslip';
import { Constants } from '../../../../../../project/constants';

import styles from './List.module.scss';

const { DATE_FORMATS: { DD_MMM_YYYY } } = Constants;

interface ListProps {
    betReceipts: Array<BetReceiptItemInterface>,
    betSelections: BetSelectionsInterface,
    userBalance: UserBalanceInterface,
    priceType: string,
}

export const List = ({
    betReceipts,
    betSelections,
    userBalance,
    priceType,
}: ListProps) : React.ReactElement => {
    const renderReceiptSinglesList = () => {
        const output = [];
        let singleBets = 0;

        if (betReceipts !== null && betReceipts !== undefined) {
            const singleBetOptions = betReceipts.filter((option) => option.betType === 'single');
            const selections = Object.values(betSelections);

            for (let i = 0; i < singleBetOptions.length; i++) {
                for (let j = 0; j < selections.length; j++) {
                    const betReceiptItem = singleBetOptions[i];
                    const betSelectionItem = selections[j];

                    if (betReceiptItem.betSelections[0].selectionId ===
                        betSelectionItem.selectionDetails.selectionId) {
                        const {
                            runnerInfo,
                            raceInfo,
                            selectionDetails,
                            displayPrice,
                        } = betSelectionItem;
                        const isStartingPrice = betReceiptItem.betSelections[0] ?
                            betReceiptItem.betSelections[0].isStartingPrice : false;
                        const isEachWay = betReceiptItem.numberLines ?
                            betReceiptItem.numberLines > 1 : false;
                        const stake = betReceiptItem.stakePerLine ?
                            (isEachWay ? betReceiptItem.stakePerLine * 2 :
                                betReceiptItem.stakePerLine) : 0;
                        const date = moment(raceInfo ? raceInfo.date : '').format(DD_MMM_YYYY);

                        const singleItemData = {
                            key: betReceiptItem.id,
                            betId: betReceiptItem.id,
                            startTime: raceInfo ? raceInfo.startTime : '',
                            meetingName: raceInfo ? raceInfo.meetingName : '',
                            places: raceInfo ? raceInfo.eachWayData.places : '',
                            payOut: raceInfo ? raceInfo.eachWayData.payOut : '',
                            startPosition: runnerInfo ? runnerInfo.startPosition : '',
                            horseName: runnerInfo ? runnerInfo.horseName : '',
                            betType: betReceiptItem ? betReceiptItem.betType : '',
                            numberLines: betReceiptItem?.numberLines,
                            displayPrice: displayPrice ? displayPrice[priceType] : '',
                            freeBetStake: betReceiptItem.freeBetStake,
                            potentialReturns: betReceiptItem.potentialReturns ?
                                betReceiptItem.potentialReturns.toFixed(2) : '',
                            useBestOddsGuaranteed: selectionDetails ?
                                selectionDetails.useBestOddsGuaranteed : false,
                            isStartingPrice,
                            isEachWay,
                            stake: stake.toFixed(2),
                            date,
                        };

                        output.push(singleItemData);
                        singleBets += betReceiptItem.numberLines;
                    }
                }
            }
        }

        return output.length > 0 ? (
            <div
                className = {styles['bs-bet-receipt-list__singles']}
                data-testid = "Container__BetReceiptSingles"
            >
                <OptionsHeader
                    count = {singleBets}
                    isSingles
                    isMultiples = {false}
                />
                <ul
                    className = {styles['bs-bet-receipt-list__singles-list']}
                    data-testid = "List__BetReceiptSingles"
                >
                    {output.map((item) => (
                        <SingleReceiptItem
                            key = {`receiptID=${item.key}`}
                            {...item}
                            currency = {userBalance.currencySign}
                        />
                    ))}
                </ul>
            </div>
        ) : null
    }

    const renderReceiptMultiplesList = () => {
        const multipleBets = betReceipts
            .filter((option) => option.betType !== 'single')
            .map((item) => {
                const filteredMultipleSelections = Object.keys(betSelections)
                    .filter((betSelection) => betSelections[betSelection]
                        .selectionDetails.selectionId ===
                    item.betSelections.find((betReceiptBetSelection) => {
                        return betReceiptBetSelection.selectionId ===
                        betSelections[betSelection].selectionDetails.selectionId
                    })?.selectionId)

                const multipleSelections = Object.values(filteredMultipleSelections)
                    .map((selection) => {
                        const receiptSelection = item.betSelections
                            .filter((itemSel) => itemSel?.selectionId ===
                    betSelections[selection]?.selectionDetails?.selectionId);

                        return {
                            horseName: betSelections[selection]?.runnerInfo?.horseName || '',
                            runnerNumber: betSelections[selection]?.runnerInfo?.startPosition || '',
                            date: betSelections[selection]?.raceInfo?.date || '',
                            startTime: betSelections[selection]?.raceInfo?.startTime || '',
                            meetingName: betSelections[selection]?.raceInfo?.meetingName || '',
                            useBestOddsGuaranteed: receiptSelection[0]?.useBestOddsGuaranteed ||
                            false,
                            isStartingPrice: receiptSelection[0]?.isStartingPrice || false,
                            displayPrice: betSelections[selection]?.displayPrice[priceType] || '',
                        }
                    })

                return {
                    key: item?.id,
                    betId: item?.id,
                    betType: item?.betType || '',
                    numberLines: item?.numberLines,
                    freeBetStake: item.freeBetStake,
                    potentialReturns: item?.potentialReturns?.toFixed(2) || 'N/A',
                    stake: item?.stakePerLine?.toFixed(2) || '',
                    multipleSelections,
                }
            })

        return multipleBets.length > 0 ? (
            <div
                className = {styles['bs-bet-receipt-list__multiples']}
                data-testid = "Container__BetReceiptMultiples"
            >
                <OptionsHeader
                    count = {multipleBets.length}
                    isMultiples
                    isSingles = {false}
                />
                <ul
                    className = {styles['bs-bet-receipt-list__multiples-list']}
                    data-testid = "List__BetReceiptMultiples"
                >
                    {multipleBets.map((item) => (
                        <MultipleReceiptItem
                            key = {`receiptID=${item.key}`}
                            {...item}
                            currency = {userBalance.currencySign}
                        />
                    ))}
                </ul>
            </div>
        ) : null
    }

    return (
        <div
            className = {styles['bs-bet-receipt-list']}
            data-testid = "Container__BetReceiptList"
        >
            {renderReceiptSinglesList()}
            {renderReceiptMultiplesList()}
        </div>
    )
}
