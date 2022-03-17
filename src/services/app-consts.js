//export const API_BASE_URL = process.env.NODE_ENV == 'development' ? '/dev/' : '/api/';

export const authTokenStorageKey = 'otopark-jwt-token';

export const DATE_PICKER_DATE_FORMAT = 'DD.MM.YYYY';
export const DATE_PICKER_DATE_TIME_FORMAT = 'DD.MM.YYYY HH:mm:ss';

export const EMAIL_REGEX_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const PASSWORD_REGEX_PATTERN = /^(?=.*[a-zçıöşü])(?=.*[A-ZÇİÖŞÜ])(?=.*\d)[a-zA-ZçıöşüÇİÖŞÜ\d]{8,30}$/;
export const PHONE_REGEX_PATTERN = /(\d{3})([-]+)(\d{3})(\d{2})(\d{2}$)/;