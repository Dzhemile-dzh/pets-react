import dynamic from 'next/dynamic';
import { withLiveOdds } from '../../store/providers';
import { IS_BETSLIP_ENABLED } from '../../project/featureFlags';

const Betslip = dynamic(() => import('./Betslip'));
const Component = IS_BETSLIP_ENABLED ? withLiveOdds(Betslip) : () => (null);

export default Component;
