# nodetest

Challenge tasks: https://github.com/paulodamian/nodetest2/blob/master/dare-assessment-nodejs.txt

## How to run the project

Just clone the repository install its dependencies and run the startup script.

Install Dependencies
```
npm install
```

Run the dev server
```
npm run dev
```
The server will be running on http://localhost:8000/

Run the tests
```
npm run test
```

Every request needs to send an **Authorization** header with the value **Bearer {AccessToken}** for access control purposes.
How to obtain an **AccessToken**:
```
POST http://localhost:8000/oauth/token
headers {
    Content-Type: application/x-www-form-urlencoded
    Authorization: Basic YXBwbGljYXRpb246c2VjcmV0
}
postParams {
    grant_type: password
    username: Merrill
    password: merrillblankenship@quotezart.com
}

Where you could get the users from http://www.mocky.io/v2/5808862710000087232b75ac using the email as the password
```

Endpoints: (remember that you need the **Authorization header**)
* /users (full list of users)
* /users?filters (filtered list of users by any field. i.e:/users?role=admin)
* /users/:id (single user by userId)
* /policies (full list of policies)
* /policies?filters (filtered list of policies by any field. i.e:/policies?clientId=e8fd159b-57c4-4d36-9bd7-a59ca13057bb)

Requested functionaliti to endpoints:
- Get user data filtered by user id -> /users/:id - i.e: /users/e8fd159b-57c4-4d36-9bd7-a59ca13057bb
- Get user data filtered by user name -> /users?name=userName - i.e: /users?name=britney
- Get the list of policies linked to a user id -> /policies?clientId=userId - i.e: /policies?clientId=e8fd159b-57c4-4d36-9bd7-a59ca13057bb

Final Notes:
I have implemented the Authentication and authorization part of the assesment using the library oauth2-server (https://github.com/oauthjs/node-oauth2-server), wich has come into active development and maintence a few days ago, because I found it simple enougth to implemented in this case. There are many other libraries that could be used that use this same model or a jwt implementation.