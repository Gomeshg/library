# Library Project

> Status: Finalizado

Se trata de uma aplicação com o objetivo de arquivar suas leituras e seu progresse nelas, ou seja, fazer a gestão do seu hábito de ler!

<hr></hr>

### Tecnologias utilizadas:

- Node.js/Express
- TypeScript
- Prisma
- Joi

### Documentação:

<hr></hr>

#### POST: /sign-up

Body: {
email: "emailexemplo@gmail.com",
password: "senhamuitoforte"
}

> É preciso utilizar um email válido e uma senha com no mínimo 6 caracteres

#### POST: /sign-in

Body: {
email: "emailexemplo@gmail.com",
password: "senhamuitoforte"
}

retorno: {
token: "c03ba670-205c-40b6-8da9-e00ea03b6a66",
feedback: "Successful login!"
}

> Utilize o token para acessas as rotas privadas de book

<hr></hr>
#### POST: /book

Body: {
name: "Nome do Livro",
gender: "Gênero do livro",
image: "url da imagem",
author: "Autor do livro",
pages: 300,
pagesRead: 0,
summary: "Descrição ou resumo do livro"
}

> Apenas as propriedades name e gender são obrigatórias inicialmente.

#### GET: /book/:id

retorno: {
name: "Nome do Livro",
gender: "Gênero do livro",
image: "url da imagem",
author: "Autor do livro",
pages: 300,
pagesRead: 0,
status: "NotStarted"
summary: "Descrição ou resumo do livro"
progress: "0%"
}

> A propriedade progress retorna a seu progresso na leitura do livro, usando como base as propriedades pages e pagesRead
> A propriedade status pode ter seu valor setado inicialmente, caso não seja, por default seu valor é "NotStarted". As possibilidades são: "NotStarted", "InProgress" e "Done"

#### GET: /book/all

retorno: [
{
name: "Nome do Livro",
gender: "Gênero do livro",
image: "url da imagem",
author: "Autor do livro",
pages: 300,
pagesRead: 0,
status: "NotStarted"
summary: "Descrição ou resumo do livro"
progress: "0%"
}
]

> O retono é um array de books, contendo todos os livros arquivados. Como no exemplo só inserimos um, retornará um array com um elemento.

#### GET: /book/done

retorno: {
booksDone: 0
}

> Essa rota retorna a quantidade livros finalizados

#### UPDATE: /book/:id

body: {
pagesRead: 50,
status: "InProgress"
}

> É preciso passar o id correto do book, se estiver correto, atualizará todas as propriedades inseridas.

#### DELETE: /book/:id

> Passando o id corrretamente, o book selecionado será deletado.

<hr></hr>

### Utilização do sistema:

1. Clonar projeto
2. Instalar dependências
3. Usar o script 'npm run prisma:seed' para preencher o banco de dados \*
4. Usar o npm start para iniciar o servidor
5. logar na aplicação com o usuário fornecido
6. Consumir as API's pela plataforma da sua preferência

\* Ao usar o 'npm run prisma:seed', este usuário será criado:

{
email: "teste@gmail.com",
password: "123456"
}
