/* eslint-disable max-len */
import {
    ReactElement, useCallback, useMemo,
} from 'react';

import { useBreakPoint } from '@components/contexts/BreakPointContext';
import { Constants } from '@project/constants';
import RadioButton from '@components/base/inputs/RadioButton';
import SortByDropdown from '../../../SortByDropdown';

import styles from '../../CustomisationPanel.module.scss';

const { RUNNER_INFO: { STANDARD, EXTENDED } } = Constants;

interface SectionRunnerInformationInterface {
    handleRunnerInfoChange: (arg: string) => void;
    showRunnerBasicInfo: boolean;
    handleUserPreferenceChange: (arg1: string, arg2: string) => void;
    runnersSortedBy: string;
}

export const SectionRunnerInformation = ({
    handleRunnerInfoChange,
    handleUserPreferenceChange,
    runnersSortedBy,
    showRunnerBasicInfo,
}: SectionRunnerInformationInterface): ReactElement => {
    const { isMobile } = useBreakPoint();

    const changeRunnersSortedBy = useCallback((value) => {
        handleUserPreferenceChange(value, 'runnersSortedBy');
    }, [handleUserPreferenceChange]);

    const runnerInfoButtons = useMemo(() => [{
        value: STANDARD,
        label: 'Standard',
        className: 'customisation-panel-radio-button',
        children: (
            <div
                className = {styles['customisation-panel-radio-button__children']}
                data-testid = "Container__RunnerInformationStandard"
            >
                <span
                    className = {styles['customisation-panel-radio-button__description']}
                    data-testid = "Text__RunnerInformationStandardDescription"
                >
                    Jockey (Jky), Trainer (Tnr), Last results (LR), Odds movement, Last run, Age, Weight (Wgt), Racing Post Rating (RPR).
                </span>
                {showRunnerBasicInfo && (
                    <SortByDropdown
                        runnersSortedBy = {runnersSortedBy}
                        changeRunnersSortedBy = {changeRunnersSortedBy}
                        className = "customisation-panel"
                    />
                )}
            </div>
        ),
    },
    {
        value: EXTENDED,
        label: 'Extended',
        className: styles['customisation-panel-radio-button__option-control'],
        children: (
            <div
                className = {styles['customisation-panel-radio-button__children']}
                data-testid = "Container__RunnerInformationExtended"
            >
                <span
                    className = {styles['customisation-panel-radio-button__description']}
                    data-testid = "Text__RunnerInformationExtendedDescription"
                >
                    All data from Standard view plus;  Official rating (OR), Topspeed rating, Headgear (Hdgr), Wind operations (Wind op).
                </span>
                {!showRunnerBasicInfo && (
                    <SortByDropdown
                        runnersSortedBy = {runnersSortedBy}
                        changeRunnersSortedBy = {changeRunnersSortedBy}
                        className = "customisation-panel"
                    />
                )}
            </div>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }], [runnersSortedBy, showRunnerBasicInfo]);

    if (!isMobile) {
        return null;
    }

    return (
        <div
            className = {styles['customisation-panel__runner-info']}
            data-testid = "Container__CustomisationPanelRunnerInformation"
        >
            <RadioButton
                label = "Runner information"
                value = {showRunnerBasicInfo ? STANDARD : EXTENDED}
                buttons = {runnerInfoButtons}
                handleRadioChange = {({ target: { value } }) => {
                    handleRunnerInfoChange(value)
                }}
                className = "customisation-panel-radio-button"
                data-testid = "Container__CustomisationPanelRunnerInformationRadioButtons"
            />
        </div>
    )
}
