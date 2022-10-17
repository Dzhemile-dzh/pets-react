import React, {
    memo,
    useCallback,
} from 'react';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';

import BookmakerThumb from '../BookmakerThumb';
import { Modal } from '../../../base/Modal';
import { CrossIcon } from '../../../base/Icons/CrossIcon';

import styles from './BetslipModal.module.scss';

export function BetslipModal({ bookmakerFeed, closeModal }) {
    const { displayName, name } = useSelector((state) => {
        return state.bookmakersDetails.find((bookie) => bookie.feed === bookmakerFeed) || {}
    })

    // closeModal must be reference to the closing function
    // So we can call it here
    const closeModalCallback = useCallback(
        () => closeModal(),
        [closeModal],
    )

    return (
        <Modal>
            <div
                className = {styles['bs-modal__panel']}
                data-testid = "Container__BetslipModal"
            >
                <div
                    className = {styles['bs-modal__header']}
                    data-testid = "Container__BetslipModalHeader"
                >
                    <span
                        className = {styles['bs-modal__header-text']}
                        data-testid = "Text__BetslipModalHeader"
                    >
                        You’ve changed bookmakers
                    </span>
                    <button
                        className = {styles['bs-modal__button-close']}
                        onClick = {closeModalCallback}
                        data-testid = "Button__BetslipModalClose"
                        type = "button"
                    >
                        <CrossIcon />
                    </button>
                </div>
                <div
                    className = {styles['bs-modal__body']}
                    data-testid = "Container__BetslipModalBody"
                >
                    <BookmakerThumb bookmakerName = {name} />
                    <span
                        className = {styles['bs-modal__body-text']}
                        data-testid = "Text__BetslipModalBody"
                    >
                        You are now using {displayName} odds to place your bets
                    </span>
                </div>
            </div>
        </Modal>
    )
}

export const BetslipModalMemo = memo(BetslipModal);

BetslipModal.propTypes = {
    bookmakerFeed: propTypes.string.isRequired,
    closeModal: propTypes.func.isRequired,
}
