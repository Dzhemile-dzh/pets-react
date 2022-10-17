import React from 'react';

import { BookmakerAccountsHeaderMobile } from '../BookmakerAccountsHeader';
import BookmakerThumb from '../../../Betslip/components/BookmakerThumb';
import FreeBetItem from '../../../Betslip/components/FreeBetsPopover/FreeBetItem';

import { Constants } from '../../../../project/constants';

import styles from './FreeBets.module.scss';

const { DATE_FORMATS: { DD_MMM_YYYY } } = Constants;

interface FreeBetItemInterface {
    amount: number,
    description: string,
    expiry: string,
    id: string,
    maxStake: number,
    minStake: number,
    type: string,
}
interface FreeBetsInterface {
    freeBets: Array<FreeBetItemInterface>,
    freeBetBalance: string,
    bookmakerName: string,
    currencySign: string,
    onBackBtnClick: () => void,
}

type FreeBetsItemsInterface =
    Omit<FreeBetsInterface, 'freeBetBalance' | 'bookmakerName' | 'onBackBtnClick'>

export const FreeBetsItems = ({
    freeBets,
    currencySign,
}: FreeBetsItemsInterface): React.ReactElement => (
    <ul
        className = {styles['free-bets__list']}
        data-testid = "Container__FreeBetsList"
    >
        {freeBets.map((freeBet) => (
            <FreeBetItem
                key = {freeBet.id}
                bets = {freeBet}
                currencySign = {currencySign}
                dateFormat = {DD_MMM_YYYY}
            />
        ))}
    </ul>
)

export const FreeBets = ({
    freeBets,
    freeBetBalance,
    bookmakerName,
    currencySign,
    onBackBtnClick,
}: FreeBetsInterface) => (
    <>
        <BookmakerAccountsHeaderMobile
            headerTitle = "FREE BETS"
            isBackBtnActive
            handleBackButtonClick = {onBackBtnClick}
        />
        <div
            className = {styles['free-bets__wrapper']}
            data-testid = "Container__FreeBetsWrapper"
        >
            <div
                className = {styles['free-bets__title']}
                data-testid = "Container__FreeBetsTitle"
            >
                <div
                    className = {styles['free-bets__thumb-container']}
                    data-testid = "Container__FreeBetsThumb"
                >
                    <BookmakerThumb
                        className = {styles[`ba-page__header__bookmaker-thumb--${bookmakerName}`]}
                        bookmakerName = {`${bookmakerName}square`}
                        size = "auto"
                    />
                </div>
                <span
                    className = {styles['free-bets__title-text']}
                    data-testid = "Text__FreeBetsTitleText"
                >
                    Total Free Bets {freeBetBalance}
                </span>
            </div>
            <FreeBetsItems freeBets = {freeBets} currencySign = {currencySign} />
        </div>
    </>
)
