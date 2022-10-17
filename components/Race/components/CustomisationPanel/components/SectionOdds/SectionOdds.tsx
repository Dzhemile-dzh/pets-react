import { FC } from 'react';
import { Constants } from '@project/constants';
import { ChevronIcon } from '@components/base/Icons/ChevronIcon';
import Select from '@components/base/Select';
import SlideToggle from '@components/base/inputs/SlideToggle';
import Toggle from '@components/base/inputs/Toggle';
import { BookmakerInterface } from '@components/interfaces/Bookmaker';

import styles from '../../CustomisationPanel.module.scss';

const { ODDS_TYPES: { FRACTIONAL, DECIMAL } } = Constants;

const priceTypeButtons = [{
    optionLabel: '1.00',
    optionValue: DECIMAL,
}, {
    optionLabel: '1/0',
    optionValue: FRACTIONAL,
}];

interface SectionOddsInterface {
    bookmakersList: Array<Omit<BookmakerInterface, 'loginType' | 'logoutType' | 'isRecent' |
    'lastLoggedInDate' | 'isLogged' | 'username' | 'balance' | 'rawBalance' | 'loginUrl' |
    'logoutUrl' | 'freeBets' | 'freeBetBalance' | 'freeBetExpiryDatetime' | 'depositDetails'>>;
    currentBookmaker: string;
    handleBookmakerChange: (arg: string) => void;
    handleUserPreferenceChange: (arg1: string | number | boolean, arg2: string) => void;
    priceType: string;
    showOdds: boolean;
}

export const SectionOdds : FC<SectionOddsInterface> = ({
    bookmakersList,
    currentBookmaker,
    handleBookmakerChange,
    handleUserPreferenceChange,
    priceType,
    showOdds,
}) => (
    <div
        className = {styles['customisation-panel__odds']}
        data-testid = "Container__CustomisationPanelOdds"
    >
        <Toggle
            handleClick = {(value) => handleUserPreferenceChange(value, 'showOdds')}
            defaultOption = {showOdds}
            purpose = "Odds"
            className = "customisation-panel-toggle"
        >
            <Toggle.Label
                label = "Odds shown"
                className = "customisation-panel-toggle"
            />
            <Toggle.Button
                className = "customisation-panel-toggle"
            />
        </Toggle>
        {
            showOdds && (
                <div
                    className = {styles['customisation-panel__bookmaker-odds']}
                    data-testid = "Container__CustomisationPanelBookmakerOdds"
                >
                    <Select
                        hasCustomSelectedOption
                        className = "customisation-panel__select"
                        onSelect = {handleBookmakerChange}
                        value = {currentBookmaker}
                    >
                        <Select.SelectedOption
                            postfix = {(
                                <div
                                    className = {
                                        styles['customisation-panel__dropdown-chevron']
                                    }
                                >
                                    <ChevronIcon
                                        data-testid = "Select__ChevronIcon"
                                    />
                                </div>
                            )}
                            placeholder = {currentBookmaker}
                            options = {bookmakersList}
                            labelPropertyName = "displayName"
                            valuePropertyName = "feed"
                            className = "customisation-panel__custom-selected-option"
                        />
                        {bookmakersList.map((bookmaker) => (
                            <Select.Option
                                key = {bookmaker.displayName}
                                value = {bookmaker.feed}
                                className = "customisation-panel"
                            >
                                <span data-testid = "Option__Label">
                                    {bookmaker.displayName}
                                </span>
                            </Select.Option>
                        ))}
                    </Select>
                    <SlideToggle
                        currentOption = {priceType}
                        className = {styles['customisation-panel__slide-toggle']}
                        handleClick = {(value) => {
                            handleUserPreferenceChange(value, 'priceType')
                        }}
                        purpose = "PriceType"
                    >
                        {priceTypeButtons.map((button, index) => (
                            <SlideToggle.Button
                                key = {index}
                                optionLabel = {button.optionLabel}
                                optionValue = {button.optionValue}
                                className = {styles['customisation-panel__slide-toggle-button']}
                            />
                        ))}
                    </SlideToggle>
                </div>
            )
        }
    </div>
)
