import { format } from '../utils';

export const subscript = (officialPosition) => {
    return officialPosition === 'V' ?
        `${officialPosition}oid` : format.ordinal(officialPosition)
            .substring(officialPosition.toString().length);
}
