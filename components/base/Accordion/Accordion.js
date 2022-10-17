import React, { useState, useCallback } from 'react'
import propTypes from 'prop-types'
import classnames from 'classnames';
import { ChevronIcon } from '../Icons/ChevronIcon';

import styles from './Accordion.module.scss';

export const Accordion = ({
    onChange,
    headerContent,
    headerContentAdditional,
    openedContent,
    isOnBettingReturns,
    isOnRaceIndex,
    isOnVerdict,
    isAccordionDisabled,
    accordionHeaderClassName,
    accordionButtonClassName,
    shouldShowAccordionButton = true,
    dataTestIdPrefix,
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const onShowMoreClick = useCallback(() => {
        setIsOpen((prevIsOpen) => !prevIsOpen)
        onChange && onChange(!isOpen);
    }, [isOpen, onChange])

    return (
        <section
            className = {classnames(
                styles.accordion,
                {
                    [styles['accordion-betting-returns']]: isOnBettingReturns,
                },
                {
                    [styles['accordion-verdict']]: isOnVerdict,
                },
                {
                    [styles['accordion--disabled']]: isAccordionDisabled,
                },
            )}
            data-testid = {`Container__Accordion${dataTestIdPrefix}`}
        >
            <div
                className = {classnames(
                    styles.accordion__header,
                    accordionHeaderClassName,
                    {
                        [styles['accordion__header-betting-returns']]: isOnBettingReturns,
                    },
                )}
                aria-expanded = {isOpen}
                onClick = {onShowMoreClick}
                data-testid = {`Container__Accordion${dataTestIdPrefix}Header`}
            >
                <div
                    className = {classnames(
                        styles.accordion__content,
                        {
                            [styles['accordion__content-betting-returns']]: isOnBettingReturns,
                            [styles['accordion__content-race-index']]: isOnRaceIndex,
                        },
                        {
                            [styles['accordion__content-verdict']]: isOnVerdict,
                        },
                    )}
                    data-testid = {`Container__Accordion${dataTestIdPrefix}HeaderContent`}
                >
                    {headerContent}
                    {!isAccordionDisabled && shouldShowAccordionButton && (
                        <div
                            className = {classnames(
                                styles.accordion__button,
                                styles.accordion__svg,
                                accordionButtonClassName,
                            )}
                            data-testid = {`Container__Accordion${dataTestIdPrefix}Button`}
                        >
                            <ChevronIcon
                                color = "black"
                                size = "normal"
                                transform = {isOpen ? 'rotate' : ''}
                                dataTestId = {`Button__Accordion${dataTestIdPrefix}`}
                            />
                        </div>
                    )}
                </div>
                {isOpen && headerContentAdditional}
            </div>
            {isOpen && (
            <div
                className = {classnames(
                    styles.accordion__body,
                    {
                        [styles['accordion__body-betting-returns']]: isOnBettingReturns,
                    },
                )}
                data-testid = {`Container__Accordion${dataTestIdPrefix}Body`}
            >
                {openedContent}
            </div>
            )}
        </section>
    )
}

Accordion.propTypes = {
    headerContent: propTypes.element.isRequired,
    headerContentAdditional: propTypes.element,
    openedContent: propTypes.element.isRequired,
    onChange: propTypes.func,
    isOnBettingReturns: propTypes.bool,
    isOnRaceIndex: propTypes.bool,
    isOnVerdict: propTypes.bool,
    isAccordionDisabled: propTypes.bool,
    accordionHeaderClassName: propTypes.string,
    accordionButtonClassName: propTypes.string,
    shouldShowAccordionButton: propTypes.bool,
    dataTestIdPrefix: propTypes.string.isRequired,
}
