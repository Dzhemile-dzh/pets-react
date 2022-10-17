import { FC } from 'react';
import { BettingReturnsInterface } from '../../../interfaces';

import styles from './BettingReturns.module.scss';

export const BettingReturns : FC<BettingReturnsInterface> = ({
    bettingReturns,
}) => {
    const {
        toteWin,
        place1,
        place2,
        place3,
        place4,
        straightForecast,
        exacta,
        trifecta,
    } = bettingReturns;

    return bettingReturns?.toteWin ? (
        <div
            className = {styles['betting-returns']}
            data-testid = "Container__BettingReturns"
        >
            <h4
                className = {styles['betting-returns__title']}
                data-testid = "Text__BettingReturnsTitle"
            >
                TOTE RETURNS
            </h4>
            <ul data-testid = "Container__BettingReturnsList">
                <li data-testid = "Container__BettingReturnsItem">
                    <p data-testid = "Container__BettingReturnsToteWin">
                        Win:
                        <span data-testid = "Text__BettingReturnsToteWin">
                            {toteWin}
                        </span>
                    </p>
                </li>
                <li data-testid = "Container__BettingReturnsItem">
                    <p data-testid = "Container__BettingReturnsPlace">
                        Place:
                        <span data-testid = "Text__BettingReturnsPlace">
                            {place1}
                            {place2 && `, ${place2}`}
                            {place3 && `, ${place3}`}
                            {place4 && `, ${place4}`}
                        </span>
                    </p>
                    <p data-testid = "Container__BettingReturnsCsf">
                        CSF:
                        <span data-testid = "Text__BettingReturnsCsf">
                            {straightForecast}
                        </span>
                    </p>
                </li>
                <li data-testid = "Container__BettingReturnsItem">
                    <p data-testid = "Container__BettingReturnsExacta">
                        Exacta:
                        <span data-testid = "Text__BettingReturnsExacta">
                            {exacta}
                        </span>
                    </p>
                    <p data-testid = "Container__BettingReturnsTrifecta">
                        Trifecta:
                        <span data-testid = "Text__BettingReturnsTrifecta">
                            {trifecta}
                        </span>
                    </p>
                </li>
            </ul>
        </div>
    ) : (
        <div
            className = {styles['betting-returns__no-results']}
            data-testid = "Container__BettingReturnsNoResult"
        >
            <h4
                className = {styles['betting-returns__title']}
                data-testid = "Text__BettingReturnsTitle"
            >
                TOTE RETURNS
            </h4>
            <p data-testid = "Text__BettingReturnsNoReturnData">
                Not currently available for this race
            </p>
        </div>
    );
}
