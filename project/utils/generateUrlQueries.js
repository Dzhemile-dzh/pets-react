export const generateUrl = (url, params) => {
    const esc = encodeURIComponent;

    if (!params || Object.keys(params).length === 0) {
        return url;
    }

    return `${url}?${Object.keys(params)
        .map((k) => `${esc(k)}=${esc(params[k])}`)
        .join('&')}`;
}
