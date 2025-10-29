# Users API Spec

## Registrasi User API

Endpoint : POST /api/users/registration

Request Body :

```json
{
    "email" : "example@gmail.com",
    "password" : "123456",
    "username" : "Mr.Dahlan"
}
```
Request Body Success :
```json
{
    "message" : "Users Registration Successfuly",
    "data" : {
        "email" : "example@gmail.com",
        "username" : "Mr.Dahlan"
    }
}
```
Request Body Failed :
```json
{
    "errors" : "Username Already Registered"
}
```

## Login User API

Endpoint POST /api/users/login

Request Body :
```json
{
    "email" : "example@gmail.com",
    "password" : "123456"
}
```

Request Body Success :
```json
{
    "message" : "Login Successfuly",
    "data" : {
        "email" : "example@gmail.com",
        "username" : "Mr.Dahlan"
    }
}
```

Request Body Failed :
```json
{
    "errors" : "wrong password!!!"
}
```
## Update User API

Endpoint PATCH /api/users/current

Request Body :
```json
{
    "password" : "654321",
    "username" : "Hamim Ganteng"
}
```

Request Body Success :
```json
{
    "message" : "Users Update Akun Successfuly",
    "data" : {
        "email" : "example@gmail.com",
        "username" : "Hamim Ganteng"
    }
}
```
Request Body Failed:
```json
{
    "errors" : "Uneuthorized"
}
```

## Get User API

Endpoint GET /api/users/current

Request Body Success :
```json
{
    "data" : {
        "email" : "example@gmail.com",
        "username" : "Hamim Gnteng"
    }
}
```
Request Body Failed :
```json
{
    "errors" : "users not found"
}
```
## Logout User API
Endpoint DELETE /api/users/logout

Request Body Success :
```json 
{
    "data" : "User delete successfuly"
}
```

Request Body Failed :
```json
{
    "errors" : "Unautorized"
}
```