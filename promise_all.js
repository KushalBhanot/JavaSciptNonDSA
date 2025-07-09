export default function promiseAll(iterable) {
    return new Promise((resolve, reject) => {
        let n = iterable.length;
        if(n === 0) resolve([]);

        let result = new Array(n);
        let resolvedCount = 0;

        for(let i = 0; i < n; i++) {
            Promise.resolve(iterable[i])
                .then((val) => {
                    result[i] = val;
                    resolvedCount++;

                    if(resolvedCount === n) resolve(result);
                })
                .catch((err) => reject(err));
        }
    })
}

| Pattern                              | Behavior                              |
| ------------------------------------ | ------------------------------------- |
| `new Array(n)`                       | Creates sparse array with empty slots |
| `Array.from({ length: n })`          | Creates array with `undefined` values |
| `new Array(n).fill(x)`               | Fills with same value/reference       |
| `Array.from({ length: n }, () => x)` | Fills with **unique values**          |
| `arr.map()` on sparse                | Doesn’t run for empty slots           |
| `arr[0].push(x)` when uninitialized  | Throws error                          |
