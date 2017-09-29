import test from 'ava';
import waitUntil from '../src/index';

test('test successful execution', async (t) => {
  t.plan(2);

  let counter = 0;
  const result = await waitUntil(() => {
    counter += 1;

    if (counter >= 5) {
      return { counter };
    }
  });

  t.true(!!result);
  t.is(result.counter, 5);
});

test('condition function return promise', async (t) => {
  t.plan(2);

  let counter = 0;
  const result = await waitUntil(() => {
    counter += 1;

    if (counter >= 5) {
      return Promise.resolve({ counter });
    }
  });

  t.true(!!result);
  t.is(result.counter, 5);
});

test('throw exception in condition function', async (t) => {
  await t.throws(waitUntil(() => { throw new TypeError(); }), TypeError);
});

test('reject promise in condition function from promise', async (t) => {
  await t.throws(waitUntil(() => Promise.reject(new ReferenceError())), ReferenceError);
});

test('throw error on timeout (as number)', async (t) => {
  t.plan(2);

  const time = 500;
  const startTime = Date.now();

  try {
    await waitUntil(() => false, null, time);
  } catch (err) {
    t.is(err.message, 'Time is up');
    t.true(startTime + time <= Date.now());
  }
});

test('throw error on timeout (as object with message and time)', async (t) => {
  t.plan(2);

  const message = 'SomeMessage';
  const time = 500;
  const startTime = Date.now();

  try {
    await waitUntil(() => false, null, { message, time });
  } catch (err) {
    t.is(err.message, message);
    t.true(startTime + time <= Date.now());
  }
});

