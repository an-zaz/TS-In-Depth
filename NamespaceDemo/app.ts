/// <reference path="utility-functions.ts" />

const r1 = Utility.Fees.calculateLateFee(1);
console.log(r1);

const r2 = Utility.maxBooksAllowed(4);
console.log(r2);

import util = Utility.Fees;
const r3 = util.calculateLateFee(3);
console.log(r3);