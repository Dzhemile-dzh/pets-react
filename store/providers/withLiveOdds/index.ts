import { connect } from 'react-redux';
import { providers } from '@project/common';

export const withLiveOdds = (WrappedComponent) => providers.withLiveOdds(WrappedComponent, connect);
