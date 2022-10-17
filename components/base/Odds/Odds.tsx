import {
    FC, useMemo, useCallback, memo,
} from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

import { Actions } from '@project/common';

import { ChevronIcon } from '../Icons/ChevronIcon';
import {
    oddsButtonEvent,
    setBetslipId,
    betBasketCreatedEvent,
    discardBetslipEvent,
    removeSelectionEvent,
} from '../../../project/segmentEvents';

import { useBetslip } from '../../contexts/BetslipContext';
import { OddsInterface, BetOptionInterface, StateInterface } from '../../interfaces';
import { Constants } from '../../../project/constants';

import styles from './Odds.module.scss';

const { BET_TYPES, ODDS_TYPES } = Constants;

export const Odds : FC<OddsInterface> = memo(({
    betOptions,
    betSelection,
    betSelectionsCount,
    hideHistory,
    isDiffusionLoaded,
    isInBetslip,
    priceData,
    priceType,
    race,
    runner,
    selectedBookmaker,
    shouldShowFavLabel = false,
    showCompareOdds,
    historicalOddsClassName,
    betButtonOddsClassName,
    showOdds,
}) => {
    const { toggleBetslip } = useBetslip();
    const bookmakersDetails = useSelector((state: StateInterface) => state.bookmakersDetails);
    const dispatch = useDispatch();

    const price = priceData?.[priceType];

    const handleClick = useCallback(
        () => {
            const bookmakerConfig = bookmakersDetails.find(
                (bookmaker) => selectedBookmaker === bookmaker.feed,
            );

            if (isInBetslip) {
                if (betSelectionsCount === 1) {
                    discardBetslipEvent(bookmakerConfig?.displayName);
                }

                const betOption = betOptions.find((option: BetOptionInterface) => {
                    return option.betType === BET_TYPES.SINGLE &&
                option.betSelections.includes(runner.uid);
                });

                dispatch(Actions.removeBetSelection(runner.uid));
                removeSelectionEvent(bookmakerConfig?.displayName, {
                    ...betSelection,
                    isSpSelected: betOption?.ui.isSpSelected,
                });
            } else if (betSelectionsCount < 10) {
                if (betSelectionsCount === 0) {
                    setBetslipId();

                    betBasketCreatedEvent({
                        bookmakerName: bookmakerConfig?.displayName,
                        areOddsFractional: priceType === ODDS_TYPES.FRACTIONAL,
                    });

                    toggleBetslip();
                }

                dispatch(Actions.addBetSelection(betSelection));
                oddsButtonEvent(betSelection, bookmakerConfig, priceType, race, runner);
            }
        },
        [
            betOptions,
            betSelection,
            betSelectionsCount,
            bookmakersDetails,
            dispatch,
            isInBetslip,
            priceType,
            race,
            runner,
            selectedBookmaker,
            toggleBetslip,
        ],
    )

    const oddsTitle = (!price || price.odd === '-') ?
        'no odds available' : `${priceData?.isFav ? 'favorite ' : ''}${price?.odd.replace(
            '/',
            ' to ',
        )} odds`;

    const oddsHistorical = useMemo(() => {
        return price
            ?.historical
            ?.map((odd, index) => (
                <span
                    key = {index}
                    data-testid = {`Text__${index}__OddsPreviousValue`}
                >
                    {odd}
                </span>
            ))
    }, [price]);

    return (
        <div
            className = {classnames(
                styles.odds,
                {
                    [styles['odds--in-betslip']]: isInBetslip,
                },
            )}
            data-testid = "Container__Odds"
        >
            {
                isDiffusionLoaded && (
                    <div className = {classnames(
                        styles.odds__container,
                        {
                            [styles['odds__container--in-betslip']]: isInBetslip,
                        },
                    )}
                    >
                        <button
                            className = {
                                classnames(
                                    styles['odds__bet-button'],
                                    betButtonOddsClassName,
                                    {
                                        [styles['odds__bet-button--in-betslip']]: isInBetslip,
                                    },
                                    {
                                        [styles['odds__bet-button--has-price']]: price,
                                    },
                                )
                            }
                            onClick = {handleClick}
                            title = {oddsTitle}
                            type = "button"
                            disabled = {!price || price.odd === '-'}
                            data-testid = "Button__OddsCurrent"
                        >
                            {
                                shouldShowFavLabel && priceData?.isFav && (
                                    <div
                                        className = {classnames(
                                            styles['odds__fav-label'],
                                            {
                                                [styles['odds__fav-label--in-betslip']]:
                                            isInBetslip,
                                            },
                                        )}
                                        aria-hidden = "true"
                                        data-testid = "Text__OddsCurrentLabel"
                                    >
                                        FAV
                                    </div>
                                )
                            }
                            <span
                                className = {classnames(
                                    styles.odds__value,
                                    {
                                        [styles['odds__value--in-betslip']]: isInBetslip,
                                    },
                                )}
                                aria-hidden = "true"
                                data-testid = "Text__OddsCurrentValue"
                            >
                                {price && showOdds ? price.odd : '-'}
                            </span>
                            <span
                                className = {styles['odds__in-betslip-label']}
                                data-testid = "Text__IsOddsInBetslip"
                            >
                                {isInBetslip && 'in betslip'}
                            </span>
                        </button>
                    </div>
                )
            }
            {
                !hideHistory && price && price.historical && (
                    <div
                        className = {classnames(
                            styles.odds__historical,
                            historicalOddsClassName,
                        )}
                        data-testid = "Container__OddsPrevious"
                    >
                        {oddsHistorical}
                    </div>
                )
            }
            {
                isDiffusionLoaded && showCompareOdds && (
                    <Link href = "/coming-soon">
                        <a className = {styles['odds__compare-link']}>
                            Compare odds
                            <ChevronIcon size = "xs" color = "primary" />
                        </a>
                    </Link>
                )
            }
        </div>
    )
})

Odds.displayName = 'Odds';
