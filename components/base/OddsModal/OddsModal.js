import React, { memo } from 'react'
import propTypes from 'prop-types';
import { Modal } from '../Modal';
import BookmakerThumb from '../../Betslip/components/BookmakerThumb';
import { CrossIcon } from '../Icons/CrossIcon';

import styles from './OddsModal.module.scss';

export const OddsModal = memo(({
    closeModal,
    selectedBookmakerData,
    previousSelectedBookmaker,
    showPreviouslyViewed,
    oddsMainText = 'Odds displayed on Racing Post have been changed to:',
    oddsMessageText = (
        <>
            <b>{selectedBookmakerData.displayName || ''}</b>
            odds will show on all racecards
            and be the default odds in the betslip.
        </>
    ),
}) => {
    return (
        <Modal isModalOpen>
            <div className = {styles['odds-modal']}>
                <div className = {styles['odds-modal__header']}>
                    <div
                        className = {styles['odds-modal__close-button']}
                        role = "button"
                        onClick = {closeModal}
                    >
                        <CrossIcon color = "dark-grey" />
                    </div>

                </div>
                <div className = {styles['odds-modal__body']}>
                    <span className = {styles['odds-modal__main-text']}>
                        {oddsMainText}
                    </span>
                    <BookmakerThumb bookmakerName = {selectedBookmakerData.name} />
                    <span className = {styles['odds-modal__message']}>
                        {oddsMessageText}
                    </span>
                    <span className = {styles['odds-modal__previous-text']}>
                        {showPreviouslyViewed &&
                        `(You were previously viewing ${previousSelectedBookmaker.displayName})`}
                    </span>
                </div>
            </div>
        </Modal>
    );
});

OddsModal.propTypes = {
    closeModal: propTypes.func,
    previousSelectedBookmaker: propTypes.object,
    selectedBookmakerData: propTypes.object,
    oddsMainText: propTypes.string,
    oddsMessageText: propTypes.element,
    showPreviouslyViewed: propTypes.bool,
}

OddsModal.displayName = 'OddsModal';
