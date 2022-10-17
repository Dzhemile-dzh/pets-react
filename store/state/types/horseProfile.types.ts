export interface Last14Days {
    percent: string;
    runs: string;
    wins: string;
}

export interface HorseProfileInterface {
    overview: {
        data: {
            horseName: string;
            horseCountry: string;
            silkUrl: string;
            horseAge: string;
            horseSex: string;
            trainerName: string;
            ownerName: string;
            trainerLast14Days: Last14Days;
            ownerLast14Days: Last14Days;
            birthDate: string;
            horseColour: string;
            horseProfileUrl: string;
        },
        isLoading: boolean;
        error: string | null;
    };
}
