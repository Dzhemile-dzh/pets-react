export interface BookmakerFreeBetInterface {
    id: string,
    type: string,
    amount: number,
    description: string,
    expiry: string,
    minStake: number,
    maxStake: number,
}

export interface ReplayDetails {
    videoId: number;
    videoProvider: string;
    completeRaceUid: number;
    completeRaceStart: number;
    completeRaceEnd: number;
    finishRaceUid: number;
    finishRaceStart: number;
    finishRaceEnd: number;
}
