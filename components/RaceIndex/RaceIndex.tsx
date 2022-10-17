import { FC } from 'react'
import { useBreakPoint } from '@components/contexts/BreakPointContext';

import { MobileRaceIndex } from './MobileRaceIndex';
import { DesktopRaceIndex } from './DesktopRaceIndex';

export const RaceIndex : FC = () => {
    const { isMobile } = useBreakPoint();

    return isMobile ? <MobileRaceIndex /> : <DesktopRaceIndex />
}
