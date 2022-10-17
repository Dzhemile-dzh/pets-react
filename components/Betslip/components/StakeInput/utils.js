export const addCommas = (value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const padTrimValue = (value) => {
    const PRECISION = 2;
    const [int, decimals] = String(value).split('.');
    let decimalValue = decimals || '';

    if (decimalValue.length < PRECISION) {
        while (decimalValue.length < PRECISION) {
            decimalValue += '0';
        }
    } else {
        decimalValue = decimalValue.slice(0, PRECISION);
    }

    return `${int}.${decimalValue}`;
};

export const formatValue = (value, prefix = '') => {
    const [int, decimals] = String(value).split('.');
    const includeDecimals = String(value).includes('.') ? `.${decimals}` : '';
    return `${prefix}${addCommas(parseInt(int))}${includeDecimals}`;
}

export const removePrefix = (value, prefix) => String(value).replace(prefix, '')

export const removeCommas = (value) => String(value).replace(/,/g, '');

export const cleanValue = (value, prefix = '') => {
    if (!value) return '0';

    const DECIMAL_LIMIT = 2;

    let result = removePrefix(value, prefix)
    result = removeCommas(result)

    if (String(result).includes('.')) {
        const [int, decimals] = result.split('.');

        const decimalsValue = `.${decimals.slice(0, DECIMAL_LIMIT)}`;
        result = `${int || '0'}${decimalsValue}`;
    }

    return String(result);
}

export const getFormattedStake = (value, prefix) => {
    const cleanedValue = cleanValue(value, prefix);
    const paddedValue = padTrimValue(cleanedValue);
    return formatValue(paddedValue, prefix);
}
