## REST API friend recommender

This is a REST API that provides data on relationships between people.

The entire application is contained in the `./src/server.js` file.

`npm run start` a minimal Rack configuration for the api.

tests should be run through the following port `http:/localhost/:3000/`.

we recommend using `Postman` to make REST API queries

### Start a node server

```http
  npm run start
```

### All users

```http
  GET /persons
```

#### Returns

List of people in our dynamic database.

### Userid

```http
  GET /persons/:cpf
```

| Requisition | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `cpf`       | `string` | finds unique users by `cpf` key |

#### Returns

a single user.

### Create a user

```http
  POST /person
```

| Parameter     | Type     | Description                 |
| :------------ | :------- | :-------------------------- |
| `name`, `cpf` | `string` | Assigning Value to the User |

### Clean all users

```http
  DELETE /clean
```

#### Returns

deletes the entire list of friends and their relationships.

### Create a relations between users

```http
  POST /relationship
```

| Parameter      | Type     | Description                         |
| :------------- | :------- | :---------------------------------- |
| `cpf1`, `cpf2` | `string` | Function needs two parameters `cpf` |

#### Returns

Assigns relationship between users (This value must already exist in the friends list).

#### Example input:

```http
  {cpf1: 11111111111, cpf2: 22222222222}
```

### Users recommendations

```http
  GET /recommendations/:cpf
```

| Requisition | Type     | Description                  |
| :---------- | :------- | :--------------------------- |
| `cpf`       | `string` | Use `cpf` to return the user |

#### Returns

Returns a list of related friends and also each friend that your friend is related to.

### Example 1:

#### Prohibited:

```http
curl -i -H 'Accept: application/json' http://localhost:3000/recommendations/11111111111
```

#### Exit:

```http
{
    "name": "John",
    "cpf": "22222222222",
    "relations": ["111111111111"]
},
{
    "name": "Raphael",
    "cpf": "33333333333",
    "relations": ["111111111111"]
}
```

### Example 2:

#### Prohibited:

```http
curl -i -H 'Accept: application/json' http://localhost:3000/recommendations/22222222222
```

#### Exit:

```http
{
    "name": "Peter",
    "cpf": "11111111111",
    "relations": [ "22222222222","33333333333"]
}
```

