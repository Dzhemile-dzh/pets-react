import { connect } from 'react-redux';
import { providers } from '@project/common';

export * from './withNextThreeRaces.types';
// eslint-disable-next-line max-len
export const withNextThreeRaces = (...args) => providers.withNextThreeRacesExternal(...args)(connect);
