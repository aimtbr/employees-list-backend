# employees-list-backend
**Backend of the "employees-list" project**  

**[Go to frontend](https://github.com/aimtbr/employees-list-frontend)**

## How to run
### Shortcut
`git clone https://github.com/aimtbr/employees-list-backend.git && cd employees-list-backend && npm i`
### Steps
1. `git clone https://github.com/aimtbr/employees-list-backend.git`
1. `cd employees-list-backend`
1. `npm i`
1. Create the 'config/default.json' file based on 'config/default.example.json' with the data you need
1. `npm run dev`


## Routes
* /users
  * POST /users/auth – authorizes a user by login and password if matches
    * **body** – the encrypted using AES algorithm JSON object with 'login' and 'password' fields
    * **returns** within a cookie the encrypted using AES algorithm user token
  * POST /users/signup
  * POST /users/logout
* /api
  * GET /api/employees
  * POST /api/employee
  * PATCH /api/employee/:id
  * DELETE /api/employee/:id
