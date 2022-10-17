import classnames from 'classnames';

import HorseProfileSilk from '../../../base/Silk';
import { HorseProfileOverviewProviderInterface } from '../../../interfaces';

import styles from './HorseProfileHeader.module.scss'

export const MobileHorseProfileHeader = (
    { overview }: HorseProfileOverviewProviderInterface,
): React.ReactElement => {
    const {
        data:
        {
            horseName,
            silkUrl,
            horseAge,
            horseSex,
            trainerName,
            ownerName,
            trainerLast14Days,
            ownerLast14Days,
            birthDate,
            horseColour,
            horseCountry,
        },
    } = overview;

    const horseDetails = `${horseAge} ${birthDate && `(${birthDate})`} ${horseColour} ${horseSex}`;
    const trainerLast14DaysString =
        `${trainerLast14Days?.wins || 0}-${trainerLast14Days?.runs || 0}, 
        ${trainerLast14Days?.percent || 0}%`;

    const ownerLast14DaysString =
        `${ownerLast14Days?.wins || 0}-${ownerLast14Days?.runs || 0}, 
        ${ownerLast14Days?.percent || 0}%`;

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
                    <h1 className = {
                        styles['horse-profile-header__horse-name']
                    }
                    >
                        {horseName || 'N/A'}
                        <sup>{horseCountry || 'N/A'}</sup>
                    </h1>
                    <span className = {styles['horse-profile-header__horse-details']}>
                        {horseDetails}
                    </span>
                </div>
            </div>

            <div className = {styles['horse-profile-header__details-container']}>
                <div className = {styles['horse-profile-header__detail']}>
                    <div>
                        <span className = {styles['horse-profile-header__detail-title']}>
                            Trainer
                        </span>
                        <span className = {
                            classnames(
                                styles['horse-profile-header__detail-link'],
                                styles['horse-profile-header__detail-value'],
                            )
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
                        </span>
                    </div>
                    {trainerName && (
                        <div>
                            <span className = {
                                classnames(
                                    styles['horse-profile-header__detail-title'],
                                    styles['horse-profile-header__detail-title--last-14-days'],
                                )
                            }
                            >
                                Last 14 days:
                            </span>

                            <span className = {
                                classnames(
                                    styles['horse-profile-header__detail-value'],
                                    styles['horse-profile-header__detail-value--last-14-days'],
                                )
                            }
                            >
                                {trainerLast14DaysString}
                            </span>
                        </div>
                    )}
                </div>
                <div className = {styles['horse-profile-header__detail']}>
                    <div>
                        <span className = {styles['horse-profile-header__detail-title']}>
                            Owner
                        </span>
                        <span className = {
                            classnames(
                                styles['horse-profile-header__detail-link'],
                                styles['horse-profile-header__detail-value'],
                            )
                        }
                        >
                            <div className = {styles['horse-profile-header__detail-value']}>
                                <span className = {
                                    styles['horse-profile-header__detail-value--bold']
                                }
                                >
                                    {ownerName}
                                </span>
                            </div>
                        </span>
                    </div>
                    {ownerName && (
                        <div>
                            <span className = {
                                classnames(
                                    styles['horse-profile-header__detail-title'],
                                    styles['horse-profile-header__detail-title--last-14-days'],
                                )
                            }
                            >
                                Last 14 days:
                            </span>
                            <span className = {
                                classnames(
                                    styles['horse-profile-header__detail-value'],
                                    styles['horse-profile-header__detail-value--last-14-days'],
                                )
                            }
                            >
                                {ownerLast14DaysString}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
