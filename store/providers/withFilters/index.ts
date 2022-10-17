import { connect } from 'react-redux';
import { providers } from '@project/common';

export * from './withFilters.types';
export const withFilters = (...args) => providers.withFiltersExternal(...args)(connect);
