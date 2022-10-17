import { FC, useMemo } from 'react';

import { useBreakPoint } from '@components/contexts/BreakPointContext';

import Button from '@components/base/inputs/Button';

import styles from '../../CustomisationPanel.module.scss';

interface SectionButtonsInterface {
    hideModal: () => void;
    isApplyBtnDisabled: boolean;
    onApplyBtnClick: () => void;
}

export const SectionButtons : FC<SectionButtonsInterface> = ({
    hideModal,
    isApplyBtnDisabled,
    onApplyBtnClick,
}) => {
    const { isMobile } = useBreakPoint();

    const buttons = useMemo(() => {
        const applyButton = {
            styleType: 'primary',
            className: styles['customisation-panel__apply-button'],
            isDisabled: isApplyBtnDisabled,
            onClick: onApplyBtnClick,
            dataTestId: 'Button__CustomisationPanelApply',
            text: 'Apply',
        };

        return isMobile ?
            [applyButton] :
            [{
                styleType: 'tertiary',
                className: styles['customisation-panel__cancel-button'],
                isDisabled: false,
                onClick: hideModal,
                dataTestId: 'Button__CustomisationPanelCancel',
                text: 'Cancel',
            }, applyButton];
    }, [hideModal, isApplyBtnDisabled, isMobile, onApplyBtnClick]);

    return (
        <div
            className = {styles['customisation-panel__divider-buttons']}
            data-testid = "Container__CustomisationPanelDividerButtons"
        >
            <div
                className = {styles['customisation-panel__buttons']}
                data-testid = "Container__CustomisationPanelButtons"
            >
                {buttons.map((button) => (
                    <Button
                        key = {button.text}
                        styleType = {button.styleType}
                        className = {button.className}
                        isDisabled = {button.isDisabled}
                        onClick = {button.onClick}
                        data-testid = {button.dataTestId}
                    >
                        {button.text}
                    </Button>
                ))}
            </div>
        </div>
    )
}
