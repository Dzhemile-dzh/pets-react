import React from 'react';
import ReactDom from 'react-dom';
import styles from './Modal.module.scss';

export const Modal: React.FC = React.memo(({ children }) => {
    return ReactDom.createPortal(
        <>
            <div className = {styles['modal-overlay']} />
            {children}
        </>,
        document.getElementById('modal'),
    )
});

Modal.displayName = 'Modal';
