import {
    ReactElement, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { Actions } from '@project/common';
import { Constants } from '@project/constants';
import { withBookmakerAccounts } from '@store/providers';
import { setAppCookie } from '@project/utils/helpers';
import Panel from '../../../base/Panel'
import SideDrawer from '../../../base/SideDrawer'

import SectionRunnerInformation from './components/SectionRunnerInformation';
import SectionOdds from './components/SectionOdds';
import SectionFormTable from './components/SectionFormTable';
import SectionButtons from './components/SectionButtons';

import { CardCustomizationInterface } from '../../../interfaces/Race';
import { BookmakerInterface } from '../../../interfaces/Bookmaker';
import { useBreakPoint } from '../../../contexts/BreakPointContext';
import useEffectOnce from '../../../custom-hooks/useEffectOnce';

import styles from './CustomisationPanel.module.scss';

const { DEFAULT_BOOKIE, RUNNER_INFO: { EXTENDED } } = Constants;

interface CustomisationPanelProps {
    bookmakers: Array<BookmakerInterface>;
    cardCustomization: CardCustomizationInterface;
    changeCustomozationSettings: (arg: CardCustomizationInterface) => void;
    hideModal: () => void;
    raceId: string;
    selectedBookmaker: string;
}

export const CustomisationPanel = ({
    bookmakers,
    cardCustomization,
    changeCustomozationSettings,
    hideModal,
    raceId,
    selectedBookmaker,
    // subscribeAllBookmakers,
    // updateBetSelectionsAndSelectBookmaker,
}: CustomisationPanelProps): ReactElement => {
    const { isMobile } = useBreakPoint();
    const dispatch = useDispatch();

    const [isApplyBtnDisabled, setIsApplyBtnDisabled] = useState(true);
    const [userPreferences, setUserPreferences] = useState(cardCustomization);
    const [areUserPreferencesChanged, setAreUserPreferencesChanged] = useState(false);
    const [currentBookmaker, setCurrentBookmaker] = useState(selectedBookmaker || DEFAULT_BOOKIE);

    useEffectOnce(() => dispatch(Actions.subscribeAllBookmakers(isMobile)));

    useEffect(() => {
        const isBookmakerChanged = currentBookmaker !== selectedBookmaker;
        const userPreferencesChanged = Object.keys(userPreferences)
            .some((key) => userPreferences[key] !== cardCustomization[key]);

        setIsApplyBtnDisabled(!isBookmakerChanged && !userPreferencesChanged);
        setAreUserPreferencesChanged(userPreferencesChanged);
    }, [cardCustomization, currentBookmaker, selectedBookmaker, userPreferences])

    useEffect(() => {
        setAppCookie(Constants.SELECTED_BOOKMAKER_COOKIE, currentBookmaker);
    })

    const handleRunnerInfoChange = useCallback((value) => {
        setUserPreferences({
            ...userPreferences,
            showRunnerBasicInfo: value !== EXTENDED,
            showRunnerAdditionalInfo: value === EXTENDED,
        });
    }, [userPreferences])

    const handleUserPreferenceChange = useCallback((value, preference) => {
        setUserPreferences({
            ...userPreferences,
            [preference]: value,
        });
    }, [userPreferences]);

    const onApplyBtnClick = useCallback(() => {
        if (currentBookmaker !== selectedBookmaker) {
            dispatch(Actions.resetSortedByUpdateOddsFlag(raceId));
            dispatch(Actions.updateBetSelectionsAndSelectBookmaker(currentBookmaker));
        }

        if (areUserPreferencesChanged) {
            changeCustomozationSettings(userPreferences);
        }

        hideModal();
    }, [
        areUserPreferencesChanged,
        changeCustomozationSettings,
        currentBookmaker,
        dispatch,
        hideModal,
        raceId,
        selectedBookmaker,
        userPreferences,
    ]);

    const bookmakersList = useMemo(() => {
        return [
            {
                displayName: 'Best Odds',
                feed: DEFAULT_BOOKIE,
                name: 'bestoddsbookmaker',
            },
            ...bookmakers,
        ].sort((first, second) => first.displayName.localeCompare(second.displayName))
    }, [bookmakers])

    const {
        priceType,
        numberOfRecentRaces,
        showRunnerBasicInfo,
        showOdds,
        runnersSortedBy,
    } = userPreferences;

    const Wrapper = isMobile ? SideDrawer : Panel;

    const title = isMobile ? 'Settings' : 'Customise Racecard'

    return (
        <Wrapper
            isOpen = {isMobile}
            onClose = {hideModal}
            title = {title}
            purpose = "Customisation"
            subtitle = "Choose what you see on the racecards"
            showHeader
        >
            <div
                className = {styles['customisation-panel__content-wrapper']}
                data-testid = "Container__CustomisationPanelContent"
            >
                <SectionRunnerInformation
                    handleRunnerInfoChange = {handleRunnerInfoChange}
                    handleUserPreferenceChange = {handleUserPreferenceChange}
                    runnersSortedBy = {runnersSortedBy}
                    showRunnerBasicInfo = {showRunnerBasicInfo}
                />
                <SectionOdds
                    bookmakersList = {bookmakersList}
                    currentBookmaker = {currentBookmaker}
                    handleBookmakerChange = {setCurrentBookmaker}
                    handleUserPreferenceChange = {handleUserPreferenceChange}
                    priceType = {priceType}
                    showOdds = {showOdds}
                />
                <SectionFormTable
                    numberOfRecentRaces = {numberOfRecentRaces}
                    handleUserPreferenceChange = {handleUserPreferenceChange}
                />
            </div>
            <SectionButtons
                hideModal = {hideModal}
                isApplyBtnDisabled = {isApplyBtnDisabled}
                onApplyBtnClick = {onApplyBtnClick}
            />
        </Wrapper>
    )
}

export const CustomisationPanelWith = withBookmakerAccounts(
    CustomisationPanel,
    ['bookmakers', 'selectedBookmaker'],
    null,
)
