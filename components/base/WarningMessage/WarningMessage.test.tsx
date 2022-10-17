import React from 'react';
import { render, screen } from '@testing-library/react'

import WarningMessage from './index';
import { NoRacesIcon } from '../Icons/NoRacesIcon';

describe('WarningMessage', () => {
    test('renders WarningMessage', () => {
        render(
            <WarningMessage
                message = "test warning message"
                icon = {<NoRacesIcon />}
            />,
        );
        expect(screen.getByText('test warning message')).toBeInTheDocument();
        expect(screen.getByTestId('Icon__NoRaces')).toBeInTheDocument();
    });
});
