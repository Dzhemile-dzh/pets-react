import momentTimezone from 'moment-timezone';
import { Constants } from '../constants';

const {
    londonTz,
    RACE_STATUSES: {
        NOW,
    },
} = Constants;

// NOTE:
// A function that checks if a click is outside of a given component.
// To use the function you have to attach your own click event to the component
// and pass the reference to the component.
// E.G:
/*
    const currentElement = useRef(null);

    useEffect(() => {
        document.addEventListener('click', hideDrawFilter);

        return () => {
            document.removeEventListener('click', hideDrawFilter);
        }
    });

    const hideDrawFilter = (event) => {
        if (isClickOutside(event,currentElement)) {
            toggleDrawFilter(false);
        }
    };
    ...
    return (
        <div className = "filters-draw" ref = {currentElement}>
    )
*/

export const isClickOutside = (event, component, exceptElements = []) => {
    const {
        target,
    } = event;

    const {
        current,
    } = component;

    if (exceptElements) {
        const isInside = exceptElements.some((item) => {
            return target.classList.contains(item);
        });

        return !current || !(isInside || current.contains(target));
    }

    return !current || !current.contains(target);
}

export const curry = (f) => {
    return function currify(...args) {
        return args.length >= f.length ?
            f(...args) :
            currify.bind(null, ...args)
    }
}

export const flip = (provider) => (pickedProps, pickedActions, component) => {
    return provider(component, pickedProps, pickedActions);
}

export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

export const makeComposable = (provider, pickedProps = [], pickedActions = []) => {
    return curry(flip(provider))(pickedProps, pickedActions);
}

export const setAppCookie = (cookieName, value) => {
    if (typeof window !== 'undefined') {
        document.cookie = `${cookieName}=${value}; path=/`;
    }
}

export const openPopUpWindow = (targetName) => {
    // We are passing the arguments in the right order,
    // In which we need the value, that exists, if the other values are undefined
    const getFirstNotUndefinedValue = (args) => args.find((item) => typeof item !== 'undefined')

    const screenLeft = getFirstNotUndefinedValue([window.screenLeft, window.screen.left])
    const screenTop = getFirstNotUndefinedValue([window.screenTop, window.screen.top])

    const screenWidth = getFirstNotUndefinedValue(
        [window.innerWidth, document.documentElement.clientWidth, window.screen.width],
    )

    const screenHeight = getFirstNotUndefinedValue(
        [window.innerHeight, document.documentElement.clientHeight, window.screen.height],
    )

    const width = 740;
    const height = 700;

    const left = screenWidth / 2 - width / 2 + screenLeft
    const top = screenHeight / 2 - height / 2 + screenTop

    // Creating our styles for our window
    // eslint-disable-next-line max-len
    const features = `width=${width},height=${height},left=${left},top=${top},location=yes,status=yes`
    // Now we need to create the window open instance and later we will get it by
    // Passing the correct target name, in our case `WindowLogin`
    window.open('', targetName, features)
}

export const isBritishCountry = (countryCode) => {
    return countryCode === 'GB' || countryCode === 'GBR';
}

export const calculateTime = (time) => {
    const timeInLondonTimezone = momentTimezone.tz(time, londonTz)
    const currentTimeInLondonTimezone = momentTimezone.tz(londonTz)

    const differenceInMiliseconds = timeInLondonTimezone.diff(currentTimeInLondonTimezone);
    const differenceInMinutes = momentTimezone.duration(differenceInMiliseconds).asMinutes();

    if (differenceInMinutes < 1) {
        return NOW;
    }

    if (differenceInMinutes >= 1 && differenceInMinutes < 2) {
        return '1 Min'
    }

    if (differenceInMinutes >= 2880) {
        return 'RACE';
    }

    if (differenceInMinutes > 120) {
        return 'LATER';
    }

    return `${Math.round(differenceInMinutes)} MINS`;
}
