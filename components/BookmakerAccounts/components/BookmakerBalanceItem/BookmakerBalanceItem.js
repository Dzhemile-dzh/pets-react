import propTypes from 'prop-types';
import classnames from 'classnames';
import { convertToPascalCase } from '../../../../project/utils/formatUtils';

import styles from './BookmakerBalanceItem.module.scss';

export const BookmakerBalanceItem = ({
    name,
    balance,
    rawBalance,
    percentage,
    hasZeroBalance,
}) => (
    <li
        className = {styles['bba-item']}
        data-testid = {`Container__BookmakerBalanceItem${convertToPascalCase(name)}`}
    >
        <div
            className = {classnames(
                styles['bba-item__container'],
                {
                    [styles['bba-item__container--zero-balance']]: hasZeroBalance,
                },
            )}
            data-testid = "Container__BookmakerBalanceItemContainer"
        >
            <span
                className = {classnames(styles['bba-item__name'])}
                data-testid = "Text__BookmakerBalanceItemName"
            >
                {name}
            </span>
            <span
                className = {classnames(
                    styles['bba-item__balance'],
                    {
                        [styles['bba-item__balance-zero']]:
                            rawBalance === 0,
                    },
                )}
                data-testid = "Text__BookmakerBalanceItemBalance"
            >
                {balance}
            </span>
        </div>
        <div
            className = {classnames(
                styles['bba-item__chart-container'],
                {
                    [styles['bba-item__chart-container--zero-balance']]: hasZeroBalance,
                },
            )}
            data-testid = "Container__BookmakerBalanceItemChartContainer"
        >
            <hr
                className = {classnames(
                    styles['bba-item__chart'],
                    styles[`bba-item__chart--${name}`],
                    {
                        [styles['bba-item__chart--zero']]: rawBalance === 0,
                    },
                )}
                style = {{ width: rawBalance === 0 ? '1px' : `${percentage}%` }}
            />
        </div>
    </li>
)

BookmakerBalanceItem.propTypes = {
    name: propTypes.string,
    balance: propTypes.string,
    rawBalance: propTypes.number,
    percentage: propTypes.number,
    hasZeroBalance: propTypes.bool,
}
