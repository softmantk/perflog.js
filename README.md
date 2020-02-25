#PERFLOG


A simple performance logger. No external library. Not tested in production. It can be used for debugging and developement environment. 



##Syntax 

```js 
    perf("mark");
```

##Usage

Print log in the console: 
```js
    // initialize 
    const perf = require("perf")();
    // mark the point
    perf("apiCall");

    const response = await axios.get();

    // mark again. so between this two perf() calls it logs the time in the log
    perf("apiCall");
```

Output
```text
    PERF:apiCall: 1160.50
```
To get all the performance logs :

```js
    const summary = perf._summary;
```

Output: 
```json
    {
      "apiCall": "1160.50",
      "db": "1113.13"
    }
```




