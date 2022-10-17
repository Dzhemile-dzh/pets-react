import React from 'react';
import { screen, fireEvent } from '@testing-library/react'
import { wrapperRender } from '../../../../project/utils/testUtility';
import { NavigationMenu } from './NavigationMenu';

const nextRace = {
    getNextUKOnlyRaceError: '',
    isNextUKOnlyRaceLoading: false,
    nextUKOnlyRaceData: {
        raceUrl: '',
        startTime: '',
        meetingName: '',
        utcTime: {
            raceDateTime: '',
        },
    },
};

describe('NavigationMenu', () => {
    test('NavigationMenu to open DrawerWrapper on click', () => {
        wrapperRender(<NavigationMenu
            asPath = "/today"
            nextRace = {nextRace}
        />);

        const menuIcon = screen.getByTestId('Container__NavigationMenu');
        fireEvent.click(menuIcon);

        expect(screen.getByText('next race')).toBeInTheDocument();
    });

    test('DrawerWrapper to not be opened by default', () => {
        wrapperRender(<NavigationMenu
            asPath = "/today"
            nextRace = {nextRace}
        />);

        expect(screen.queryByText('next race')).not.toBeInTheDocument();
    });
});
