---
tags:
  - JavaScript
  - personal
created: 2026-02-05
modified: 10-02-2026 13:02
topic:
course:
---

[[#functions]] [[#arrays]]
###### FreeCodeCamp

Javascript is a programming language.
HTML and CSS are markup languages.

#### data types
number - 
can be integer and floating point values .
string - sequence of characters 
boolean - t or f
undefined - means declared variable but havent assigned anything
null - means variable set to nothing intentionally 

*object* data type - collection of key-value pairs
great for grouping related information together.
e.g
```js
{
  name: "Alice",
  age: 30
};
```

*symbol* - special value in js, that is always unique and cannot be changed. often used to create unique labels or identifier properties.

```js
Symbol('mySymbol');
```

*bigInt* - very large numbers that exceed the number data type limit.
```js
1234567890123456789012345678901234567890n;
```




#### operators that define variables

variables are case sensitive 
meaning u can define two diff variables with Age and age.
variables cant begin with a number. either a letter, underscore, or dollar sign.
**let** keyword - variable definitnion - can reassign values to variables created with this. Local scope.
**const** keyword - cannot assign a new variable to this, kind of like static. it is constantly the same. (typeError if you try to.) must declare a const variable with a value. (syntaxError if you don't)
**var** keyword - the original way to declare variables, function scoped or globally scoped.

Booleans in javascript.
use same operators const and let to define them.
just assign value as true or false.

#### strings
primitive data type (along with numbers, booleans, null, and undefined)
can use single or double quotes to create
strings are immuteable - meaning , like a const variable, once a string is created you cannot change it.

concatenation in javascript, means creating a whole new string object in memory and replacing the original string.
can be done with the +, or += operators, or the concat() method (used to concatenate multiple strings).


Javascript is dynamically typed meaning a variables data type is checked and applied at **runtime**. This differes to a statically typed language like C , which checks variable types at **compile time** 

Statically typed = type of each variable/function must be explicitly declared inline. e.g c, c++, c#, java, go, swift
Dynamically typed = variables/functions dont have to be explicitly declared, and the program infers what they are at runtime. e.g python, javascript, ruby, php

What will be the output of `console.log(typeof null);`?
- "object"


template literals - are defined wtih backticks, they make it easier for string manipulation, including embedding variables inside a string directy, like we did above.
using backticks ( ``` `` )
e.g 

```js
let variable = `Hello I am using ${secondVariable} in the same string`
```
the second variable syntax is an example of string interpolation. (meaning, embedding variables directly into a string literal.)
```js
let poem = `Roses are red,
Violets are blue,
JavaScript is fun,
And so are you.`;
```
they also support multiline strings where you would elsewise need a new line character `\n`
```js
const song = "Bohemian Rhapsody";
const score = 9.5;
const highestScore = 10;
const output = `One of my favorite songs is "${song}". I rated it ${
  (score / highestScore) * 100
}%.`;
```
and another feature is it allows you to embed expressions directly into a string.


you can access characters from a string using bracket notation and the index of the location of the character you are trying to access.

to use characters that you normally cant, use escape character "\" the backslash e.g \" to use a quote.

indexOf("substring)
to find the postion of the string substring, string a larger string. Returns the start of the substring, negative 1 when it is not in there, and you can set the second argument as the start positon of the search e.g indexOf("hell",10) - starts the search for substring hell and index 10.
^ case sensitive.

#### prompt() method.
opens a dialog box to prompt the user for input.

include() checks whether string includes substirng  - returns true or false, case sensitive

slice() - extract a portion of a string based on start and end index (two arguments) - returns that portion, so need to assign to a new string.

trim() - trim whitespace from beginning and end of a string. trimStart() , and trimEnd() to trim only the start and only the end respectively.

replace()
#### math
exponentiation operator - `**`
calculates the resutl of raising the first operand to he power of the second.
e.g 2`**`3= 8

bitwise operator
AND , OR, XOR, NOT,
&          |      ^       ~

remainder %
remainder and set the variable to the value of the remainder (similar to x*=2)
x%=2

The `==` operator only compares values whereas the `===` operator compares values and types.
#### `===` → **strict comparison**

checks type and value.

```js
0 === 0      // true 
0 === "0"    // false ❌ (number vs string)
````

#### `==` → loose comparison (does type coercion)

It tries to convert types for you:

```js
0 == "0"     // true 
false == 0   // true  
"" == 0      // true 
````


#### `+` operator (unary plus )
used to convert another data type to its number version e.g
- **String to Number Conversion**:
    - `+"42"` results in `42` (number).
    - `+"3.14"` results in `3.14` (number).
    - `+"0xFF"` results in `255` (hexadecimal).
- **Boolean/Null/Undefined Conversion**:
    - `+true` becomes `1`.
    - `+false` becomes `0`.
    - `+null` becomes `0`.
    - `+undefined` becomes `NaN`.
- **No Change to Existing Numbers**:
    - `+100` remains `100`.
    - `+-5` remains `-5` (like unary minus).

```js
console.log(5 == '5');
```
is true - because javascript performs type coercion, attempting to convert the values to a common type before comparison.

#### unary negation operator `-`
flips the sign of a variable
e.g
10 -> -10
"4" -> -4
true becomes false

#### nullish coalescing operator `??`
check whether something is null

**strict equality (`===`)** and **strict inequality (`!==`)** operators avoid type conversion 
meaning if you were to compare the number 5 to the string "5" with the triple equals you would get false. compared to true with the normal equals == because it does type coercion and turns them into the same primitive type.

```js
const a = 2;
if (1 == "1") {
  let b = 3;
  console.log(a + b);
}
console.log(b);
```
5, and then an error is raised.
because b is declared out of scope of the last console.log - the variable doesn't exist.

##### spread operator `...`
collects all values an assigns to single array
e.g
```js
function add(...numbers) {
    return numbers.reduce((sum, n) => sum + n, 0);
}

add(1, 2, 3); // 6

//or

function log(first, ...rest) {
    console.log(first); // 1
    console.log(rest);  // [2, 3, 4]
}

log(1, 2, 3, 4);
```


### functions
when a function returns without a return statement, the default value will be `undefined`
reusable pieces of code that take in arguments/parameters

#### Arrow functions
```js
function greetings(name) {
  console.log("Hello, " + name + "!");
}
```

But another way to write functions  - refactor top function to the arrow function

```js
const greetings = (name) => {
  console.log("Hello, " + name + "!");
};
```

taking a const variable (unchanging) and assigning it to an anonymous function e.g a function with no name. 
it can take 0 to many parameters
e.g 1 parameter:
```js
const greetings = name => {
  console.log("Hello, " + name + "!");
};
```
no parameters
```js
const greetings = () => {
  console.log("Hello");
};
```
single line function with single parameter
```js
const greetings = name => console.log("Hello, " + name + "!");
```
example of a function that returns a result
```js
const calculateArea = (width, height) => {
  return width * height;
}; 

console.log(calculateArea(5, 3)); // 15
```
its one line version, that removes the return statement and returns the values without it. you cannot have a return statement on a one line function
```js
const calculateArea = (width, height) => width * height;
```
a function can have a default value, so if a value is not passed then it is used. But if a value is passed then the default value is not used.

#### Global, local, and block scope

Global - variables declared outside of any functions or statements - accessed from anywhere
Local - variables declared in a  function - accessed only inside or deeper than the place they were declared.
Block scope - introduced the same time let and const were. A block is any section within curly braces. so any if statements, loops, or switch statements.


fucntion that checks type of variable -
using typeof operator and string equality opoerator ===
```js
function isBoolean(value) {
  return typeof value === 'boolean';
}
```

Leap year problem
correct check is 
if a leap year is divisible by 4 AND (not divisible by 100 OR divisible by 400)

**25/01**
Because JavaScript is dynamically typed -- meaning types are checked at runtime, not compile time -- you can return different types within a function, e.g you can return a string or num in the same function.

Ternary operator:

conidtion ? valueIFTrue: valueIfFalse

e.g
num1 === 0 ? return "Zero" : return num1

e.g Even or Odd
```js
let result = num % 2 === 0 ? "Even" : "Odd";
```
Logged in check
```js
let message = isLoggedIn ? "Welcome back!" : "Please log in";
```

Default parameters allow functinos to have predetermined values when arguments aren't supplied when the function is called, e.g having a default tax rate 
```js
const calculateTotal = (amount, taxRate = 0.05) => {
  return amount + (amount * taxRate);
};
console.log(calculateTotal(100)); //output 105
```
But default parameters are overrided when the function is called with the second argument.
```js
console.log(calculateTotal(100,0.04)); // Output: 104
```

- **Function declaration** → `function getSum(x, y) {}`
- **Function expression** → `const getSum = function(x, y) {}`

A function declartion is different to an expression because it is hoisted - meaning you can call it before it's defined, so if its defined after it is called it doesnt throw an error.
e.g
```js
greet(); 

function greet() {
  console.log("Hello!");
}
```


A function expression does not do this, the function is assignned to a variable and is declared at runtime, there is no hoisting. So an error will happen.
```js
// This will throw a TypeError: sayHi is not a function
sayHi(); 

const sayHi = function() {
  console.log("Hi!");
};
```
This type of function is used commonly for callbacks and inline logic during runtime. So if you had a function that depended on runtime input.


Divide by zero = infinity.

### arrays
[[#FreeCodeCamp|Top]]

Arrays in javascript are dynamic, meaning you dont have to allocate stpace for them.
They are zero indexed like all other languages - meaning the first element starts from the index 0.
Key array methods:
`push()`, `pop()`, `shift()`, `unshift()`, `splice()`

declaring an array with const creates a reference to an array. the array is muteable in memory and can be edited, this is why you can use the array methods on a const array.

pop() - remove last item in array.
unshift() - adds one or more elements to the beginning of an array
shift() - removes the first element of the array.

array method `.join()` - takes a seperator as its only argument e.g a space or a comma, and joins the elements of an array into a single string.

iterating through array
```js
let nums = [1,2,3,4];

nums.forEach(num => console.log(num)); // same as for(let num in nums)
```

#### 2d arrays
```js
let chessboard = [
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["r", "n", "b", "q", "k", "b", "n", "r"]
];

console.log(chessboard[0][3]); // "Q"
```

### array destructuring

a way of grabbing each value from an array and assigning it to its own variable.
```js
let fruits = ["apple", "banana", "orange"];

let [first, second, third] = fruits;

console.log(first);  // "apple"
console.log(second); // "banana"
console.log(third);  // "orange"
```
skipping a value using `, ,` and spread operator example `...`
```js
let numbers = [1, 2, 3, 4, 5];
let [a, , b, ...rest] = numbers;
console.log(a, b, rest); // 1,3, [4,5]
```
default value example
```js
let colors = ["red", "green", "blue"];
let [primary, secondary, tertiary, quaternary = "yellow"] = colors;
console.log(quaternary); // "yellow"
```

real examples
if a function returns multiple values e.g coordinates
```js
function getCoords() {
    return [12, 45];
}

const [x, y] = getCoords();
```
or
swapping values without the need for temp variables 
```js
let a = 1;
let b = 2;

[a, b] = [b, a];
```
use when
- order is known
- meaning of variable names are obvious e.g not a,b,c
- it improves readibility
not when
- array structure is unclear
- variable names get cryptic
##### reversing a string
Reversing a string using three methods split, reverse, and join
```js
let string = "hello";

console.log("\nReversing string",string); // output:Reversing string hello

console.log("Reversed:",string.split("").reverse().join(""));// output: elloh
```

**`indexOf()` method**
first parameter = search string, second = start of search (if second not provided search starts from 0 index)
returns -1 if cant find

**`splice()` method**
way to modify arrays, allows you to remove or add elements from any position in the array, enabling you to remove stuff in the middle of an array without having a gap.

splice mutates the original array, modifying it in place, instead of creating a new array.
```js
array.splice(startIndex, itemsToRemove, item1, item2)
```

itemsToRemove - optional
item1,item2 - items to add in the array

e.g removing 2 elements starting at index two 
```js
let fruits = ["apple", "banana", "orange", "mango", "kiwi"];
let removed = fruits.splice(2, 2); // will remove orange and mango
```
e.g adding two items after the first element in the array
```js
let colors = ["red", "green", "blue"];
colors.splice(1, 0, "yellow", "purple");
```

