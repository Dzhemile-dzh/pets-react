import { useEffect } from 'react'
import { createPortal } from 'react-dom';
import styles from './Overlay.module.scss';

export function Overlay() {
    const overlay = document.getElementById('overlay');

    useEffect(() => {
        overlay.classList.add(styles['app-overlay'])
        return () => {
            overlay.classList.remove(styles['app-overlay'])
        }
    })

    return createPortal(
        null,
        overlay,
    )
}
