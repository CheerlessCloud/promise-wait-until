/* eslint-disable no-use-before-define */
import checkCondition from './check-condition';

/**
 * @typedef {function.<(Promise.<any>|any)>} ConditionFunction
 */

/**
 * @param {ConditionFunction} conditionFunction - Checker function.
 * @param {number} [intervalTimeout=50] - Interval to invoke conditionFunction.
 * @param {(number|{ time: number, message: string })?} timeout - Timeout to check.
 */
function waitUntil(conditionFunction, intervalTimeout = 50, timeout) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-unused-vars
    let timer = null;
    const endTime = timeout ? Date.now() + (timeout.time ? timeout.time : timeout) : undefined;
    function check(callback) {
      checkCondition(conditionFunction, (err, result) => {
        if (err) {
          return reject(err);
        } else if (result.isTrue) {
          return resolve(result.value);
        }
        callback();
      });
    }

    check(() => {
      timer = setTimeout(timerChecker, intervalTimeout);

      function timerChecker() {
        if (endTime && endTime <= Date.now()) {
          return reject(new Error(
            (timeout.message ? timeout.message : 'Time is up'),
            'TIMEOUT',
          ));
        }

        check(() => {
          timer = setTimeout(timerChecker, intervalTimeout);
        });
      }
    });
  });
}

module.exports = waitUntil;
