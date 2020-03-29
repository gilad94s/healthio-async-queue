# Async Queue

A simple implementation of an async queue, used to run promises one after the other.

## Installation


### Create an AsyncQueue object
```javascript
const AsyncQueue = require('async-queue');

const helloQueue = new AsyncQueue(asyncFunc);
```

Create and AsyncQueue. Gets the async function as a parameter.

### `AsyncQueue.add(arg1, arg2, ...)`
Add a new call to the queue. 
Gets an array of arguments to pass to the previously given asyncFunc function.

### `AsyncQueue.on('success', resp => {...})`
When a call to the function finishes successfully, emits the returned value.

### `AsyncQueue.on('error', error => {...})`
When a call to the function finishes unsuccessfully, emits the error.

#### **Important Note!**
 
 If an error occurs and the error listener was not set, node will crush. To avoid this, use `AsyncQueue.on('error', error => {...})` 


## Example

```javascript
const AsyncQueue = require('async-queue');

function hello(firstName, lastName) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`hello ${firstName} ${lastName}`), 5e3)
  })
}

const helloQueue = new AsyncQueue(hello);
helloQueue.on('success', successResponse => console.log(successResponse));
helloQueue.on('error', error => console.error(error));

helloQueue.add('Dana', 'Shemesh');
helloQueue.add('Noa', 'Cohen');

```
 