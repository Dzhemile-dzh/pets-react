import useEffectOnce from '../components/custom-hooks/useEffectOnce';

import { Constants } from '../project/constants';
import { setCurrentPageName } from '../project/utils/storage';

const {
    PAGE_NAMES: {
        ERROR_PAGE,
    },
} = Constants;
const ErrorPage = () => {
    useEffectOnce(() => {
        setCurrentPageName(ERROR_PAGE);
    })

    return (
        <div style = {{ textAlign: 'center', fontWeight: 'bold', fontSize: '50px' }}>
            Error page.
        </div>
    );
};

ErrorPage.displayName = 'ComingSoon';

export default ErrorPage;
