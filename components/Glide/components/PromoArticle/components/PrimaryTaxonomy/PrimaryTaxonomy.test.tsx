import React from 'react';
import { screen, render } from '@testing-library/react';
import { PrimaryTaxonomy } from './PrimaryTaxonomy';

describe('PrimaryTaxonomy', () => {
    it('should render PrimaryTaxonomy', () => {
        render(
            <PrimaryTaxonomy>
                <PrimaryTaxonomy.Time time = "1w" />
                <PrimaryTaxonomy.Delimiter />
                <PrimaryTaxonomy.Name name = "horses" />
            </PrimaryTaxonomy>,
        );

        expect(screen.queryByText('1w')).toBeInTheDocument();
        expect(screen.queryByText('horses')).toBeInTheDocument();
        expect(screen.queryByTestId('Text__PrimaryTaxonomyName')).toBeInTheDocument();
        expect(screen.queryByTestId('Text__PrimaryTaxonomyDelimiter')).toBeInTheDocument();
        expect(screen.queryByTestId('Container__PrimaryTaxonomy')).toBeInTheDocument();
    });
})
