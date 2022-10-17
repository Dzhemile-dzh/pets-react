import { FC } from 'react';
import { SearchIcon } from '../Icons/SearchIcon'

import styles from './SearchBar.module.scss';

export interface SearchBarProps {
    text: string,
}

export const SearchBar : FC<SearchBarProps> = ({ text }) => {
    return (
        <div className = {styles['search-bar']} data-testid = "Container__SearchBar">
            <input
                type = "text"
                placeholder = {text}
                className = {styles['search-bar__input']}
                data-testid = "Input__SearchBar"
            />
            <button
                className = {styles['search-bar__btn']}
                data-testid = "Button__SearchBar"
                type = "button"
            >
                <SearchIcon
                    className = {styles['search-bar__btn-icon']}
                />
            </button>
        </div>
    )
}

SearchBar.displayName = 'SearchBar';
