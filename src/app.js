import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import Livro from "./models/Livro.js";

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
    console.error("erro de conexao", erro);
})

conexao.once("open", () => {
    console.log("Conexao com o banco feita com sucesso");
})

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.js");
});

app.get("/livros", async (req, res) => { // sempre que tiver um await, temos que ter um async
    const listaLivros = await Livro.find({}); // como nao passamos nenhuma especificacao no find, ele vai buscar tudo 
    res.status(200).json(listaLivros);
});

app.get("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id); // buscando o livro na base ao puxar essa fucao
    res.status(200).json(livros[index]); // retornando o livro encontrado no formato json
});

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).send("Livro cadastrado com sucesso");
});

app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros);
});

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1); 
    res.status(200).send("livro removido com sucesso");
});

export default app;