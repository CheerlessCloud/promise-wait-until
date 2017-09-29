[![Build Status](https://img.shields.io/travis/CheerlessCloud/promise-wait-until.svg?style=flat-square)]()
[![Coverage Status](https://img.shields.io/coveralls/CheerlessCloud/promise-wait-until.svg?style=flat-square)]()
[![node](https://img.shields.io/node/v/promise-wait-until.svg?style=flat-square)]()
[![MIT License](https://img.shields.io/npm/l/promise-wait-until.svg?style=flat-square)]()

[![NPM](https://nodei.co/npm/@cheerlesscloud/promise-wait-until.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@cheerlesscloud/promise-wait-until/)

[![Sponsor](https://app.codesponsor.io/embed/jkPpzosXxwDBBaBNpoqWKCXd/CheerlessCloud/promise-wait-until.svg)](https://app.codesponsor.io/link/jkPpzosXxwDBBaBNpoqWKCXd/CheerlessCloud/promise-wait-until)

```javascript
import waitUntil from 'promise-wait-until';

async function fn(id){
  return await waitUntil(async () => {
    const result = await db.findOne({ _id: id });

    if (!result) {
      return result;
    }
  },
  1000,
  {
    message: 'Document with this id wasn\'t created, sorry =(',
    time: 60 * 60 * 1000,
  });
}

```

> **Every 1000ms invoke checker** function (first check immidiantly after run waitUntil), **wait** for end of promise (if he return promise). If checker **return value**, who can convert to **true** (as ==), **end** waitUntil and return value in promise, **otherwise continue** to check every 1000 ms.

> If checker function throw exception or reject promise, promise from waitUntil will be rejected.

> If in third param sended number of ms for timeout (or object with message and time), if checker function don't return 'true' value before timeout is end, reject promise with error message from object or 'Time is up'.
