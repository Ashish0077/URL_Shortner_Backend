# URL_Shortner_Backend
<p>
    <img src="https://github.com/Ashish0077/URL_Shortner_Backend/blob/main/github_assets/banner.jpg">
</p>
It is URL Shortening service that will help you in shortening your url by which you can get a more precised version of your url at ease.

## 3RE Architecture: Router, RouteHandler, ResponseHandler, ErrorHandler
<p align="center">
    <img src="https://github.com/Ashish0077/URL_Shortner_Backend/blob/main/github_assets/3RE.png">
</p>

## How to build and run this project
* Clone this repository.
* Execute `npm install`
* Make sure MySQL is installed your system.
* Rename the following files:
  * keys/private.pem.example --> keys/private.pem
  * keys/public.pem.example --> keys/public.pem
  * .env.example --> .env
  * ormconfig.json.example --> ormconfig.json
* Provide ```username```, ```password``` and ```database``` info in **ormconfig.json** for typeorm to properly connect to the Database.
* Provide ```NODE_ENV```, ```PORT```, ```TOKEN_ISSUER``` , ```TOKEN_AUDIENCE``` in **.env** file
* Execute `npm start`
 ## Project Directory Structure
```
.
├── keys
│   ├── private.pem
│   └── public.pem
├── src
│   ├── auth
│   │   ├── authentication.ts
│   │   └── authUtils.ts
│   ├── controllers
│   │   └── v1
│   │       ├── access
│   │       │   ├── login.ts
│   │       │   ├── logout.ts
│   │       │   └── signUp.ts
│   │       ├── link
│   │       │   └── link.ts
│   │       └── user
│   │           └── user.ts
│   ├── core
│   │   ├── ApiError.ts
│   │   ├── ApiResponse.ts
│   │   └── JWT.ts
│   ├── database
│   │   ├── model
│   │   │   ├── BaseModel.ts
│   │   │   ├── Keystore.ts
│   │   │   ├── Link.ts
│   │   │   └── User.ts
│   │   ├── repository
│   │   │   ├── KeystoreRepo.ts
│   │   │   ├── LinkRepo.ts
│   │   │   └── UserRepo.ts
│   │   └── db.ts
│   ├── routes
│   │   └── v1
│   │       ├── access
│   │       │   ├── login.ts
│   │       │   ├── logout.ts
│   │       │   └── signUp.ts
│   │       ├── link
│   │       │   └── link.ts
│   │       ├── user
│   │       │   └── user.ts
│   │       └── routes.ts
│   ├── types
│   │   └── app-request.d.ts
│   ├── utils
│   │   └── asyncHandler.ts
│   ├── app.ts
│   ├── config.ts
│   └── server.ts
├── ormconfig.json
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```
## API Examples
* Signup
    ```
    POST /v1/signup/basic
    Host: localhost:3000
    Content-Type: application/json
    ```
    * Request Body
    ```json
    {
        "name" : "Test User",
        "email": "testuser@email.com",
        "password": "changeit",
    }
    ```
    * Response Body: 200
    ```json
    {
      "statusCode": "10000",
      "message": "Signup Successful",
      "data": {
        "user": {
          "name": "Test User",
          "email": "testuser@email.com",
          "uuid": "858b1d11-bd0f-465e-9b96-a9baf81560af",
          "createdAt": "2021-04-21T13:48:46.665Z",
          "updatedAt": "2021-04-21T13:48:46.665Z"
        },
        "tokens": {
          "accessToken": "some_token",
          "refreshToken": "some_token"
        }
      }
    }
    ```
    * Response Body: 400
    ```json
    {
      "statusCode": "10001",
      "message": "Bad Parameters"
    }
    ```
* Create Link
    * Method and Headers
    ```
    POST /v1/link/
    Host: localhost:3000
    Content-Type: application/json
    Authorization: Bearer <your_token_received_from_signup_or_login>
    ```
    * Response Body: 200
    ```json
    {
      "statusCode": "10000",
      "message": "success",
      "data": {
        "link": {
          "longUrl": "https://github.com/Ashish0077/URL_Shortner_Backend/tree/main/src",
          "shortUrl": "http://localhost:3000/bc839a",
          "uuid": "05527954-e203-4cde-97b0-063ace829882",
          "createdAt": "2021-04-21T15:10:14.187Z",
          "updatedAt": "2021-04-21T15:10:14.187Z",
          "clickCount": 4
        }
      }
    }
    ```

### Find this project useful ? :heart:
* Support it by clicking the :star: button on the upper right of this page. :v:
### License
```
MIT License

Copyright (c) 2021 Ashish Arora

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
