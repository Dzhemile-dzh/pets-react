import { withBookmakerAccounts } from '@store/providers';

import { MyBets } from './MyBets';

export default withBookmakerAccounts(
    MyBets,
    ['bookmakers', 'totalBalance', 'totalFreeBetsBalance'],
    null,
)
