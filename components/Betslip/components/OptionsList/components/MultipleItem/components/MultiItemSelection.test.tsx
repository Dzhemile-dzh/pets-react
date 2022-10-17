import React from 'react';
import { render, screen } from '@testing-library/react';
import * as redux from 'react-redux';
import { MultipleItemSelection } from './MultipleItemSelection';

const props = {
    multipleBetItemSelections: [{
        runnerNumber: 1,
        horseName: 'Mickey',
        priceNumerator: 9,
        priceDenominator: 3,
        optionId: '5198df0a33fd97af52bec6d051349596',
        id: '34560',
    },
    {
        runnerNumber: 2,
        horseName: 'Ted',
        priceNumerator: 5,
        priceDenominator: 1,
        optionId: '5198df0a33fd97af52bec6d051349596',
        id: '34565',
    },
    {
        runnerNumber: 3,
        horseName: 'Spas',
        priceNumerator: 2,
        priceDenominator: 1,
        optionId: '5198df0a33fd97af52bec6d051349596',
        id: '34567',
    }],
    bookmakerName: 'William Hill',
}

const includedInMultipleSelections = {
    34560: true,
    34565: true,
    34567: true,
}

describe('MultiItemSelection', () => {
    test('MultiItem view all selections horse names', () => {
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        render(
            <MultipleItemSelection
                {...props}
                includedInMultipleSelections = {includedInMultipleSelections}
            />,
        );
        expect(screen.getByText('Mickey')).toBeInTheDocument()
        expect(screen.getByText('Ted')).toBeInTheDocument()
        expect(screen.getByText('Spas')).toBeInTheDocument()
    })
    test('MultiItem view all selections runner numbers and odds', () => {
        render(
            <MultipleItemSelection
                {...props}
                includedInMultipleSelections = {includedInMultipleSelections}
            />,
        );
        expect(screen.getByText(1)).toBeInTheDocument()
        expect(screen.getByText('9/3')).toBeInTheDocument()
        expect(screen.getByText(2)).toBeInTheDocument()
        expect(screen.getByText('5/1')).toBeInTheDocument()
        expect(screen.getByText(3)).toBeInTheDocument()
        expect(screen.getByText('2/1')).toBeInTheDocument()
    })

    test('Show SP instead of odds when numerator & denominator are SP', () => {
        render(
            <MultipleItemSelection
                {
                    ...{
                        ...props,
                        multipleBetItemSelections: [{
                            runnerNumber: 1,
                            horseName: 'Mickey',
                            priceNumerator: 'SP',
                            priceDenominator: 'SP',
                            optionId: '5198df0a33fd97af52bec6d051349596',
                            id: '34560',
                        }],
                    }
                }
                includedInMultipleSelections = {includedInMultipleSelections}
            />,
        );
        expect(screen.getByText(1)).toBeInTheDocument()
        expect(screen.getByText('SP')).toBeInTheDocument()
    })

    test('Show SP when numerator & denominator are null', () => {
        render(
            <MultipleItemSelection
                {
                    ...{
                        ...props,
                        multipleBetItemSelections: [{
                            runnerNumber: 1,
                            horseName: 'Mickey',
                            priceNumerator: null,
                            priceDenominator: null,
                            optionId: '5198df0a33fd97af52bec6d051349596',
                            id: '34560',
                        }],
                    }
                }
                includedInMultipleSelections = {includedInMultipleSelections}
            />,
        );
        expect(screen.getByText(1)).toBeInTheDocument()
        expect(screen.getByText('SP')).toBeInTheDocument()
    })
})
