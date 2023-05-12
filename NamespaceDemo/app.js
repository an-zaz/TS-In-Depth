/// <reference path="utility-functions.ts" />
var r1 = Utility.Fees.calculateLateFee(1);
console.log(r1);
var r2 = Utility.maxBooksAllowed(4);
console.log(r2);
var util = Utility.Fees;
var r3 = util.calculateLateFee(3);
console.log(r3);
