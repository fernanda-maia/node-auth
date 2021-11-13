# Sistema de Cadastro de Usuário NodeJS


&nbsp;
## Tecnologias

* [Docker](https://docs.docker.com/)
* [PostgreSQL](https://www.postgresql.org/docs/)
* [Node.js](https://nodejs.org/en/docs/)
* [JWT](https://jwt.io/)


&nbsp;
## Como rodar o projeto

1. Alterne para a pasta *docker*
```shell script
cd src/database/docker
```
2. Inicie o container PostgreSQL
```shell script
docker-compose up -d
```
3. Um exemplo de código SQL inicial é fornecido na pasta *sql* no arquivo *init.sql*

4. Na pasta principal do projeto, inicie a aplicação no modo desenvolvedor:
```shell script
npm run dev
```


&nbsp;
## Model

&nbsp;
## POST Token Request Example
<details>
  <summary>HEADERS</summary>
  
  * Authorization: Basic << Base64 encoded username and password >>

</details>


&nbsp;
## POST Token Response Example
```json
{
    "token": "JWT Token"
}
```


&nbsp;
## POST User Request Example 
<details>
  <summary>HEADERS</summary>
  
  * Authorization: Bearer << JWT ACCESS TOKEN >>

</details>


```json
{
    "username": "user",
    "password": "password",
    "email": "user@email.com"
}
```

&nbsp;
### GET Users Request Example 
<details>
  <summary>HEADERS</summary>
  
  * Authorization: Bearer << JWT ACCESS TOKEN >>

</details>


```json
[
    {
        "uuid": "8ca7307c-d7d9-4465-8e1f-e7ea496212b4",
        "email": "admin@admin.com",
        "username": "admin"
    },
    {
        "uuid": "9622b5b9-bd30-4b4b-91cf-ebea5d1265bc",
        "email": "nanda@email.com",
        "username": "nanda"
    }
]
```


&nbsp;
## Tipos de dados User Entity Model
* uuid: String
* email: String
* username: String
* password: String


&nbsp;
## Endpoints
Método | Rota | Status 
-------|------ | ------- 
GET | /users | 200, 401, 403 
GET | /users/{uuid} | 200, 400
PUT | /users/{uuid} | 204, 400, 401, 403
DELETE | /users/{uuid} | 204, 400, 401, 403
POST | /users | 201, 400, 401, 403
POST | /token | 200, 403
POST | /token/validate | 200, 401, 403


&nbsp;
## Status code

Status | Descrição
-------|------ 
200 | Requisição aceita
201 | Recurso criado
204 | Sem conteúdo
400 | Dados inválidos ou incorretos
401 | Token inválido
403 | Ausência de informação