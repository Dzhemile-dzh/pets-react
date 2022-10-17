import { useCallback, useMemo, useContext } from 'react';
import { ModalContext } from './ModalContext';

export const useModal = (modalName) => {
    const context = useContext(ModalContext)

    if (!context) {
        throw new Error('useModal must be used within a ModalProvider')
    }

    if (!modalName) {
        throw new Error('Must provide component name to useModal hook')
    }

    const {
        modals,
        showModal,
        hideModal,
    } = context;

    const isModalOpen = useMemo(() => modals.includes(modalName), [modalName, modals])

    const showFactoryModal = useCallback(
        () => showModal(modalName),
        [modalName, showModal],
    )

    const hideFactoryModal = useCallback(
        () => hideModal(modalName),
        [hideModal, modalName],
    )

    return useMemo(
        () => ({
            isModalOpen,
            showModal: showFactoryModal,
            hideModal: hideFactoryModal,
        }),
        [hideFactoryModal, isModalOpen, showFactoryModal],
    )
}
