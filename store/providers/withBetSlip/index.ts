import { connect } from 'react-redux';
import { providers } from '@project/common';

export * from './withBetSlip.types';
// eslint-disable-next-line max-len
export const withBetSlip = (...args) => providers.withBetSlipExternal(...args)(connect);
