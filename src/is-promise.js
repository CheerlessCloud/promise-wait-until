/**
 * @param {(Promise|{then: function, catch: function}|any)} value - Value to check.
 * @returns {boolean} - Can be used as Promise or not.
 */
export default function isPromise(value) {
  return (
    value instanceof Promise ||
    (
      !!value &&
      (typeof value === 'object' || typeof value === 'function') &&
      typeof value.then === 'function'
    )
  );
}
