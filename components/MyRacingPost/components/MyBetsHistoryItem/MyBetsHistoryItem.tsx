import { ReactElement } from 'react';
import { MyBetsHistoryItemMobile } from './MyBetsHistoryItemMobile';
import { MyBetsHistoryItemDesktop } from './MyBetsHistoryItemDesktop';
import { MyBetsHistoryItemTablet } from './MyBetsHistoryItemTablet';
import { MyBetsHistoryItemInterface } from '../../../interfaces';
import { useBreakPoint } from '../../../contexts/BreakPointContext';

export const MyBetsHistoryItem = (props: MyBetsHistoryItemInterface) : ReactElement => {
    const { isMobile, isTablet, isDesktop } = useBreakPoint();
    if (isMobile) {
        return <MyBetsHistoryItemMobile {...props} />
    }
    if (isDesktop) {
        return <MyBetsHistoryItemDesktop {...props} />
    }
    if (isTablet) {
        return <MyBetsHistoryItemTablet {...props} />
    }
    return null;
}
