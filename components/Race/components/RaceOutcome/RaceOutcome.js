import propTypes from 'prop-types';
import classnames from 'classnames';

import styles from './RaceOutcome.module.scss';

export const RaceOutcome = ({ horses, className }) => (
    <div
        className = {classnames(styles['race-outcome'], className)}
        data-testid = "Container__RaceOutcome"
    >
        {horses.map((horse, i) => (
            <div
                key = {i}
                className = {styles['race-outcome__item']}
                data-testid = {`Container__${i}__RaceOutcomeItem`}
            >
                <span
                    className = {styles['race-outcome__horse']}
                    data-testid = "Text__RaceOutcomeHorse"
                >
                    {horse}
                </span>
            </div>
        ))}
    </div>
);

RaceOutcome.propTypes = {
    horses: propTypes.array.isRequired,
    className: propTypes.string,
}
