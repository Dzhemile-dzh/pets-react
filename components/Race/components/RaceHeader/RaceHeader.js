import propTypes from 'prop-types';
import classnames from 'classnames';
import DesktopRaceHeader from './DesktopRaceHeader';
import MobileRaceHeader from './MobileRaceHeader';
import { useBreakPoint } from '../../../contexts/BreakPointContext';
import styles from './RaceHeader.module.scss';

export const RaceHeader = (props) => {
    const {
        data,
    } = props;

    const { isMobile } = useBreakPoint();

    return (
        <section
            className = {classnames(
                styles['race-header'],
                data.isResult ? styles['race-header--result'] : styles['race-header--racecard'],
            )}
            data-testid = "Container__RaceHeader"
        >
            {
                isMobile ? (
                    <MobileRaceHeader {...data} />
                ) : (
                    <DesktopRaceHeader {...data} />
                )
           }
        </section>
    );
}

RaceHeader.propTypes = {
    data: propTypes.object.isRequired,
}
