import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Actions } from '@project/common';
import { compareDates } from '@project/utils/dateUtils';

import useEffectOnce from '@components/custom-hooks/useEffectOnce';
import {
    TaxonomyCollectionBodyInterface,
    HeaderInterface,
    StateInterface,
} from '@components/interfaces';

import ReportsPreviewsBase from '../../atoms/ReportsPreviewsBase';

interface RaceReportsCollectionInterface extends
    Omit<HeaderInterface, 'purpose'>, TaxonomyCollectionBodyInterface {
}

export const RaceReportsCollection : FC<RaceReportsCollectionInterface> = ({
    items,
    minimumArticleCount,
    maximumArticleCount,
    ...rest
}) => {
    const races = useSelector((state: StateInterface) => state.races);

    const dispatch = useDispatch()

    const raceIds = useMemo(() => items
        .map((item) => item.customTypeData.meta_data.race)
        .filter(Boolean), [items]);

    useEffectOnce(() => {
        if (Object.keys(races).length === 0) {
            raceIds.forEach((raceId) => dispatch(Actions.getRace(raceId)));
        }
    });

    const sortedItems = useMemo(() => {
        const areRacesLoaded = raceIds.length > 0 && raceIds
            .every((raceId) => !races[raceId]?.isRaceLoading);

        if (areRacesLoaded) {
            const itemsWithRaceIds = items.filter((item) => item.customTypeData.meta_data.race);
            const itemsWithNoRaceIds = items.filter((item) => !item.customTypeData.meta_data.race);

            const sortedItemsWithRaceIds = itemsWithRaceIds.sort((itemA, itemB) => {
                const raceA = races[itemA.customTypeData.meta_data.race];
                const raceB = races[itemB.customTypeData.meta_data.race];

                const raceATime = raceA?.raceData ? raceA.raceData.localTime.raceDateTime : 0;
                const raceBTime = raceB?.raceData ? raceB.raceData.localTime.raceDateTime : 0;

                return compareDates(raceBTime, raceATime);
            });

            return [...sortedItemsWithRaceIds, ...itemsWithNoRaceIds];
        }

        return [];
    }, [items, raceIds, races])

    return sortedItems.length >= minimumArticleCount && (
        <ReportsPreviewsBase
            items = {sortedItems.slice(0, maximumArticleCount)}
            purpose = "RaceReports"
            {...rest}
        />
    );
}
