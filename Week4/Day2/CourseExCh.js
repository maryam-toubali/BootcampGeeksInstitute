// //1st example
// const myArr = [1, 2, 3, 4, 5, 6, 7, 8];
// myArr.some((value)=> { return (value%2 == 0); });
// //output : true 
// //because there is at least one even number in the array

// //2nd example
// myArr.some((value)=> { return (value < 0); });
// //output: false 
// //because there is no negative number in the array

// //If the arrow function is only returning a value you don't need the return keyword
// //If the arrow function takes only one parameter you can omit the parentheses
// myArr.some(value => value < 0 );
// //output: false 
// //because there is no negative number in the array

// //3rd example
// function isEven(x) {
//   console.log(x) 
//   return (x % 2 == 0);
// }

// myArr.some((value) => isEven(value));
// //output : 1 2 true
// //stops iterating as soon as an even number is found 


// //1st example
const myArr = [1, 2, 3, 4, 5, 6, 7, 8];
// myArr.every((value)=> { return (value > 0); });
// //output : true 
// //because all the elements of the array are positive

// //2nd example
// myArr.every(value => value == 5 );
// //output : false 
// //because not all the elements of the array are equal to 5

//3rd example
myArr.every((value) => { 
    console.log(value); 
    return (value != 4); 
});
//output 1 2 3 4 false
//because as soon as an element in the array is equal to 4, the method every() stops iterating 