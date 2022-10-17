import moment from 'moment';

export const addUTCOffsetToDateTime = (dateTime) => {
    const now = moment();
    const localOffset = now.utcOffset() / 60;

    const dateTimeValue = new Date(dateTime);
    dateTimeValue.setHours(dateTimeValue.getHours() + localOffset);

    return dateTimeValue;
}
