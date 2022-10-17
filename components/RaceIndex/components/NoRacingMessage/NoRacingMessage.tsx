import { FC } from 'react'
import styles from './NoRacingMessage.module.scss';

export const NoRacingMessage : FC = () => (
    <div
        className = {styles['racing-matrix__no-racing']}
        data-testid = "Container__RacingMatrixNoRacingNextWeek"
    >
        <div className = {styles['racing-matrix__no-racing-title']}>
            No racing scheduled within the next week
        </div>
    </div>
)
