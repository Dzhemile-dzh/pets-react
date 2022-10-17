/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import * as redux from 'react-redux';
import { Actions } from '../../../../project/common';

import { LoginForm } from './LoginForm.tsx'

const loginFormProps = {
    bookmakerName: 'williamhill',
    forgottenPasswordUrl: '',
    onSuccess: () => {},
    bookmakerLogin: () => {},
    bookmakerLoginError: {},
    clearBookmakerLoginError: () => {},
    isBookmakerSessionsLoading: false,
    bookmakers: [
        {
            name: 'williamhill',
            isLogged: false,
        },
    ],
}

describe('LoginForm', () => {
    it('To display the default state of the login form', () => {
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);
        render(
            <LoginForm {...loginFormProps} />,
        )

        const usernameInput = screen.getByLabelText('Username')
        const passwordInput = screen.getByLabelText('Password')
        const submitButton = screen.getByRole('button', { name: /LOG IN/i })

        expect(usernameInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(submitButton).toBeInTheDocument()
        expect(submitButton).toBeDisabled()
    });

    it('To display the default state of the login form', () => {
        render(
            <LoginForm {...loginFormProps} />,
        )

        const usernameInput = screen.getByLabelText('Username')
        const passwordInput = screen.getByLabelText('Password')
        const submitButton = screen.getByRole('button', { name: /LOG IN/i })

        fireEvent.change(usernameInput, { target: { value: 'Username' } })
        fireEvent.change(passwordInput, { target: { value: 'Password' } })

        expect(usernameInput.value).toBe('Username')
        expect(passwordInput.value).toBe('Password')

        expect(submitButton).not.toBeDisabled()
    });

    it('To enable the submit button if there are username and password in the input fields', () => {
        render(
            <LoginForm {...loginFormProps} />,
        )

        const usernameInput = screen.getByLabelText('Username')
        const passwordInput = screen.getByLabelText('Password')
        const submitButton = screen.getByRole('button', { name: /LOG IN/i })

        fireEvent.change(usernameInput, { target: { value: 'Username' } })
        fireEvent.change(passwordInput, { target: { value: 'Password' } })

        expect(usernameInput.value).toBe('Username')
        expect(passwordInput.value).toBe('Password')

        expect(submitButton).not.toBeDisabled()
    });

    it('To display an error when there is one', () => {
        render(
            <LoginForm {...loginFormProps} bookmakerLoginError = {{ message: 'Error' }} />,
        )

        const usernameInput = screen.getByText('Error')
        const submitButton = screen.getByRole('button', { name: /LOG IN/i })

        expect(usernameInput).toBeInTheDocument();
        expect(submitButton).toBeDisabled()
    });

    it('To submit username and password', () => {
        const onSuccess = jest.fn();

        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        const { rerender } = render(
            <LoginForm
                {...loginFormProps}
                onSuccess = {onSuccess}
            />,
        )

        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: /LOG IN/i });

        fireEvent.change(usernameInput, { target: { value: 'Username' } })
        fireEvent.change(passwordInput, { target: { value: 'Password' } })

        expect(usernameInput.value).toBe('Username')
        expect(passwordInput.value).toBe('Password')

        expect(submitButton).not.toBeDisabled()

        fireEvent.click(submitButton);

        rerender(
            <LoginForm
                {...loginFormProps}
                onSuccess = {onSuccess}
                bookmakers = {[
                    {
                        name: 'williamhill',
                        isLogged: true,
                    },
                ]}
            />,
        )

        expect(mockDispatchFn).toHaveBeenCalledWith(Actions.bookmakerLogin(
            'williamhill',
            true,
            'Username',
            'Password',
        ));
        expect(onSuccess).toHaveBeenCalledTimes(1)
    });
})
