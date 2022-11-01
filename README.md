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

Listagem de pessoas em nosso banco de dados dinamico.

### User id

```http
  GET /persons/:cpf
```

| Requisição | Tipo     | Descrição                                     |
| :--------- | :------- | :-------------------------------------------- |
| `cpf`      | `string` | encontra usuários com únicos pela chave `cpf` |

#### Returns

um único usuário.

### Create a user

```http
  POST /person
```

| Parâmetro     | Tipo     | Descrição                   |
| :------------ | :------- | :-------------------------- |
| `name`, `cpf` | `string` | Atribuindo valor ao usuário |

### Clean all users

```http
  DELETE /clean
```

#### Returns

deleta toda a lista de amigos e suas relações.

### Create a relations between users

```http
  POST /relationship
```

| Parâmetro      | Tipo     | Descrição                               |
| :------------- | :------- | :-------------------------------------- |
| `cpf1`, `cpf2` | `string` | Função precisa de dois parametros `cpf` |

#### Returns

Atribui relação entre usuários (Este valor já deve existir na lista de amigos).

#### Exemplo de entrada:

```http
  {cpf1: 11111111111, cpf2: 22222222222}
```

### Users recommendations

```http
  GET /recommendations/:cpf
```

| Requisição | Tipo     | Descrição                             |
| :--------- | :------- | :------------------------------------ |
| `cpf`      | `string` | Utiliza `cpf` para retornar o usuário |

#### Returns

Retorna um listagem de amigos relacionados e também cada amigo que seu amigo possui relação.

### Exemplo 1:

#### Entrada:

```http
curl -i -H 'Accept: application/json' http://localhost:3000/recommendations/11111111111
```

#### Saída:

```http
{
    "name": "João",
    "cpf": "22222222222",
    "relations": ["111111111111"]
},
{
    "name": "Rafael",
    "cpf": "33333333333",
    "relations": ["111111111111"]
}
```

### Exemplo 2:

#### Entrada:

```http
curl -i -H 'Accept: application/json' http://localhost:3000/recommendations/22222222222
```

#### Saída:

```http
{
    "name": "Pedro",
    "cpf": "11111111111",
    "relations": [ "22222222222","33333333333"]
}
```
