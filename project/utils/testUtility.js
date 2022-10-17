import React from 'react';
import { Provider } from 'react-redux';
import propTypes from 'prop-types';
import { render as baseRender } from '@testing-library/react'

const mockStore = (store = {}) => {
    return {
        getState: jest.fn(() => (store)),
        dispatch: jest.fn(),
        subscribe: jest.fn(),
    }
}

// Wrapper for providing access to the store
const Wrapper = ({ children }) => {
    return <Provider store = {mockStore(children?.props?.store)}>{children}</Provider>
}

Wrapper.propTypes = {
    children: propTypes.node.isRequired,
}

// Rewrite the base render
export const wrapperRender =
    (ui, { ...renderOptions } = {}) => baseRender(ui, { wrapper: Wrapper, ...renderOptions })
