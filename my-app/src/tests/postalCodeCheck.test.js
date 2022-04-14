import {invalidPostal} from "../buildCheckout.js"

test('checks if a postal code is valid', () => {

  var str = "h1h1h1";

  expect(invalidPostal(str)).toBe(false);

  });