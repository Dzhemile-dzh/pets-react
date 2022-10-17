import { HorseProfileOverviewProviderInterface } from '../../../interfaces';
import { MobileHorseProfileHeader } from './MobileHorseProfileHeader';
import { DesktopHorseProfileHeader } from './DesktopHorseProfileHeader';

import { useBreakPoint } from '../../../contexts/BreakPointContext';
import styles from './HorseProfileHeader.module.scss';

const HorseProfileHeader = (
    { overview }: HorseProfileOverviewProviderInterface,
): React.ReactElement => {
    const { isMobile } = useBreakPoint();

    return (
        <section className = {styles['horse-profile-header']}>
            <div className = {styles['horse-profile-header__content']}>
                {isMobile ? (
                    <MobileHorseProfileHeader overview = {overview} />
                ) : (
                    <DesktopHorseProfileHeader overview = {overview} />
                )}
            </div>
        </section>
    )
}

export default HorseProfileHeader;
