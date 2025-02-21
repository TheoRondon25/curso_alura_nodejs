import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController {
    
    static async listarLivros (req, res) {
        try {
            const listaLivros = await livro.find({}); 
            res.status(200).json(listaLivros);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
    };

    static async listarLivroPorId (req, res) {
        try {
            const id = req.params.id;
            const listaEncontrado = await livro.findById(id); 
            res.status(200).json(listaEncontrado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do livro` });
        }
    };

    static async cadastrarLivro (req, res) {
        const novoLivro = req.body; 
        try {          
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }}; // ... -> spread Operator
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: "Criado com sucesso", livro: novoLivro });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` });
        }
    };

    static async atualizarLivro (req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body); 
            res.status(200).json({ message: "Livro atualizado" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na atualização` });
        }
    };

    static async excluirLivro (req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndRemove(id); 
            res.status(200).json({ message: "livro removido com sucesso" });
        } catch {
            res.status(500).json({ message: `${erro.message} - falha ao remover o livro` });
        }
    }

    static async listarLivrosPorEditora (req, res) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
        } catch {
            res.status(500).json({ message: `${erro.message} - falha na busca` });
        }
    }
};

export default LivroController;