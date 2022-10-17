import React, { PureComponent } from 'react'
import Link from 'next/link';
import propTypes from 'prop-types'
import { ChevronIcon } from '../../../base/Icons/ChevronIcon';
import { PartialLogoIcon } from '../../../base/Icons/PartialLogoIcon';
import MyBookmakerAccountsBalance from '../MyBookmakerAccountsBalance/index';

import styles from './BookmakerAccountsHeader.module.scss';

export class BookmakerAccountsHeader extends PureComponent {
    render() {
        const {
            headerTitle,
            isLogged,
            bookmakers,
            totalBalance,
        } = this.props;

        const subtitle = 'Log in below to see your bookmaker accounts';

        return (
            <section
                className = {styles['bookmaker-accounts-header']}
                data-testid = "Container__BookmakerAccountsHeader"
            >
                <div
                    className = {styles['bookmaker-accounts-header__wrapper']}
                    data-testid = "Container__BookmakerAccountsHeaderWrapper"
                >
                    <div
                        className = {styles['bookmaker-accounts-header__left-side']}
                        data-testid = "Container__BookmakerAccountsHeaderLeftSide"
                    >
                        <div
                            className = {styles['bookmaker-accounts-header__heading']}
                            data-testid = "Container__BookmakerAccountsHeading"
                        >
                            <PartialLogoIcon
                                className = {styles['bookmaker-accounts-header__logo']}
                                data-testid = "Icon__BookmakerAccountsHeaderLogo"
                            />
                            <h1
                                data-testid = "Text__BookmakerAccountsHeadingTitle"
                            >
                                <span
                                    className = {styles['bookmaker-accounts-header__title']}
                                    data-testid = "Text__BookmakerAccountsHeaderTitle"
                                >
                                    {headerTitle}
                                </span>
                            </h1>
                        </div>
                        {subtitle && (
                            <div
                                className = {styles['bookmaker-accounts-header__sub-heading']}
                                data-testid = "Container__BookmakerAccountsSubHeading"
                            >
                                <span
                                    className = {styles['bookmaker-accounts-header__sub-title']}
                                    data-testid = "Text__BookmakerAccountsHeaderSubTitle"
                                >
                                    {subtitle}
                                </span>
                            </div>
                        )}
                    </div>
                    {isLogged && (
                    <div
                        className = {styles['bookmaker-accounts-header__right-side']}
                        data-testid = "Container__BookmakerAccountsHeaderRightSide"
                    >
                        <MyBookmakerAccountsBalance
                            bookmakers = {bookmakers}
                            totalBalance = {totalBalance}
                            wrapperClassName = "mba-wrapper__bookmaker-accounts"
                            mbaListClassName = "mba-list__bookmaker-accounts"
                            mbaBalanceClassName = "mba-balance__container-bookmaker-accounts-header"
                        />
                        <div
                            className = {styles['bookmaker-accounts-header__bet-history']}
                            data-testid = "Container__BookmakerAccountsHeaderBetHistory"
                        >
                            <Link href = "/my-bets">
                                <a
                                    data-testid = "Link__BookmakerAccountsHeaderBetHistory"
                                >
                                    <span
                                        className =
                                            {styles['bookmaker-accounts-header__bet-history-text']}
                                        data-testid = "Text__BookmakerAccountsHeaderBetHistory"
                                    >
                                        View your bet history
                                        <ChevronIcon
                                            size = "large"
                                            className = {
                                                styles['bookmaker-accounts-header__bet-history-svg']
                                            }
                                            data-testid = "Icon__BookmakerAccountsHeaderBetHistory"
                                        />
                                    </span>
                                </a>
                            </Link>
                        </div>
                    </div>
                    )}
                </div>
            </section>
        );
    }
}

BookmakerAccountsHeader.propTypes = {
    headerTitle: propTypes.string.isRequired,
    isLogged: propTypes.bool,
    bookmakers: propTypes.array,
    totalBalance: propTypes.string,
}
