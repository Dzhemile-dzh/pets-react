import React, {
    memo, useState, useMemo, useCallback,
} from 'react'
import propTypes from 'prop-types';
import { ModalContext } from './ModalContext';

export const ModalProvider = memo((props) => {
    const [modals, setModals] = useState([]);

    const showModal = useCallback(
        (modalName) => setModals((prevModals) => prevModals.concat(modalName)),
        [],
    );

    const hideModal = useCallback(
        (modalName) => setModals((prevModals) => prevModals
            .filter((item) => item !== modalName)),
        [],
    );

    const contextValue = useMemo(
        () => {
            return {
                modals,
                showModal,
                hideModal,
            }
        },
        [hideModal, modals, showModal],
    );

    return (
        <ModalContext.Provider value = {contextValue}>
            {props.children}
        </ModalContext.Provider>
    )
})

ModalProvider.displayName = 'ModalProvider';

ModalProvider.propTypes = {
    children: propTypes.node,
}
