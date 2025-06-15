
# 🔧 **THE GENERAL IDEA (The big picture first)**

You are building:

| Layer                                    | Purpose                                               |
| ---------------------------------------- | ----------------------------------------------------- |
| `public/index.html` + `public/script.js` | The **frontend** (what user sees in browser)          |
| `server.js`                              | The **backend server** (the API server)               |
| `modules/db.js`                          | Database helper functions                             |
| `PostgreSQL`                             | Your actual database                                  |
| `package.json`                           | Project configuration file (manage dependencies etc.) |

---

# 🔥 **Frontend: index.html**

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title></title>
</head>
<body>
  <h1>New User</h1>
  username: <input type="text" name="user" id="user">
  <button type="button" onclick="sendData()">Add</button>
  <button type="button" onclick="getData()">Show</button>
  <button type="button" onclick="findData()">Find</button>
  <div id="root"></div>
  <script src="script.js"></script>
</body>
</html>
```

### ✅ What does this do?

* It's a simple webpage.
* Has:

  * An input box: `<input type="text" name="user" id="user">`
  * 3 buttons: Add, Show, Find
  * A div: `<div id="root"></div>` where you show the output.
* When buttons are clicked, it calls 3 JavaScript functions: `sendData()`, `getData()`, `findData()` (defined in `script.js`)

---

# 🔥 **Frontend: script.js**

This is where you handle button clicks & talk to the server.

---

### 1️⃣ `sendData()`  → triggered when you click `Add`

```javascript
function sendData() {
  let user = document.getElementById('user').value;
  let userdata = { user };

  fetch('http://localhost:3000/user', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(userdata)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    document.getElementById('root').innerHTML = `${data.message}`
  })
  .catch(err => { console.log(err); });
}
```

* ✅ Read text entered in input box
* ✅ Create object: `{user: 'the_username'}`
* ✅ Send it to your backend `POST /user` endpoint.
* ✅ When backend responds, show message inside `root` div.

---

### 2️⃣ `getData()` → triggered when you click `Show`

```javascript
function getData() {
  fetch('http://localhost:3000/show')
  .then(res => res.json())
  .then(data => {
    showUsers(data);
  })
}
```

* ✅ Call backend `GET /show`
* ✅ When data received, call `showUsers(data)` to display list.

---

### 3️⃣ `showUsers(data)` → helper function

```javascript
function showUsers(data) {
  let root = document.getElementById('root');
  root.innerHTML = "";
  data.forEach(item =>{
    let div = document.createElement('div');
    div.innerText= item.username;
    root.appendChild(div)
  })
}
```

* ✅ Take list of users, and show each username inside new div.

---

### 4️⃣ `findData()` → triggered when you click `Find`

```javascript
function findData() {
  let user = document.getElementById('user').value;
  let userdata = { user };

  fetch('http://localhost:3000/find', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(userdata)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    document.getElementById('root').innerHTML = `${data.message}`
  })
  .catch(err => { console.log(err); });
}
```

* ✅ Send `POST /find` with the username.
* ✅ Backend responds with either: Found or Not Found.
* ✅ Show the message.

---

# 🔥 **Backend: server.js**

This is your server which handles requests from frontend.

---

```javascript
const exp = require('express');
const bp = require('body-parser');
const DB = require('./modules/db.js')
const knex = require('knex');
```

✅ Import libraries:

* `express` → web server
* `body-parser` → parse incoming JSON data
* `db.js` → file where database functions live
* `knex` → query builder to talk to PostgreSQL

---

### ✅ Connect to your database:

```javascript
const db = knex({
  client:'pg',
  connection:{
    host: '127.0.0.1',
    port: '5555',
    user: 'postgres',
    password: '123456',
    database: 'users'
  }
})
```

* This connects Knex to your local Postgres server on port `5555`, database name: `users`.

---

### ✅ Setup express app

```javascript
const app = exp();

app.use(bp.urlencoded({extended:false}));
app.use(bp.json());
app.use('/',exp.static(__dirname+'/public'));
```

* Create app.
* Tell express to parse JSON data from requests.
* Serve static files (like index.html, script.js) from `public/` folder.

---

### ✅ Route: POST /user

```javascript
app.post('/user',(req,res)=>{
  console.log(req.body);
  DB.createUser(req.body)
  .then(data => { res.send({message:'OK'}) })
  .catch(err => { res.send({message:err.detail}) })
})
```

* When client calls `POST /user`:

  * Reads data from body.
  * Calls function `createUser()` from `db.js`
  * Sends back `{message:'OK'}` on success.

---

### ✅ Route: GET /show

```javascript
app.get('/show', (req,res)=>{
  db('users')
  .select('username')
  .then(data => {
    console.log(data);
    res.send(data)
  })
  .catch(err => {
    console.log(err);
    res.send({message:err.detail})
  })
})
```

* Reads all usernames from users table.
* Sends them back to client.

---

### ✅ Route: POST /find

```javascript
app.post('/find', (req,res)=>{
  console.log(req.body);
  const {user} = req.body;
  db('users')
  .select('id','username')
  .where({username:user})
  .then(data => {
    console.log(data);
    if(data.length>0){
      res.send({message:`Found=> ${data[0].username} id=> ${data[0].id}`})
    }
    else {
      res.send({message:'Not Found'})
    }
  })
  .catch(err => {
    console.log(err);
    res.send({message:err.detail})
  })
})
```

* Checks if username exists.
* If yes: return "Found" message.
* Else: return "Not Found".

---

### ✅ Start the server

```javascript
app.listen(3000)
```

* Start server on port 3000.

---

# 🔥 **Database: modules/db.js**

```javascript
const knex = require('knex');
const db = knex({
  client:'pg',
  connection:{
    host: '127.0.0.1',
    port: '5555',
    user: 'postgres',
    password: '123456',
    database: 'users'
  }
})
function createUser({user}){
  return db('users').insert(
    { username:user }
  ).returning('*')
}
module.exports = { createUser }
```

* A helper function to insert new user into database.
* Returns all columns after insert.

---

# 🔥 **package.json**

```json
{
  "name": "fsusers",
  "version": "1.0.0",
  "scripts": {
    "start": "nodemon server.js"
  },
  "dependencies": {
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "knex": "^0.21.18",
    "pg": "^8.5.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
}
```

* Project configuration.
* Lists dependencies (npm will install these packages).
* You run your app with:

```bash
npm start
```

* `nodemon` restarts your server automatically when you save changes.

---

# 🔥 🔥 🔥

# 🔄 **How everything works together**

```text
User (browser)
  |
  |---> index.html shows input + buttons
  |
  |---> User clicks "Add"
  |
  |---> script.js sends POST /user
  |
  |---> server.js handles POST /user
  |
  |---> db.js inserts data into PostgreSQL via knex
  |
  |---> PostgreSQL stores the username
  |
  |---> server.js sends response back
  |
  |---> script.js shows message to user
```

---

# 🧠 **Summary in baby simple words:**

* **Frontend**: sends requests.
* **Backend (server.js)**: receives request, talks to DB, returns result.
* **Database (PostgreSQL)**: stores actual data.
* **Knex**: library to write SQL queries in JavaScript.

