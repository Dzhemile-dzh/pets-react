import propTypes from 'prop-types';
import classnames from 'classnames';
import { useSelector } from 'react-redux';

import BookmakerThumb from '../BookmakerThumb';
import Button from '../../../base/inputs/Button';
import { ChevronIcon } from '../../../base/Icons/ChevronIcon';
import { CrossIcon } from '../../../base/Icons/CrossIcon';

import styles from './BetslipHeader.module.scss';

export const BetslipHeader = ({
    userBalance: {
        currencySign,
        formattedBalance,
    },
    selectedBookmaker,
    closeBetslipHandler,
    toggleBookmakersList,
}) => {
    const { name: bookmakerName } = useSelector((state) => {
        return state.bookmakersDetails.find((bookie) => bookie.feed === selectedBookmaker) || {}
    })

    return (
        <div
            className = {classnames(
                styles['bs-header'],
                selectedBookmaker && styles['bs-header--has-selected'],
            )}
            data-testid = "Container__BetslipHeader"
        >
            <span
                className = {styles['bs-header__title']}
                data-testid = "Text__BetslipHeaderTitle"
            >
                Betslip
            </span>
            <button
                className = {styles['bs-header__bookie-button']}
                onClick = {toggleBookmakersList}
                data-testid = "Button__BetslipHeaderBookie"
                type = "button"
            >
                {selectedBookmaker && bookmakerName ? (
                    <>
                        <BookmakerThumb
                            size = "small"
                            bookmakerName = {bookmakerName}
                        />
                        <span
                            className = {styles['bs-header__bookie-placeholder']}
                            data-testid = "Text__BetslipHeaderBookiePlaceholder"
                        >
                            {formattedBalance ?
                                `${currencySign} ${formattedBalance}` :
                                'Log in'}
                        </span>
                    </>
                ) : (
                    <span
                        className = {styles['bs-header__bookie-placeholder']}
                        data-testid = "Text__BetslipHeaderBookiePlaceholder"
                    >
                        Choose a bookmaker
                    </span>
                )}
                <ChevronIcon
                    color = "default"
                    size = "small"
                />
            </button>
            <div
                className = {styles['bs-header__close']}
                data-testid = "Container__BetslipHeaderClose"
            >
                <Button
                    styleType = "tertiary-icon"
                    className = {styles['bs-header__close-button']}
                    onClick = {() => { closeBetslipHandler() }}
                    data-testid = "Button__BetslipHeaderClose"
                >
                    <CrossIcon data-testid = "Icon__BetslipHeaderClose" />
                </Button>
            </div>
        </div>
    )
};

BetslipHeader.propTypes = {
    selectedBookmaker: propTypes.string,
    userBalance: propTypes.object.isRequired,
    closeBetslipHandler: propTypes.func.isRequired,
    toggleBookmakersList: propTypes.func.isRequired,
}
