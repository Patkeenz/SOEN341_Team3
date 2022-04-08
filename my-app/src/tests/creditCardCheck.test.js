import {creditCheck} from "../buildCheckout.js"

test('checks if credit card check function works', async () => {

  var cardNum = "12345"
  var cardDate = "12/34"
  var cardCVV = "123"

  expect(creditCheck(cardNum, cardDate, cardCVV)).toBe(true);

  });