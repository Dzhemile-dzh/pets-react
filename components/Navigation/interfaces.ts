import {
    NextThreeRacesProviderInterface,
    BetslipProviderInterface,
    NextUKOnlyRaceInterface,
} from '../interfaces';

export interface NavigationRenderPropsInterface extends Omit<NextThreeRacesProviderInterface,
'getNextThreeRaces' | 'isNextThreeRacesLoading' | 'nextThreeRacesError'
>{
    isMobile: boolean;
    betSelectionsCount: number;
    nextRace: NextUKOnlyRaceInterface
}

export interface NavigationWrapperInterface {
    children: (props: NavigationRenderPropsInterface) => React.ReactNode[] | React.ReactNode,
}

export interface NavigationInterface extends NavigationWrapperInterface,
    NextThreeRacesProviderInterface,
    BetslipProviderInterface
{}
