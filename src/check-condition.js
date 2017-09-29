import isPromise from './is-promise';
import resultToBoolean from './result-to-boolean';

/**
 * @param {ConditionFunction} conditionFunction - Checked function.
 * @param {function(Error, { isTrue: boolean, value: any })} callback - Callback.
 */
export default function checkCondition(conditionFunction, callback) {
  try {
    const result = conditionFunction();

    if (isPromise(result)) {
      result
        .then(value => callback(null, { value, isTrue: resultToBoolean(value) }))
        .catch(err => callback(err));
    } else {
      callback(null, { value: result, isTrue: resultToBoolean(result) });
    }
  } catch (error) {
    callback(error);
  }
}
