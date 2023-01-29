# Library Project

> Status: Finalizado

Se trata de uma aplicação com o objetivo de arquivar suas leituras e seu progresse nelas, ou seja, fazer a gestão do seu hábito de ler!

### Tecnologias utilizadas:

- Node.js/Express
- TypeScript
- Prisma
- Joi

### Documentação:

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

### Utilização do sistema:

1. Clonar projeto
2. Instalar dependências
3. Usar o npm start para iniciar o servidor
4. Consumir as API's pela plataforma da sua preferência
