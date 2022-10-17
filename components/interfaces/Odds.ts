import { RaceInterface } from './Race';
import { RunnerInterface, FavouriteRunnerInterface } from './Runner';
import { BetOptionInterface } from './Betslip';

export interface OddsRaceInterface extends Omit<RaceInterface, 'raceId'> {
    id: string
}

export interface OddsBetSelectionInterface {
    displayPrice: {
        decimal: string;
        fractional: string;
    };
    raceInfo: {
        date: string;
        diffusionMeetingName : string;
        eachWayData: {
            fractional: {
                denominator: number;
                numerator: number;
            };
            isWinOnly: boolean;
            payOut: string;
            places: string;
        };
        id: string;
        localTime: {
            raceDate: string;
            raceDateTime: string;
            raceTime: string;
        };
        meetingId?: string;
        meetingName: string;
        raceLocalTime: {
            raceDate: string;
            raceDateTime: string;
            raceTime: string;
        };
        raceTitle: string;
        startTime: string;
        utcTime: {
            raceDate: string;
            raceDateTime: string;
            raceTime: string;
        };
    };
    runnerInfo: {
        horseName: string;
        id: string;
        jockeyName: string;
        startPosition: string;
        trainerName: string;
    };
    selectionDetails: {
        eventId: string;
        isStartingPrice: boolean;
        marketId: string;
        priceDenominator: number;
        priceNumerator: number;
        selectionId: string;
        useBestOddsGuaranteed: boolean;
    }
}

export interface OddsInterface extends OddsWrapperInterface{
    addBetSelection: (betSelection: OddsBetSelectionInterface) => void,
    betSelection: OddsBetSelectionInterface,
    isDiffusionLoaded: boolean,
    isInBetslip: boolean,
    betOptions: Array<BetOptionInterface> | [],
    priceData: {
        isFav: boolean,
    },
    priceType: string,
    removeBetSelection: (betSelectionId: string) => void,
    selectedBookmaker: string,
    betSelectionsCount: number,
}

export interface OddsWrapperInterface {
    race: Partial<OddsRaceInterface>,
    runner: RunnerInterface | FavouriteRunnerInterface,
    shouldShowFavLabel?: boolean,
    showCompareOdds?: boolean,
    hideHistory?: boolean,
    historicalOddsClassName?: string,
    betButtonOddsClassName?: string,
    showOdds: boolean,
}
