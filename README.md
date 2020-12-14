# Sistema de Cadastro - PSEL2020

Case desenvolvido para o Processo Seletivo da empresa Mind Consulting. Foi-se proposto um sistema de cadastro desenvolvido em **ReactJS** e **NodeJS** utilizando o banco de dados **MongoDB**.

## Installation

Utilizado a versão 12.15 do node.js. Entre na pasta **_/server/_** e **_/client/_** e digite o comando a abaixo para instalar as dependências correspondentes tanto para o backend quanto para o frontend:

```node
npm install 
```
Lembre-se de ter instalado e configurado o banco de dados MongoDB, caso não tenha baixe-o aqui : [MongoDB](https://www.mongodb.com/try/download/community)

Dentro de **_/server/src/index.js_** configure a sua conexão com o banco de dados de acordo com sua configuração o servidor do MongoDB:

```node
mongoose.connect(
    'mongodb://localhost:27017/system-users', //altere estes dados para a conexão com o seu banco de dados MongoDB
    { 
        useNewUrlParser : true , 
        useUnifiedTopology: true 
    });

    mongoose.connection
        .once('open', () => console.log('Connected !!!'))
        .on('error', error => { console.log('Your ERROR', error)})
```

## Usage

Com o acesso das pastas **_/server/_** e **_/client/_** em dois terminais abertos, digite o seguinte comando em ambos terminais:

```node
npm start
```
Se der certo o servidor estará rodando na porta 2000 (localhost:2000) defina na aplicação backend, e irá apontar no terminal uma mensagem de sucesso com a conexão com o banco de dados.(Mensagem):

```bash
Servidor em execução no porta 2000
Connected !!!
```
E abaixo no caminho **_/server/src/index.js_** se encontra onde definir a porta do servidor:
```node
app.listen(2000, () => {
    console.log('Servidor em execução no porta 2000');
})
```

E a aplicação frontend (cliente) estará rodando na porta padrão 3000 (localhost:3000) e abrirá automaticamente no seu browser. 

## Contributing
Giovanni Dotta -  Para qualquer dúvida ou problema(**issues**) abra um tópico para resolvermos juntos !!!
