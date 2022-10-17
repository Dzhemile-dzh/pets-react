import { FC } from 'react';

import Select from '../../../base/Select';
import { ChevronIcon } from '../../../base/Icons/ChevronIcon';

import styles from './SortByDropdown.module.scss'

const sortOptions = [{
    name: 'odds',
    value: 'ODDS',
}, {
    name: 'horse number',
    value: 'SADDLECLOTH_NUMBER',
}];

interface SortByDropdownInterface {
    runnersSortedBy: string;
    changeRunnersSortedBy: (value: string) => void;
    className: string;
}

export const SortByDropdown : FC<SortByDropdownInterface> = ({
    runnersSortedBy,
    changeRunnersSortedBy,
    className,
}) => (
    <div
        data-testid = "Container__SortByDropdown"
        className = {styles[`${className}__dropdown`]}
    >
        <Select
            hasCustomSelectedOption
            className = {`${className}__select`}
            value = {runnersSortedBy}
            onSelect = {changeRunnersSortedBy}
        >
            <Select.SelectedOption
                placeholder = "odds"
                labelPropertyName = "name"
                valuePropertyName = "value"
                title = "Sort by"
                className = {`${className}__custom-selected-option`}
                options = {sortOptions}
                postfix = {(
                    <div className = {styles[`${className}__dropdown-chevron`]}>
                        <ChevronIcon
                            data-testid = "Select__ChevronIcon"
                        />
                    </div>
                )}
            />
            {sortOptions
                .sort((_, optB) => (optB.value === runnersSortedBy ? 1 : -1))
                .map((option) => (
                    <Select.Option
                        key = {option.name}
                        value = {option.value}
                    >
                        <span data-testid = "Option__Name">
                            {option.name}
                        </span>
                    </Select.Option>
                ))}
        </Select>
    </div>
);
