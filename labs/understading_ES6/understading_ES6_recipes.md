## New concepts
####Block Bindings 
#####Var Declarations and Hoisting
* Hoisting - Variable declarations using var are treated as if they are at the top of the function (or global scope, if declared outside of a function) regardless of where the actual declaration occurs;

#####Block-Level Declarations
* Block scopes are also called lexical scopes.
* Lexical scopes are created
	* Inside of a function
	* Inside of a block indicated by {}

#####Let declariation
* You can basically replace var with let to declare a variable, but limit the variable’s scope to only the current code block. No hoisting. No re-declaration

```
var count = 30;

// Syntax error
let count = 40;
```

* No error is thrown if a let declaration creates a new variable with the same name as a variable in its containing scope, as demonstrated in the following code:

```
var count = 30;

// Does not throw an error
if (condition) {

    let count = 40;

    // more code
}
```

##### Constant Declarations
* Every const variable must be initialized on declaration.
* Constants, like let declarations, are block-level declarations
* Unlike constants in other language, the value a constant holds may be modified if it is an object. That means const declarations for objects do not prevent modification of those objects. For example:

```
const person = {
    name: "Nicholas"
};

// works
person.name = "Greg";

// throws an error
person = {
    name: "Greg"
};
```

* A variable declared with either let or const cannot be accessed until after the declaration. If this happens it results to a **temporal dead zone  

* You can, however, use typeof on a variable outside of the block where that variable is declared, though it may not give the results you’re after. There is no value binding, and typeof simply returns "undefined".

```
console.log(typeof value);     // "undefined"

if (condition) {
    let value = "blue";
}
```

* Block binding in loops

```
for (var i = 0; i < 10; i++) {
    process(items[i]);
}

// i is still accessible here
console.log(i);                     // 10
```

*  Loop variables are accessible from outside the scope of the loop. 
* Functions in loops

```
var funcs = [];

for (var i = 0; i < 10; i++) {
    funcs.push(function() { console.log(i); });
}

funcs.forEach(function(func) {
    func();     // outputs the number "10" ten times
});
```

* immediately-invoked function expressions (IIFEs)

```
var funcs = [];

for (var i = 0; i < 10; i++) {
    funcs.push((function(value) {
        return function() {
            console.log(value);
        }
    }(i)));
}

funcs.forEach(function(func) {
    func();     // outputs 0, then 1, then 2, up to 9
});
```

* A let declaration simplifies loops by effectively mimicking what the IIFE does in the previous example

```
var funcs = [];

for (let i = 0; i < 10; i++) {
    funcs.push(function() {
        console.log(i);
    });
}

funcs.forEach(function(func) {
    func();     // outputs 0, then 1, then 2, up to 9
})
```

* The same is true for for-in and for-of loops, as shown here:

```
var funcs = [],
    object = {
        a: true,
        b: true,
        c: true
    };

for (let key in object) {
    funcs.push(function() {
        console.log(key);
    });
}

funcs.forEach(function(func) {
    func();     // outputs "a", then "b", then "c"
});
```

* For a normal for loop, you can use const in the initializer, but the loop will throw a warning if you attempt to change the value. 

```
var funcs = [];

// throws an error after one iteration
for (const i = 0; i < 10; i++) {
    funcs.push(function() {
        console.log(i);
    });
}
```

* When used in a for-in or for-of loop, on the other hand, a const variable behaves the same as a let variable

```
var funcs = [],
    object = {
        a: true,
        b: true,
        c: true
    };

// doesn't cause an error
for (const key in object) {
    funcs.push(function() {
        console.log(key);
    });
}

funcs.forEach(function(func) {
    func();     // outputs "a", then "b", then "c"
});
```

*  When var is used in the global scope, it creates a new global variable, which is a property on the global object (window in browsers).

```
// in a browser
var RegExp = "Hello!";
console.log(window.RegExp);     // "Hello!"

var ncz = "Hi!";
console.log(window.ncz);        // "Hi!"
```

* If you instead use let or const in the global scope, a new binding is created in the global scope but no property is added to the global object. 

```
// in a browser
let RegExp = "Hello!";
console.log(RegExp);                    // "Hello!"
console.log(window.RegExp === RegExp);  // false

const ncz = "Hi!";
console.log(ncz);                       // "Hi!"
console.log("ncz" in window);           // false
```
