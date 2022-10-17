import classnames from 'classnames'

import { PartialLogoIcon } from '../../../base/Icons/PartialLogoIcon';
import HorseProfileSilk from '../../../base/Silk';
import { HorseProfileOverviewProviderInterface } from '../../../interfaces';

import styles from './HorseProfileHeader.module.scss';

export const DesktopHorseProfileHeader = (
    { overview }: HorseProfileOverviewProviderInterface,
): React.ReactElement => {
    const {
        data:
        {
            horseName,
            horseCountry,
            silkUrl,
            horseAge,
            horseSex,
            trainerName,
            ownerName,
            trainerLast14Days,
        },
    } = overview;

    return (
        <>
            <div className = {styles['horse-profile-header__main']}>
                <div className = {styles['horse-profile-header__horse-silk']}>
                    <HorseProfileSilk
                        silkUrl = {silkUrl}
                        displayTips = {false}
                        isRunner = {false}
                    />
                </div>

                <div className = {styles['horse-profile-header__horse-profile']}>
                    <PartialLogoIcon
                        className = {styles['horse-profile-header__horse-icon']}
                        color = "primary"
                        size = "medium"
                    />
                    <span className = {styles['horse-profile-header__horse-title']}>
                        Horse Profile
                    </span>
                    <div className = {styles['horse-profile-header__horse-name']}>
                        <h1>{horseName || 'N/A'}</h1>
                        <sup>{horseCountry || 'N/A'}</sup>
                    </div>
                </div>
            </div>

            <div className = {styles['horse-profile-header__details-container']}>
                <div className = {styles['horse-profile-header__detail']}>
                    <span className = {styles['horse-profile-header__detail-title']}>
                        Age:
                    </span>

                    <span className = {styles['horse-profile-header__detail-value']}>
                        {horseAge.replace('yo', ' years')}
                    </span>
                </div>
                <div className = {styles['horse-profile-header__detail']}>
                    <span className = {styles['horse-profile-header__detail-title']}>
                        Sex:
                    </span>

                    <span className = {styles['horse-profile-header__detail-value']}>
                        {horseSex}
                    </span>
                </div>
                <div className = {styles['horse-profile-header__detail']}>
                    <span className = {styles['horse-profile-header__detail-title']}>
                        Trainer:
                    </span>

                    {trainerName && (
                        <>
                            <div className = {
                                classnames(styles['horse-profile-header__detail-link'])
                            }
                            >
                                <div className = {styles['horse-profile-header__detail-value']}>
                                    <span className = {
                                        styles['horse-profile-header__detail-value--bold']
                                    }
                                    >
                                        {trainerName}
                                    </span>
                                </div>
                            </div>

                            <span className = {
                                styles['horse-profile-header__detail-value--last-14-days']
                            }
                            >
                                {`(Last 14 days: ${trainerLast14Days?.wins || 0}`}
                                {`-${trainerLast14Days?.runs || 0},`}
                                {` ${trainerLast14Days?.percent || 0}%)`}
                            </span>
                        </>
                    )}
                </div>
                <div className = {styles['horse-profile-header__detail']}>
                    <span className = {styles['horse-profile-header__detail-title']}>
                        Owner:
                    </span>

                    {ownerName && (
                        <div className = {styles['horse-profile-header__detail-link']}>
                            <div className = {styles['horse-profile-header__detail-value']}>
                                <span className = {
                                    styles['horse-profile-header__detail-value--bold']
                                }
                                >
                                    {ownerName}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
