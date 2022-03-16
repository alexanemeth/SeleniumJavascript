const calculator = require("./calculator");
const should = require("chai").should();

describe("Calculator tests", function () {
  let testData = [
    { numberOne: 2, numberTwo: 3, expectedResult: 5 },
    { numberOne: 4, numberTwo: 1, expectedResult: 5 },
    { numberOne: 6, numberTwo: 2, expectedResult: 8 },
  ];

  testData.forEach(({ numberOne, numberTwo, expectedResult }) => {
    it(`addition of ${numberOne} and ${numberTwo} should equal to ${expectedResult}`, function () {
      let result = calculator.add(numberOne, numberTwo);
      result.should.equal(expectedResult);
    });
  });
});
