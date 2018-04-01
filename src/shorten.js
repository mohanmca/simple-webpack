import { ifElse, has, over, assoc, lensProp, inc } from "ramda"

var incCount = ifElse(
    has('count'),
    over(lensProp('count'), inc),
    assoc('count', 1)
);

let ans = incCount({});           //=> { count: 1 }
let ans2 = incCount({ count: 1 }); //=> { count: 2 }

console.log(ans)
console.log(ans2)
console.log(ans)