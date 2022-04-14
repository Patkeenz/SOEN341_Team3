import {invalidPhone} from "../buildCheckout.js"

test('checks if a string is composed of 10 digits', () => {

  var str = "1234567890";

  expect(invalidPhone(str)).toBe(false);

  });