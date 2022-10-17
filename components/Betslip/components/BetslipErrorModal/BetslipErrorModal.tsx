import React, { useCallback } from 'react';
import Button from '../../../base/inputs/Button';
import { Modal } from '../../../base/Modal';

import styles from './BetslipErrorModal.module.scss';

interface IProps {
    errorText: string,
    closeModal: () => void,
    errorHeading?: string,
}

export const BetslipErrorModal: React.FC<IProps> = ({
    errorText,
    closeModal,
    errorHeading,
}) => {
    const closeModalCallback = useCallback(
        () => closeModal(),
        [closeModal],
    )

    return (
        <Modal>
            <div
                className = {styles['bs-error-modal__panel']}
                data-testid = "Container__BetslipErrorModal"
            >
                <div
                    className = {styles['bs-error-modal__header']}
                    data-testid = "Container__BetslipErrorModalHeader"
                >
                    <span
                        className = {styles['bs-error-modal__header-text']}
                        data-testid = "Text__BetslipModalHeader"
                    >
                        {errorHeading}
                    </span>
                </div>
                <div
                    className = {styles['bs-error-modal__body']}
                    data-testid = "Container__BetslipErrorModalBody"
                >
                    <span
                        className = {styles['bs-error-modal__body-text']}
                        data-testid = "Text__BetslipErrorModalBody"
                    >
                        {errorText}
                    </span>
                </div>
                <Button
                    styleType = "tertiary"
                    className = {styles['bs-error-modal__button-close']}
                    onClick = {closeModalCallback}
                    data-testid = "Button__BetslipErrorModalCloseItem"
                >
                    Close
                </Button>
            </div>
        </Modal>
    );
};
