# Desafio desenvolvedor back-end para [Precato](https://github.com/precato/desafio-dev-back-end)
## Instruções para rodar o projeto:
### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Yarn](https://yarnpkg.com/) e [Docker](https://www.docker.com/). 

### Comandos:



```bash
# Clone este repositório

$ git clone https://github.com/LeoMoreiraS/precato.git

# Entre na pasta api

$ cd api

# criar e configurar arquivo .env na pasta api de acordo com .env.example (caso mudar o valor da variável PORT mudar também nos arquivos do docker)

$ cp .env.example .env

# baixe as dependências da api

$ yarn

# Inicie a api e o banco de dados

$ docker-compose up -d

# Rode as migrations:

$ yarn typeorm migration:run
```

Após isso a documentação estará acessível no url "localhost:3030/api-docs" por default.

E você também pode testar as rotas utilizando o arquivo do insomnia presente na pasta principal.

## Ferramentas e Tecnologias utilizadas:


[Typescript](https://www.typescriptlang.org/)

[Node.js](https://nodejs.org/en/)

[Express](expressjs.com)
### Banco de dados :

[Typeorm](https://typeorm.io/#/)

[Postgres](https://www.postgresql.org/)

[Docker](https://www.docker.com/)
### Testes :

[Jest](https://jestjs.io/pt-BR/)

### Docs :

[Swagger](https://swagger.io/)

### Formatação e padronização:

[Eslint](https://eslint.org/)

[Commit-linter](https://github.com/legend80s/commit-msg-linter)

## Regras de negócio

- [x] Uma solicitação só pode ser feita se o cadastro do credor a receber o pagamento estiver aprovado.

- [x] Uma solicitação de pagamento deve sempre haver um ente devedor.

- [x] Em uma solicitação de pagamento, o valor inicial e final devem ser sempre maiores do que 0.

- [x] Em uma solicitação de pagamento, o valor final deve ser sempre menor que o valor inicial.

- [x] Solicitações de pagamentos para um mesmo credor deve ocorrer apenas se o identificador de remessa for diferente das solicitações já existentes.

- [x] Se uma solicitação for identificada como inválida, o motivo que a definiu como inválida deve ser armazenado.

