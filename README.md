#PERFLOG


A simple performance logger. No external library. Not tested in production. It can be used for debugging and development environment. 



##Syntax 

```js 
// declarion
     const perf = require("perflog")();
//mark
     perf("apiCall");
```

##Usage examples

Print log in the console: 
```js
    // initialize 
    const perf = require("perflog")();
   
    // mark the point
    perf("apiCall");
    const response = await axios.get();
    // mark again. so between this two perf() calls it logs the time in the console
    perf("apiCall");

```
If you dont wish to log into the consol,

```js
     // initialize 
        const perf = require("perflog")({inLineLog:false});
       
        // mark the point
        perf("apiCall");
        const response = await axios.get();
        // mark again.
        perf("apiCall");
```
Now console logs wont be there. To get the performance details. The way is using perf._summary 
```js
    console.log(perf._summary);
```




To get all the performance logs :

```js
    perf("apiCall");
    const response = await axios.get();
    // mark again. so between this two perf() calls it logs the time in the console
    perf("apiCall");
    
    perf("db");
    await db.create(data);
    perf("db");

    const summary = perf._summary;
    console.log(summary);
```

Output: 
```json
    {
      "apiCall": "1160.50",
      "db": "1113.13"
    }
```

##Options: 
 ```js
    const perf = require("perflog")({
        enabled:true,
        inLineLog:true, 
        round:2,
        logPrefix:"PERF:"
    });
```


| Options  | description |
| ------------- | ------------- |
| enabled  | To enable/disable library logging. If set to true, logging will be disabled. Default: true  |
| inLineLog  | DEFAULT:true. if enabled, on the 2nd mark, it will console log the performance.    |
| round| DEFAULT:2, round off value. 
| logPrefix|  DEFAULT: 'PERF:' | 


## Environment configuration

####PERF_LOG :
If PERF_LOG is set to false, all the logging  will be disabled. No in line logging and no logging report in perf._summary object. 

