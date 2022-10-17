/* eslint-disable no-undef */
import React from 'react';
import ReactDom from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import OddsModal from './index';
import { ModalContext } from '../Modal/ModalContext';

jest.mock('react-dom', () => {
    return {
        ...jest.requireActual('react-dom'),
        createPortal: (element) => {
            return element;
        },
    };
});

const previousSelectedBookmaker = {
    displayName: 'Best Odds',
    feed: '#BESTODDS',
    name: 'bestoddsbookmaker',
}

const selectedBookmakerData = {
    balance: '£798.17',
    displayName: 'William Hill',
    feed: 'WH_OXI',
    isLogged: true,
    isRecent: true,
    lastLoggedInDate: '02 April 2021',
    loginType: 'form',
    loginUrl: null,
    logoutType: 'delete',
    logoutUrl: null,
    name: 'williamhill',
    rawBalance: 798.17,
    username: 'Theracingpost',
}

describe('App', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDom.render(<OddsModal
            closeModal = {() => {}}
            previousSelectedBookmaker = {previousSelectedBookmaker}
            selectedBookmakerData = {selectedBookmakerData}
        />, div);
    });
    test('To show message for previously viewed bookmaker odds', () => {
        render(
            <ModalContext.Provider value>
                <OddsModal
                    closeModal = {() => {}}
                    previousSelectedBookmaker = {previousSelectedBookmaker}
                    selectedBookmakerData = {selectedBookmakerData}
                    showPreviouslyViewed
                />
            </ModalContext.Provider>,
        );

        expect(screen.getByText('(You were previously viewing Best Odds)')).toBeInTheDocument();
    });
    test('To show currently selected bookmaker', () => {
        render(
            <ModalContext.Provider value>
                <OddsModal
                    closeModal = {() => {}}
                    previousSelectedBookmaker = {previousSelectedBookmaker}
                    selectedBookmakerData = {selectedBookmakerData}
                />
            </ModalContext.Provider>,
        );

        expect(screen.getByText('William Hill')).toBeInTheDocument();
    });
    test('To show odds default text', () => {
        render(
            <ModalContext.Provider value>
                <OddsModal
                    closeModal = {() => {}}
                    previousSelectedBookmaker = {previousSelectedBookmaker}
                    selectedBookmakerData = {selectedBookmakerData}
                />
            </ModalContext.Provider>,
        );

        expect(screen
            .getByText('odds will show on all racecards and be the default odds in the betslip.'))
            .toBeInTheDocument();
    });
    test('calls closeModal prop when clicked', () => {
        const handleClose = jest.fn()
        const { getByRole } = render(
            <ModalContext.Provider value>
                <OddsModal
                    closeModal = {handleClose}
                    previousSelectedBookmaker = {previousSelectedBookmaker}
                    selectedBookmakerData = {selectedBookmakerData}
                />
            </ModalContext.Provider>,
        )
        fireEvent.click(getByRole('button'))
        expect(handleClose).toHaveBeenCalledTimes(1)
    })
});
