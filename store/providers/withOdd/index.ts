import { connect } from 'react-redux';
import { providers } from '@project/common';

export * from './withOdd.types';
export const withOdd = (...args) => providers.withOddExternal(...args)(connect);
