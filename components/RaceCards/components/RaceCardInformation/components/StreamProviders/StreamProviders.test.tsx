import React from 'react';
import { render, screen } from '@testing-library/react'

import { StreamProviders } from './StreamProviders';

const hasStreamProviders = {
    liveOn: ['RTV'],
}

const noStreamProviders = {
    liveOn: [],
}

describe('StreamProviders', () => {
    test('Stream providers are rendering', () => {
        render(
            <StreamProviders {...hasStreamProviders} />,
        );

        expect(screen.queryByTestId('Container__StreamProvidersImages')).toBeInTheDocument();
    });

    test('Stream providers are not rendering', () => {
        render(
            <StreamProviders {...noStreamProviders} />,
        );

        expect(screen.queryByTestId('Container__StreamProvidersImages')).toBeNull();
    });
})
