//Ch
let client = "John";
const groceries = {
    fruits : ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice : "20$",
    other : {
        paid : true,
        meansOfPayment : ["cash", "creditCard"]
    }
};
const displayGroceries = () => {
  groceries.fruits.forEach(fruit => console.log(groceries[fruit]))
}
const cloneGroceries = () => {
    // Primitive value → copied by value
    let user = client;
    client = "Betty";
    console.log("user:", user); // Still "John" because strings are copied by value
    // Object → copied by reference
    let shopping = groceries;
    // Modify original object through reference
    shopping.totalPrice = "35$";
    shopping.other.paid = false;

    console.log("shopping.totalPrice:", shopping.totalPrice);     // "35$"
    console.log("groceries.totalPrice:", groceries.totalPrice);   // "35$" – affected
    console.log("groceries.other.paid:", groceries.other.paid);   // false – affected
};
displayGroceries();
cloneGroceries();