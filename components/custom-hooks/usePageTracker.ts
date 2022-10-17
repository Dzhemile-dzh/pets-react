import { pageEvent } from '../../project/segmentEvents'
import { useBreakPoint } from '../contexts/BreakPointContext';
import { Constants } from '../../project/constants';
import { setCurrentPageName } from '../../project/utils/storage';
import useEffectOnce from './useEffectOnce';

const { BREAKPOINTS: { MOBILE, TABLET, DESKTOP } } = Constants;

export const usePageTracker = (pageName: string): void => {
    const { isMobile, isTablet } = useBreakPoint();

    useEffectOnce(() => {
        const deviceType = (isMobile && MOBILE) || (isTablet && TABLET) || DESKTOP;

        pageEvent(pageName, deviceType);
        setCurrentPageName(pageName);
    })
}
