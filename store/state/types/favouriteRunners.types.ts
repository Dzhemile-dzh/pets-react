export interface FavouriteRunnerInterface {
    uid: string;
    silkUrl: string;
    saddleClothNumber: string;
    draw: string;
    trainerName: string;
    trainerId: number;
    jockeyName: string;
    jockeyId: number;
    countryCode: string;
    horseName: string;
    runnerFeed: string;
    horseProfileUrl: string;
}

export interface FavouriteRunnerObjectInterface {
    data: FavouriteRunnerInterface,
    error: string;
    isLoading: boolean;
}
