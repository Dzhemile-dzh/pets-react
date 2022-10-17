import { Strings } from '../../../project/localization';
import useOnlineStatus from '../../custom-hooks/useOnlineStatus';
import WarningMessage from '../WarningMessage';
import styles from './NetworkDetection.module.scss';

export const NetworkDetection = () => {
    const isOnline = useOnlineStatus();

    return !isOnline && (
        <WarningMessage
            message = {Strings.offline}
            className = {styles['network-detection']}
        />
    );
}
