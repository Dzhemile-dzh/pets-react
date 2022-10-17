import { FC } from 'react'
import { LoadingLogoIcon } from '@components/base/Icons/LoadingLogoIcon';
import styles from './RPLoader.module.scss';

export const RPLoader : FC = () => (
    <div
        data-testid = "Container__Loader"
        className = {styles['rp-loader']}
    >
        <LoadingLogoIcon />
    </div>
)
