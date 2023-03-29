import Validator from './validator';

/* eslint-disable */

const validStr = new Validator('Dmitry123');
console.log(`${validStr} - ${validStr.validateUsername()}`);

/* eslint-enable */
