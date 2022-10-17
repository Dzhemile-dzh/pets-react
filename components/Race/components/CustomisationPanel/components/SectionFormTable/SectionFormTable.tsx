import { ReactElement } from 'react';

import RadioButton from '@components/base/inputs/RadioButton';

import { useBreakPoint } from '@components/contexts/BreakPointContext';

const formTableButtons = [{
    value: 3,
    label: '3 lines',
},
{
    value: 6,
    label: '6 lines',
}];

interface SectionFormTableInterface {
    numberOfRecentRaces: number;
    handleUserPreferenceChange: (arg1: string | number | boolean, arg2: string) => void;
}

export const SectionFormTable = ({
    numberOfRecentRaces,
    handleUserPreferenceChange,
}: SectionFormTableInterface): ReactElement => {
    const { isMobile } = useBreakPoint();

    return (
        <RadioButton
            label = "Form table"
            value = {numberOfRecentRaces}
            buttons = {formTableButtons}
            handleRadioChange = {({ target: { value } }) => {
                handleUserPreferenceChange(Number(value), 'numberOfRecentRaces')
            }}
            className = "customisation-panel-radio-button"
            type = {isMobile ? 'horizontal' : 'vertical'}
            data-testid = "Container__CustomisationPanelFormTableRadioButtons"
        />
    )
}
