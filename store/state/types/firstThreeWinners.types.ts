export interface FirstThreeWinnersRunnerInterface {
    horseId: number;
    horseName: string;
    jockeyName: string;
    trainerName: string;
    officialPosition: string;
    saddleClothNumber: string;
    silkUrl: string;
    countryCode: string;
    isFavourite: boolean;
    startingPrice: string;
    horseProfileUrl: string;
    deadheat: boolean;
}

export interface FirstThreeRaceWinnersObjectInterface {
    isLoading: boolean;
    error: string;
    data: FirstThreeWinnersRunnerInterface[];
}
