import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link'
import Button from '../../../../../base/inputs/Button';

import styles from './Footer.module.scss';

interface FooterProps {
    onReceiptClickHandler: (value: boolean | void) => void,
    nextRaceLink?: string,
    todaysRacesLink?: string,
    latestRacesLink?: string,
}

export const Footer = ({
    nextRaceLink,
    todaysRacesLink,
    latestRacesLink,
    onReceiptClickHandler,
}: FooterProps) : React.ReactElement => {
    return (
        <div
            className = {styles['bs-bet-receipt-footer']}
            data-testid = "Container__BetReceiptFooter"
        >
            <div
                className = {styles['bs-bet-receipt-footer__buttons']}
                data-testid = "Container__BetReceiptFooterButtons"
            >
                <Button
                    styleType = "secondary"
                    className = {styles['bs-bet-receipt-footer__re-use-selection-btn']}
                    onClick = {() => { onReceiptClickHandler(true) }}
                    data-testid = "Button__BetReceiptFooterReUseSelections"
                >
                    Re-use selections
                </Button>
                <Button
                    styleType = "secondary"
                    className = {styles['bs-bet-receipt-footer__close-betslip-btn']}
                    onClick = {() => { onReceiptClickHandler() }}
                    data-testid = "Button__BetReceiptFooterClose"
                >
                    Close betslip
                </Button>
            </div>
            <div
                className = {styles['bs-bet-receipt-footer__main']}
                data-testid = "Container__BetReceiptFooterMain"
            >
                <hr />
                <div
                    className = {styles['bs-bet-receipt-footer__next-race-off']}
                    data-testid = "Container__BetReceiptFooterNextRaceOff"
                >
                    <div
                        className = {styles['bs-bet-receipt-footer__svg']}
                    >
                        <Image
                            src = "/svgs/double_arrow.svg"
                            width = {16}
                            height = {16}
                        />
                    </div>
                    <Link
                        href = {nextRaceLink || '/'}
                    >
                        <a
                            className = {styles['bs-bet-receipt-footer__next-race-url']}
                            data-testid = "Link__BetReceiptFooterNextRace"
                        >
                            Next race off
                        </a>
                    </Link>
                </div>
                <hr />
                <div
                    className = {styles['bs-bet-receipt-footer__todays-races']}
                    data-testid = "Container__BetReceiptFooterTodaysRaces"
                >
                    <div
                        className = {styles['bs-bet-receipt-footer__svg']}
                    >
                        <Image
                            src = "/svgs/calendar_black.svg"
                            width = {18}
                            height = {18}
                        />
                    </div>
                    <Link
                        href = {todaysRacesLink || '/'}
                    >
                        <a
                            className = {styles['bs-bet-receipt-footer__todays-races-url']}
                            data-testid = "Link__BetReceiptFooterTodaysRaces"
                        >
                            Today’s races and results
                        </a>
                    </Link>
                </div>
                <hr />
                <div
                    className = {styles['bs-bet-receipt-footer__latest-news']}
                    data-testid = "Container__BetReceiptFooterLatestNews"
                >
                    <div
                        className = {styles['bs-bet-receipt-footer__svg']}
                    >
                        <Image
                            src = "/svgs/news.svg"
                            width = {20}
                            height = {20}
                        />
                    </div>
                    <Link
                        href = {latestRacesLink || '/'}
                    >
                        <a
                            className = {styles['bs-bet-receipt-footer__latest-news-url']}
                            data-testid = "Link__BetReceiptFooterLatestNews"
                        >
                            Latest horse racing news
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export const FooterMemo = memo(Footer);
