import { connect } from 'react-redux';
import { providers } from '@project/common';

export * from './withAllBookmakers.types';
// eslint-disable-next-line max-len
export const withAllBookmakers = (...args) => providers.withAllBookmakersExternal(...args)(connect);
