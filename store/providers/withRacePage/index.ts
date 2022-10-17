import { connect } from 'react-redux';
import { providers } from '@project/common';

export * from './withRacePage.types';
export const withRacePage = (...args) => providers.withRacePageExternal(...args)(connect);
