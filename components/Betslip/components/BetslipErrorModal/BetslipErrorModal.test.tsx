import React from 'react';
import {
    render,
    screen,
} from '@testing-library/react';
import { BetslipErrorModal } from './BetslipErrorModal';

const setupPortalRoot = () => {
    const portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'modal')
    document.body.appendChild(portalRoot)
}

describe('Betslip Error Modal', () => {
    beforeEach(() => {
        setupPortalRoot();
    });

    it('should render Betslip Error Modal', () => {
        render(<BetslipErrorModal
            closeModal = {jest.fn()}
            modalNodeIdContainer = "modal"
            errorText = "test text"
            errorHeading = "test heading"
        />);

        expect(screen.getByText('test text')).toBeInTheDocument();
        expect(screen.getByText('test heading')).toBeInTheDocument();
        expect(screen.getByText('Close')).toBeInTheDocument();
    });
});
