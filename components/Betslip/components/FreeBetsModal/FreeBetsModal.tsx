import React, {
    useMemo,
    useState,
    useRef,
    ReactElement,
} from 'react';
import moment from 'moment';
import { Modal } from '../../../base/Modal';
import useOutsideClick from '../../../custom-hooks/useOutsideClick';
import Button from '../../../base/inputs/Button';
import RadioButton from '../../../base/inputs/RadioButton';
import { Constants } from '../../../../project/constants';
import { compareDateAndTime } from '../../../../project/utils/dateUtils';
import { FreeBetInterface } from '../../../interfaces';
import { useBreakPoint } from '../../../contexts/BreakPointContext';

import styles from './FreeBetsModal.module.scss';

const { DATE_FORMATS: { DD_MMMM_YYYY } } = Constants;

interface FreeBetsModalInterface {
    freeBets: Array<FreeBetInterface>;
    currencySign: string;
    totalFreeBetsBalance: string;
    hideModal: () => void;
    applyFreeBetForSpecificOption: (
        selectedFreeBet: string,
        amount: number
    ) => void;
}

export const FreeBetsModal = ({
    freeBets,
    currencySign,
    totalFreeBetsBalance,
    hideModal,
    applyFreeBetForSpecificOption,
}: FreeBetsModalInterface): ReactElement => {
    // Note:
    // pre-select the first available free bet option
    const initialSelectedFreeBet = freeBets.find((bet) => !bet.betOptionId).id;
    const [selectedFreeBet, setSelectedFreeBet] = useState<string>(initialSelectedFreeBet);
    const freeBetModalRef = useRef(null);
    const { isMobile } = useBreakPoint();

    const freeBetsRadioButtons = useMemo(() => {
        return freeBets.map((item) => {
            const isDateExpiring = compareDateAndTime(item.expiry, 'hours') > -24;
            return {
                value: item.id,
                label: `${currencySign}${item.amount} Free Bet`,
                children: isDateExpiring && (
                    <p className = {styles['free-bets-modal__bet-expiriration']}>
                        exp {moment(item.expiry).format(DD_MMMM_YYYY)}
                        <span className = {styles['free-bets-modal__exclamation-mark']}>
                            !
                        </span>
                        <span className = {styles['free-bets-modal__expires-soon-label']}>
                            Expires soon
                        </span>
                    </p>
                ),
                disabled: Boolean(item.betOptionId),
            }
        })
    }, [currencySign, freeBets]);

    useOutsideClick(
        freeBetModalRef,
        null,
        [hideModal, isMobile],
        () => {
            if (!isMobile) {
                hideModal();
            }
        },
    );

    return (
        <Modal>
            <div
                className = {styles['free-bets-modal']}
                ref = {freeBetModalRef}
            >
                <div
                    className = {styles['free-bets-modal__header']}
                    data-testid = "Container__FreeBetsModalHeader"
                >
                    <h5 data-testid = "Text__FreeBetsModalHeader">
                        Want to use a Free Bet?
                    </h5>
                </div>
                <div
                    className = {styles['free-bets-modal__body']}
                    data-testid = "Container__FreeBetsModalBody"
                >
                    <p data-testid = "Text__FreeBetsModalTotalFreeBetsBalance">
                        Total {currencySign} <span>{totalFreeBetsBalance}</span>
                    </p>
                    <RadioButton
                        value = {selectedFreeBet}
                        buttons = {freeBetsRadioButtons}
                        handleRadioChange = {(e) => { setSelectedFreeBet(e.target.value) }}
                        className = "free-bets-modal-radio-button"
                    />
                </div>
                <div
                    className = {styles['free-bets-modal__footer']}
                    data-testid = "Container__FreeBetsModalFooter"
                >
                    <Button
                        className = {styles['free-bets-modal__cancel-button']}
                        styleType = "tertiary"
                        onClick = {hideModal}
                        data-testid = "Button__FreeBetsModalCancel"
                    >
                        cancel
                    </Button>
                    <Button
                        className = {styles['free-bets-modal__apply-button']}
                        styleType = "primary"
                        onClick = {() => applyFreeBetForSpecificOption(
                            selectedFreeBet,
                            freeBets.find((bet) => bet.id === selectedFreeBet).amount,
                        )}
                        isDisabled = {!selectedFreeBet}
                        data-testid = "Button__FreeBetsModalApply"
                    >
                        apply
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
