---
published: true
---
Functional programming in general makes for succint and beatufil code. FP in JavaScript is no exception!

_Lambda Expressions_.
Are called Arrow Functions in JS, and were introduced in ES15.
These can be used to make anonymous function calls, such as when making a callback.
Essentially they replace `function(arg){
    return result == 42;
    }` with `(arg) => result == 42`
    
    
_Filter_.
The Filter function does what the name implies: it takes an a functor, as well as a predicate in this case an array of elements, and returns a new array for which all elements satisfy the predicate.

_Map_.
The Map function takes an array, as well as a function (e.g. an arrow function), and returns a new array, where the given function is applied to all the elements in the array.

_Reduce_.
Traditionally called Fold (or FoldBack), cane be used to iterate a collection, such as an array, and can collect values along the way. An example could be summing the values of an array containing some values, or concatenating strings in an array containing strings.

