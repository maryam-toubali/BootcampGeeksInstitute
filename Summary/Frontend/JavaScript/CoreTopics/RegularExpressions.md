
### 🧠 What Will You Learn?

* What RegEx (Regular Expressions) are.
* How to use them in JavaScript.
* How to perform **pattern matching** in strings.
* Case-insensitive matching.
* Testing strings like **email formats**.
* Key syntax and flags.

---

### 🔍 What is RegEx?

* A **RegEx (regular expression)** is a pattern used to match character combinations in strings.
* You use it for **search**, **validation**, **replace**, etc.

---

### 🧪 Example 1: Basic Pattern Matching

```js
let str = "Happy BirthDay";
let patt = /birthday/i; // 'i' makes it case-insensitive
let result = str.match(patt);

if (result) {
    console.log("Yes");
} else {
    console.log("No");
}
```

**Explanation:**

* `/birthday/i`:

  * `birthday` is the pattern to search.
  * `i` means "ignore case" (case-insensitive search).

---

### 🧪 Example 2: Test if a String is a Valid Email

```js
let regex = /^.+@.+\..+$/;
console.log(regex.test("johndoe@gmail.com")); // true
```

**Explanation:**

* `^`: Start of string
* `.+`: At least one character
* `@`: The @ symbol
* `.+\.`: At least one character and a dot
* `.+$`: At least one character till the end

✅ Good enough for a simple email test.
❗ But for real validation, use more complex regex or built-in libraries.

