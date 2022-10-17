import React from 'react';
import { useSelector } from 'react-redux';

import Title from '../base/meta/Title';
import MetaDescription from '../base/meta/MetaDescription';
import OpenGraph from '../base/meta/OpenGraph';
import LinkHead from '../base/meta/Link';

import { HorseProfileWrapperInterface, StateInterface } from '../interfaces';

import HorseProfileHeader from './components/HorseProfileHeader';

export const HorseProfile = (
    {
        horseId,
    }: HorseProfileWrapperInterface,
) : React.ReactElement => {
    const overview = useSelector((state: StateInterface) => state.horseProfile[horseId]?.overview);

    const {
        data: {
            horseName,
            horseProfileUrl,
        },
    } = overview;

    const title = `${horseName} - Form, Stats & Entries | Racing Post`;
    return (
        <>
            <Title title = {title} />
            <MetaDescription
                metaDescription = {`${horseName} horse profile, statistics and form.
                View results and future entries as well as statistics by course,
                race type and prize money.
                `}
            />
            <OpenGraph property = "og:title" content = {title} />
            {typeof window !== 'undefined' && (
                <LinkHead
                    href = {
                        `https://${window.location.hostname}/horses/${horseProfileUrl}`
                    }
                    rel = "canonical"
                />
            )}
            <HorseProfileHeader overview = {overview} />
        </>
    )
}
