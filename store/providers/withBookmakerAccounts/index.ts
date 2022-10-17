import { connect } from 'react-redux';
import { providers } from '@project/common';

export * from './withBookmakerAccounts.types';
// eslint-disable-next-line max-len
export const withBookmakerAccounts = (...args) => providers.withBookmakerAccountsExternal(...args)(connect);
