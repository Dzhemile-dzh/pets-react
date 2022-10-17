import propTypes from 'prop-types';
import { PlayIcon } from '../../../base/Icons/PlayIcon';

import styles from './PredictorWatch.module.scss';

export const PredictorWatch = ({ title, onWatchClick }) => (
    <div className = {styles['predictor-watch']}>
        <button type = "button" onClick = {onWatchClick}>
            <span>{title}</span>
            <div className = {styles['predictor-watch__icon-play']}>
                <PlayIcon
                    color = "secondary"
                    size = "large"
                />
            </div>
        </button>
    </div>
);

PredictorWatch.propTypes = {
    title: propTypes.string.isRequired,
    onWatchClick: propTypes.func.isRequired,
}
