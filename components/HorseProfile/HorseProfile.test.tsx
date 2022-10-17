import React from 'react';
import { render, screen } from '@testing-library/react'
import * as redux from 'react-redux';
import * as hooks from '../contexts/BreakPointContext';
import { HorseProfile } from './HorseProfile';

const props =
{
    horseId: '1234',
    raceId: '9999',
    overview: {
        data: {
            horseId: 3137728,
            horseName: 'Truth In Jest',
            horseCountry: 'GB',
            horseSex: 'Gelding',
            horseColour: 'Chestnut',
            silkUrl: 'https://www.rp-assets.com/svg/6/0/8/238806.svg',
            horseAge: '3yo',
            birthDate: '03 Apr 18',
            horseProfileUrl: 'truth-in-jest-3137728',
            dateGelded: '2020-05-22',
            breederName: 'M E Broughton',
            sireHorseName: 'Mayson',
            sireCountryCode: 'GB',
            sireAvgFlatWinDist: '6.6',
            sireId: 756946,
            damHorseName: "Where's Broughton",
            damId: 644214,
            damCountryCode: 'GB',
            damSireId: 9363,
            damSireHorseName: 'Cadeaux Genereux',
            damSireCountryCode: 'GB',
            damSireAvgFlatWinDist: '7.9',
            previousOwners: [],
            previousTrainers: [],
            ownerName: 'The Dapper Partnership',
            ownerId: 238806,
            ownerLast14Days: {
                runs: '',
                wins: '',
                percent: '',
            },
            trainerName: 'Nigel Tinkler',
            trainerId: 865,
            trainerLast14Days: {
                runs: '33',
                wins: '3',
                percent: '9',
            },
        },
        isLoading: false,
        error: null,
    },
};

describe('HorseProfile', () => {
    test('Desktop - It renders correct Horse profil data', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(props.overview)

        render(
            <HorseProfile
                {...props}
            />,
        );

        const horseNameText = screen.queryByText('Truth In Jest');
        expect(horseNameText).toBeInTheDocument();

        const horseProfileTitle = screen.queryByText('Horse Profile');
        expect(horseProfileTitle).toBeInTheDocument();

        const horseProfileCountry = screen.queryByText('GB');
        expect(horseProfileCountry).toBeInTheDocument();

        const horseProfileAge = screen.queryByText('Age:');
        expect(horseProfileAge).toBeInTheDocument();

        const horseProfileAgeValue = screen.queryByText('3 years');
        expect(horseProfileAgeValue).toBeInTheDocument();

        const horseProfileSex = screen.getByText('Sex:');
        expect(horseProfileSex).toBeInTheDocument();

        const horseProfileSexValue = screen.getByText('Gelding');
        expect(horseProfileSexValue).toBeInTheDocument();

        const horseProfileTrainer = screen.getByText('Trainer:');
        expect(horseProfileTrainer).toBeInTheDocument();

        const horseProfileTrainerValue = screen.getByText('Nigel Tinkler');
        expect(horseProfileTrainerValue).toBeInTheDocument();

        const horseProfileOwner = screen.getByText('Owner:');
        expect(horseProfileOwner).toBeInTheDocument();

        const horseProfileOwnerValue = screen.getByText('The Dapper Partnership');
        expect(horseProfileOwnerValue).toBeInTheDocument();
    });

    test('Mobile - It renders correct Horse profil data', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isMobile: true,
        }));

        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(props.overview)

        render(
            <HorseProfile
                {...props}
            />,
        );

        const horseNameText = screen.queryByText('Truth In Jest');
        expect(horseNameText).toBeInTheDocument();

        const horseProfileTitle = screen.queryByText('Horse Profile');
        expect(horseProfileTitle).toBeNull();

        const horseProfileCountry = screen.queryByText('GB');
        expect(horseProfileCountry).toBeInTheDocument();

        const horseProfileAge = screen.queryByText('Age:');
        expect(horseProfileAge).toBeNull();

        const horseProfileAgeValue = screen.getByText(/3yo/i);
        expect(horseProfileAgeValue).toBeInTheDocument();

        const horseProfileSex = screen.queryByText('Sex:');
        expect(horseProfileSex).toBeNull();

        const horseProfileSexValue = screen.getByText(/Gelding/i);
        expect(horseProfileSexValue).toBeInTheDocument();

        const horseProfileTrainer = screen.getByText('Trainer');
        expect(horseProfileTrainer).toBeInTheDocument();

        const horseProfileTrainerValue = screen.getByText('Nigel Tinkler');
        expect(horseProfileTrainerValue).toBeInTheDocument();

        const horseProfileOwner = screen.getByText('Owner');
        expect(horseProfileOwner).toBeInTheDocument();

        const horseProfileOwnerValue = screen.getByText('The Dapper Partnership');
        expect(horseProfileOwnerValue).toBeInTheDocument();

        const horseProfileDetailsText = screen.queryByText('Truth In Jest');
        expect(horseProfileDetailsText).toBeInTheDocument();
    });

    test('Desktop - It renders correct trainer/owner Last 14 days data', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(props.overview)
        render(
            <HorseProfile
                {...props}
            />,
        );

        const horseProffileLast14DaysDesktop = screen.queryByText('(Last 14 days:');
        expect(horseProffileLast14DaysDesktop).toBeNull();

        const horseProffileLast14DaysTitle = screen.getAllByText(/\(Last 14 days:/i);
        expect(horseProffileLast14DaysTitle.length).toBe(1);

        const horseProffileLast14DaysOwner = screen.getByText(/3\s*-33,\s*9%\)/i);
        expect(horseProffileLast14DaysOwner).toBeInTheDocument();

        const horseProffileLast14DaysTrainer = screen.queryByText(/0\s*-0,\s*0%\)/);
        expect(horseProffileLast14DaysTrainer).toBeNull();
    });

    test('Mobile - It renders correct trainer/owner Last 14 days data', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isMobile: true,
        }));

        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(props.overview)

        render(
            <HorseProfile
                {...props}
            />,
        );

        const horseProffileLast14DaysDesktop = screen.queryByText('(Last 14 days: 33-3, 9%)');
        expect(horseProffileLast14DaysDesktop).toBeNull();

        const horseProffileLast14DaysTitle = screen.getAllByText('Last 14 days:');
        expect(horseProffileLast14DaysTitle.length).toBe(2);

        const horseProffileLast14DaysOwner = screen.getByText('3-33, 9%');
        expect(horseProffileLast14DaysOwner).toBeInTheDocument();

        // when data is not available - wins, runs, percent - all 0
        const horseProffileLast14DaysTrainer = screen.getByText('0-0, 0%');
        expect(horseProffileLast14DaysTrainer).toBeInTheDocument();
    });

    test('Desktop - It renders correct trainer/owner Last 14 days data', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(props.overview)

        render(
            <HorseProfile
                {...props}
            />,
        );

        const horseProffileLast14DaysDesktop = screen.queryByText('(Last 14 days:');
        expect(horseProffileLast14DaysDesktop).toBeNull();

        const horseProffileLast14DaysTitle = screen.getAllByText(/\(Last 14 days:/i);
        expect(horseProffileLast14DaysTitle.length).toBe(1);

        const horseProffileLast14DaysOwner = screen.getByText(/3\s*-33,\s*9%\)/i);
        expect(horseProffileLast14DaysOwner).toBeInTheDocument();

        const horseProffileLast14DaysTrainer = screen.queryByText(/0\s*-0,\s*0%\)/);
        expect(horseProffileLast14DaysTrainer).toBeNull();
    });
})
