import {
  differenceInCalendarDays,
  isSameMonth,
  endOfDay,
  endOfMonth,
  startOfDay,
  startOfMonth,
  startOfToday,
  add,
  sub,
} from 'date-fns';
/* eslint-disable no-restricted-syntax */
/* eslint-disable valid-jsdoc */

// Import and use like:
//    import { hasValue } from 'helpers/utils';

/**
 * Checks to see if your value has a truthy value. This is especially useful in
 * React.js code. Instead of needing to worry about the type of value you're
 * checking, you can simply use `hasValue`. Not to mention, you might forget to
 * check null or undefined in some cases.
 *
 * Quite often, you're writing code like:
 *
 * @example
 * <div>
 *   {data && (
 *     <div>{data.name}</div>
 *   )}
 * </div>
 *
 * This can instead be changed to:
 * @example
 * <div>
 *   {hasValue(data) && (
 *     <div>{data.name}</div>
 *   )}
 * </div>
 *
 * @param {any} value to check.
 *
 * @returns {boolean} Whether the `value` has a value.
 */
export function hasValue(value) {
  // Window is not an object or array, it's special.
  if (value === window) {
    return !isNil(value);
  }

  if (isDate(value)) {
    return true;
  }

  if (isObject(value) || Array.isArray(value)) {
    return !isEmpty(value);
  }

  // guards against blank and white spaces
  if (isString(value)) {
    const isEmptyString = !value || value.trim().length === 0;
    const isUndefinedString = value === 'undefined' || value === 'null';
    return !isEmptyString && !isUndefinedString;
  }

  if (isNumeric(value)) {
    return true;
  }

  return false;
}

export const isEmpty = (obj) => {
  if ([Object, Array].includes((obj ?? {}).constructor)) {
    return !Object.entries(obj ?? {}).length;
  }

  if (isString(obj)) {
    return !hasValue(obj);
  }

  return false;
};

export function isNil(value) {
  // eslint-disable-next-line no-eq-null, eqeqeq
  return value == null;
}

export function isFunction(func) {
  return typeof func === 'function';
}

export function isNumeric(num) {
  return !Number.isNaN(parseFloat(num)) && Number.isFinite(num);
}

export function isObject(obj) {
  return obj?.constructor === Object;
}

export function isString(str) {
  return typeof str === 'string' || str instanceof String;
}

export function trimSpaces(value) {
  return isString(value) ? value.trim() : value;
}

export function isDate(value) {
  return (
    !isNil(value) && value instanceof Date && !Number.isNaN(value.valueOf())
  );
}

export function isValidSearchParam(value) {
  return (
    value !== undefined &&
    value !== 'undefined' &&
    value !== null &&
    value !== 'null'
  );
}

export function paramsToObject(entries) {
  const result = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
}

// Helper for cleaning objects before sending to API
export function removeEmpty(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => !isNil(v))
      .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v])
  );
}

/* eslint-disable no-unused-vars */
// one line solution to delete using destructuring
export const removeItem = (key, { [key]: _, ...obj }) => obj;
/* eslint-enable no-unused-vars */

/**
 * Sorts an array by a property.
 *
 * @example
 * [{ name: 'a' }, { name: 'b'}].sort(sortBy(x => x.name))
 *
 * @param propertyAccessor {func} Function to access property of object.
 * @param isAsc {boolean} Sort by ascending order or not.
 *
 * @returns {func} Sort function to pass to Array.prototype.sort
 */
export function sortBy(propertyAccessor, isAsc = true) {
  const direction = isAsc ? 1 : -1;

  function getProperty(obj) {
    if (isFunction(propertyAccessor)) {
      return propertyAccessor(obj);
    }
    if (isString(propertyAccessor)) {
      return obj[propertyAccessor];
    }

    throw new Error('Unsupported sort propertyAccessor in sortBy');
  }

  return (a, b) => {
    const aProp = getProperty(a);
    const bProp = getProperty(b);

    if (isString(aProp) && isString(bProp)) {
      return aProp.localeCompare(bProp) * direction;
    }

    return (aProp - bProp) * direction;
  };
}

/* eslint-disable no-promise-executor-return */
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function getKeyByValue(object, value) {
  console.log('Running', value, object);
  return Object.keys(object).find((key) => object[key] === value);
}

export function trimSpaceCharacters(str) {
  return str.replace(/\s/g, '');
}

export function sanitize(string) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  const reg = /[&<>"'/]/gi;
  return string.replace(reg, (match) => map[match]);
}

// e.g.: onKeyDown={stopPropagationForTab}
export const stopPropagationForTab = (event) => {
  console.log('Event key', event.key);
  if (event.key === 'Tab') {
    console.log('Stop it');
    event.stopPropagation();
  }
};

export const isPlural = (number) => {
  if (isNumeric(number)) {
    const absNumber = Math.abs(number);
    return absNumber > 1 || absNumber === 0;
  }
  return false;
};

export function isSameDay(a, b) {
  if (hasValue(a) && hasValue(b)) {
    return differenceInCalendarDays(a, b) === 0;
  }
  return false
}

export function isSameCalendarMonth(a, b) {
  return isSameMonth(a, b);
}

export function getDayRangeForDate(date) {
  const start = startOfDay(date);
  const end = endOfDay(date);
  return { start, end };
}

export function getMonthRangeForCalendar(date) {
  const start = sub(startOfMonth(date), { days: 12 });
  const end = add(endOfMonth(date), { days: 12 });
  return { start, end };
}

export function getMonthRangeForDate(date) {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return { start, end };
}

export function getPreviousDay(date) {
  return sub(startOfDay(date), { days: 1 });
}

export function getNextDay(date) {
  return add(startOfDay(date), { days: 1 });
}

export function getPreviousMonth(date) {
  return sub(startOfDay(date), { months: 1 });
}

export function getNextMonth(date) {
  return add(startOfDay(date), { months: 1 });
}

export function getStartOfToday() {
  return startOfToday();
}

// a: ?mixed, b: ?mixed
export function deepEqual(a, b) {
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }
  if (typeof a === 'object' && a !== null && b !== null) {
    if (!(typeof b === 'object')) return false;
    const keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;
    for (const key in a) {
      if (!deepEqual(a[key], b[key])) return false;
    }
    return true;
  }
  return a === b;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
