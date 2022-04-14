import {invalidString} from "../buildCheckout.js"

test('checks if a string is composed of only letters', () => {

  var str = "vyiv";

  expect(invalidString(str)).toBe(false);

  });