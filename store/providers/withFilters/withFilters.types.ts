import { FiltersInterface } from '@store/state/types/filters.types';

export interface EnhancedFiltersInterface extends FiltersInterface {
    shouldShowRaceTypeFilter: boolean;
    shouldShowHandicapFilter: boolean;
    shouldShowRaceStatusFilter: boolean;
}

export interface Filters {
    filters: EnhancedFiltersInterface;
}
