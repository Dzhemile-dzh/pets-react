import { Constants } from '../constants';

export const getAgeAccessibilityText = (ageRestriction) => {
    const isMoreThan = ageRestriction.indexOf('+') > -1;
    const isFromTo = ageRestriction.indexOf('-') > -1;
    const age = ageRestriction.toLowerCase().split('years')[0].trim().replace('+', '');

    if (isMoreThan) {
        return `${age} Year Old Plus`;
    }

    if (isFromTo) {
        const ageArray = age.split('-');

        return `${ageArray[0]} to ${ageArray[1]} Year Olds`;
    }

    if (!isMoreThan && !isFromTo) {
        return `${age} Year Olds`;
    }

    return ageRestriction;
}

export const getFullCountry = (countryCode) => {
    switch (countryCode) {
        case Constants.COUNTRY_CODES.IRE: return 'Ireland';
        case Constants.COUNTRY_CODES.FRA: return 'France';
        case Constants.COUNTRY_CODES.USA: return 'United States of America';
        default: return countryCode;
    }
}
