import React, { PureComponent } from 'react'
import propTypes from 'prop-types';
import { ChevronIcon } from '../../../base/Icons/ChevronIcon';
import styles from './BookmakerAccountsHeader.module.scss';

export class BookmakerAccountsHeaderMobile extends PureComponent {
    render() {
        const {
            headerTitle,
            totalBalance,
            handleBackButtonClick,
            isBackBtnActive,
        } = this.props;

        return (
            <section
                className = {styles['bookmaker-accounts-header']}
                data-testid = "Container__BookmakerAccountsHeader"
            >
                <div
                    className = {styles['bookmaker-accounts-header__content']}
                    data-testid = "Container__BookmakerAccountsHeaderContent"
                >
                    <div
                        className = {styles['bookmaker-accounts-header__heading']}
                        data-testid = "Container__BookmakerAccountsHeading"
                    >
                        {isBackBtnActive && (
                        <div
                            onClick = {handleBackButtonClick}
                            className = {styles['bookmaker-accounts-header__back-button']}
                            data-testid = "Container__BookmakerAccountsHeadingBackButton"
                        >
                            <ChevronIcon size = "small" color = "black" />
                            back
                        </div>
                        )}
                        <h1
                            data-testid = "Text__BookmakerAccountsHeader"
                        >
                            <span
                                className = {styles['bookmaker-accounts-header__title']}
                                data-testid = "Text__BookmakerAccountsHeaderTitle"
                            >
                                {headerTitle}
                            </span>
                        </h1>
                    </div>
                    {totalBalance && (
                    <div
                        className = {styles['bookmaker-accounts-header__balance']}
                        data-testid = "Container__BookmakerAccountsHeaderBalance"
                    >
                        <span
                            className = {styles['bookmaker-accounts-header__balance-text']}
                            data-testid = "Text__BookmakerAccountsHeaderBalance"
                        >
                            Total balance
                        </span>
                        <span
                            className = {styles['bookmaker-accounts-header__balance-amount']}
                            data-testid = "Text__BookmakerAccountsHeaderBalanceAmount"
                        >
                            {totalBalance}
                        </span>
                    </div>
                    )}
                </div>
            </section>
        );
    }
}

BookmakerAccountsHeaderMobile.propTypes = {
    headerTitle: propTypes.string.isRequired,
    totalBalance: propTypes.string,
}
