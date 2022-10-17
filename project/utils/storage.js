const isSessionStorageEnabled = () => {
    try {
        sessionStorage.setItem('test-local-storage', 'test-local-storage');
        sessionStorage.removeItem('test-local-storage');
        return true;
    } catch (err) {
        return false;
    }
}

export const getSessionStorageItem = (key) => (isSessionStorageEnabled() ?
    sessionStorage.getItem(key) :
    null);

export const setSessionStorageItem = (key, value) => {
    if (isSessionStorageEnabled()) {
        sessionStorage.setItem(key, value);
    }
}

export const clearSessionStorageItem = (key) => {
    if (isSessionStorageEnabled()) {
        sessionStorage.removeItem(key);
    }
}

export const setCurrentPageName = (pageName) => {
    const previousPage = getSessionStorageItem('currentPage');

    // NOTE: saving in sessionStorage, because we want to have the data after refresh
    setSessionStorageItem('currentPage', pageName);
    setSessionStorageItem('previousPage', previousPage);
}

export const getPreviousPageName = () => {
    const previousPage = getSessionStorageItem('previousPage');
    return previousPage === 'null' ? null : previousPage;
}

const isLocalStorageEnabled = () => {
    try {
        localStorage.setItem('test-local-storage', 'test-local-storage');
        localStorage.removeItem('test-local-storage');
        return true;
    } catch (err) {
        return false;
    }
}

export const getLocalStorageItem = (key) => (isLocalStorageEnabled() ?
    localStorage.getItem(key) :
    null);
