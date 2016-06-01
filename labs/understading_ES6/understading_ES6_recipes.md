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




#Functions 
ECMAScript 6 makes it easier to provide default values for parameters by providing initializations that are used when the parameter isn’t formally passed. 

```
function makeRequest(url, timeout = 2000, callback = function() {}) {

    // the rest of the function

}
```

The arguments object in a function using ECMAScript 6 default parameter values, however, will always behave in the same manner as ECMAScript 5 strict mode, regardless of whether the function is explicitly running in strict mode. 

```
// not in strict mode
function mixArgs(first, second = "b") {
    console.log(arguments.length);
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
    first = "c";
    second = "d"
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
}

mixArgs("a");
```

You can use a previous parameter as the default for a later parameter. Here’s an example:


```
function add(first, second = first) {
    return first + second;
}

console.log(add(1, 1));     // 2
console.log(add(1));        // 2
```

The ability to reference parameters from default parameter assignments works only for previous arguments, so earlier arguments do not have access to later arguments.

```
function add(first = second, second) {
    return first + second;
}

console.log(add(1, 1));     // 2
console.log(add(1));        // throws error
```

 Similar to a let declaration, each parameter creates a new identifier binding that can’t be referenced before initialization without throwing an error.

 Rest parameter - A rest parameter is indicated by three dots (...) preceding a named parameter. There are two restrictions on rest parameters. 
 * The first restriction is that there can be only one rest parameter, and the rest parameter must be last. 
 * The second restriction is that rest parameters cannot be used in an object literal setter. This restriction exists because object literal setters are restricted to a single argument.
Rest parameters were designed to replace arguments in ECMAScript 6

```
function checkArgs(...args) {
    console.log(args.length); // 2
    console.log(arguments.length); // 2
    console.log(args[0], arguments[0]); // a a
    console.log(args[1], arguments[1]); // b b
}

checkArgs("a", "b");

```

######Function Constructor
The Function constructor is an infrequently used part of JavaScript that allows you to dynamically create a new function. The arguments to the constructor are the parameters for the function and the function body, all as strings.

```
var add = new Function("first", "second", "return first + second");

console.log(add(1, 1));     // 2
```

######Spread operator 

```
let values = [25, 50, 75, 100]

// equivalent to
// console.log(Math.max(25, 50, 75, 100));
console.log(Math.max(...values));           // 100
```

######Named functions 
Functions created using bind() will have their names prefixed with "bound" and functions created using the Function constructor have a name of "anonymous", as in this example:

```
var doSomething = function() {
    // ...
};

console.log(doSomething.bind().name);   // "bound doSomething"

console.log((new Function()).name);     // "anonymous"
```

######Arrow functions 
Arrow functions are, as the name suggests, functions defined with a new syntax that uses an “arrow” (=>). But arrow functions behave differently than traditional JavaScript functions in a number of important ways:
* No this, super, arguments, and new.target bindings 
* Cannot be called with new 
* No prototype
* Can’t change this
* No arguments object
* No duplicate named arguments

Syntax 

```
var reflect = value => value;

// effectively equivalent to:

var reflect = function(value) {
    return value;
};
```

If there are no arguments to the function, then you must include an empty set of parentheses in the declaration, as follows:

```
var getName = () => "Nicholas";

// effectively equivalent to:

var getName = function() {
    return "Nicholas";
};
```

When you want to provide a more traditional function body, perhaps consisting of more than one expression, then you need to wrap the function body in braces and explicitly define a return value, as in this version of sum():

```
var sum = (num1, num2) => {
    return num1 + num2;
};

// effectively equivalent to:

var sum = function(num1, num2) {
    return num1 + num2;
};
```

If you want to create a function that does nothing, then you need to include curly braces, like this:

```
var doNothing = () => {};

// effectively equivalent to:

var doNothing = function() {};
```

an arrow function that wants to return an object literal outside of a function body must wrap the literal in parentheses.

```
var getTempItem = id => ({ id: id, name: "Temp" });

// effectively equivalent to:

var getTempItem = function(id) {

    return {
        id: id,
        name: "Temp"
    };
};
```

You can accomplish immediately-invoked function expressions (IIFEs) using arrow functions, so long as you wrap the arrow function in parentheses:

```
let person = ((name) => {

    return {
        getName: function() {
            return name;
        }
    };

})("Nicholas");

console.log(person.getName());      // "Nicholas"
```

Note that the parentheses are only around the arrow function definition, and not around ("Nicholas"). This is different from a formal function, where the parentheses can be placed outside of the passed-in parameters as well as just around the function definition.




