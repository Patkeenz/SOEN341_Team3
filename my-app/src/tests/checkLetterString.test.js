import {validString} from "../buildCheckout.js"

test('checks if a string is composed of only letters', () => {

  var str = "vyiv";

  expect(validString(str)).toBe(true);

  });