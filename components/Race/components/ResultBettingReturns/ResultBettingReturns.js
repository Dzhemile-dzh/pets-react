import React, { useCallback, useMemo, useState } from 'react';
import propTypes from 'prop-types';
import Image from 'next/image';
import classnames from 'classnames';
import { useBreakPoint } from '../../../contexts/BreakPointContext';
import Accordion from '../../../base/Accordion';
import ShowMoreButton from '../ShowMoreButton';
import { convertToPascalCase } from '../../../../project/utils/formatUtils';

import styles from './ResultBettingReturns.module.scss';

const Item = ({ label, value, classname }) => (
    <div
        className = {classnames(
            styles['detail-item'],
            {
                [styles[`detail-item__${classname}`]]: classname,
            },
        )}
        data-testid = {label && `Container__RaceItem${convertToPascalCase(label)}`}
    >
        {
            label && (
            <div
                className = {styles['detail-item__label']}
                data-testid = {label && `Text__RaceItem${convertToPascalCase(label)}Label`}
            >
                {label}
            </div>
            )
        }
        {
            value && (
                <div
                    className = {styles['detail-item__value']}
                    data-testid = {label && `Text__RaceItem${convertToPascalCase(label)}Value`}
                >
                    {value}
                </div>
            )
        }
    </div>
)

Item.propTypes = {
    label: propTypes.string,
    value: propTypes.any,
    classname: propTypes.string,
}

const noBettingReturnsInfo = (
    <div className = {styles['result-betting-returns__no-betting-info']}>
        <span>There is no Betting Return information available for this race yet</span>
    </div>
)

export const ResultBettingReturns = ({
    totalStartingPrice,
    bettingReturns,
}) => {
    const [isOpen, setOpen] = useState(false);
    const toggleOpen = useCallback(() => setOpen((prev) => !prev), [])
    const { isMobile } = useBreakPoint();

    const {
        toteWin,
        place1,
        place2,
        place3,
        place4,
        straightForecast,
        tricast,
        trifecta,
        jackpot,
        placepot,
        quadpot,
        rule4Value,
        rule4Text,
        exacta,
    } = bettingReturns

    const place = `${place1} ${place2} ${place3} ${place4}`;
    const isBettingReturnsAvailable = Object.keys(bettingReturns).length !== 0;

    const headerContent = useMemo(() => (
        <div
            className = {styles['result-betting-returns__heading']}
            data-testid = "Container__ResultBettingReturnsHeading"
        >
            <Image
                src = "/svgs/returns_red.svg"
                className = {styles['result-betting-returns__logo']}
                width = {24}
                height = {24}
            />
            <div
                className = {styles['result-betting-returns__title']}
                data-testid = "Container__ResultBettingReturnsTitle"
            >
                <span data-testid = "Text__ResultBettingReturnsTitle">BETTING RETURNS</span>
            </div>
            {!isMobile && (
                <ShowMoreButton
                    openedLabel = "Hide betting returns"
                    closedLabel = "Take a look"
                    className = {styles['result-betting-returns__show-more-button']}
                    isOpen = {isOpen}
                />
            )}
        </div>
    ), [isMobile, isOpen]);

    const detailsFirstColumn = [
        {
            className: 'detail__total-starting-price',
            value: totalStartingPrice || '',
            label: 'Total starting price',
        },
        {
            className: 'detail__tote-win',
            value: toteWin || '',
            label: 'Tote win',
        },
        {
            className: 'detail__place',
            value: place || '',
            label: 'place',
        },
        {
            className: 'detail__straight-forecast',
            value: straightForecast || '',
            label: 'Straight forecast',
        },
    ];

    const detailsSecondColumn = [
        {
            className: 'detail__exacta',
            value: exacta || '',
            label: 'exacta',
        },
        {
            className: 'detail__tricast',
            value: tricast || '',
            label: 'tricast',
        },
        {
            className: 'detail__trifecta',
            value: trifecta || '',
            label: 'trifecta',
        },
        {
            className: 'detail__jackpot',
            value: jackpot || '',
            label: 'jackpot',
        },
    ];

    const openedContent = isBettingReturnsAvailable ? (
        <div
            className = {styles['result-betting-returns__content']}
            data-testid = "Container__ResultBettingReturnsContent"
        >
            <div
                className = {styles['result-betting-returns__group']}
                data-testid = "Container__ResultBettingReturnsGroupFirst"
            >
                {detailsFirstColumn.map((detail, index) => (
                    <Item
                        key = {index}
                        className = {detail.className}
                        value = {detail.value}
                        label = {detail.label}
                    />
                ))}
            </div>
            <div
                className = {styles['result-betting-returns__group']}
                data-testid = "Container__ResultBettingReturnsGroupSecond"
            >
                {detailsSecondColumn.map((detail, index) => (
                    <Item
                        key = {index}
                        className = {detail.className}
                        value = {detail.value}
                        label = {detail.label}
                    />
                ))}
            </div>
            <div
                className = {styles['result-betting-returns__group']}
                data-testid = "Container__ResultBettingReturnsGroupThird"
            >
                <Item
                    classname = "placepot"
                    value = {(
                        <span>
                            {placepot}
                            <span className = {styles['detail__value--normal-weight']}>
                                {` ${rule4Text}`}
                            </span>
                        </span>
                            )}
                    label = "Placepot"
                    accessibilityText = {`${placepot} ${rule4Value}`}
                />
                <Item
                    classname = "quadpot"
                    value = {quadpot}
                    label = "Quadpot"
                />
            </div>
        </div>
    ) : noBettingReturnsInfo;

    const openedContentMobile = isBettingReturnsAvailable ? (
        <div
            className = {styles['result-betting-returns__content']}
            data-testid = "Container__ResultBettingReturnsContent"
        >
            <div
                className = {styles['result-betting-returns__group']}
                data-testid = "Container__ResultBettingReturnsGroupFirst"
            >
                <Item
                    className = {styles.detail__item}
                    value = {totalStartingPrice}
                    label = "Total starting price"
                />
                <Item
                    className = {styles.detail__item}
                    value = {place}
                    label = "place"
                />
                <Item
                    className = {styles.detail__item}
                    value = {exacta}
                    label = "exacta"
                />
            </div>
            <div
                className = {styles['result-betting-returns__group']}
                data-testid = "Container__ResultBettingReturnsGroupSecond"
            >
                <Item
                    className = {styles.detail__item}
                    value = {toteWin}
                    label = "Tote win"
                />

                <Item
                    className = {styles.detail__item}
                    value = {tricast}
                    label = "tricast"
                />

                <Item
                    className = {styles.detail__item}
                    value = {trifecta}
                    label = "Trifecta"
                />
            </div>
            <div
                className = {styles['result-betting-returns__group']}
                data-testid = "Container__ResultBettingReturnsGroupThird"
            >
                <Item
                    className = {styles.detail__item}
                    value = {straightForecast}
                    label = "Straight forecast"
                />
                <Item
                    className = {styles.detail__item}
                    value = {jackpot}
                    label = "Jackpot"
                />
                <Item
                    className = {styles.detail__item}
                    value = {(
                        <span>
                            {placepot}
                            <span className = {styles['detail__value--normal-weight']}>
                                {` ${rule4Text}`}
                            </span>
                        </span>
                            )}
                    label = "Placepot"
                    accessibilityText = {`${placepot} ${rule4Value}`}
                />
                <Item
                    className = {styles.detail__quadpot}
                    value = {quadpot}
                    label = "Quadpot"
                />
            </div>
        </div>
    ) : noBettingReturnsInfo;

    return (
        <div
            className = {classnames(
                styles['result-betting-returns'],
                {
                    [styles['result-betting-returns--open']]: isOpen,
                },
            )}
            data-testid = "Container__ResultBettingReturns"
        >
            <Accordion
                headerContent = {headerContent}
                openedContent = {isMobile ? openedContentMobile : openedContent}
                onChange = {toggleOpen}
                isOnBettingReturns
                dataTestIdPrefix = "BettingReturns"
            />
        </div>
    );
}

ResultBettingReturns.propTypes = {
    bettingReturns: propTypes.object.isRequired,
    totalStartingPrice: propTypes.string.isRequired,
}
