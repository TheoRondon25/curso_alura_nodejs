import Livro from "../models/Livro.js";

class LivroController {
    
    static async listarLivros (req, res) {
        try {
            const listaLivros = await Livro.find({}); 
            res.status(200).json(listaLivros);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
    };

    static async listarLivroPorId (req, res) {
        try {
            const id = req.params.id;
            const listaEncontrado = await Livro.findById(id); 
            res.status(200).json(listaEncontrado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do livro` });
        }
    };

    static async cadastrarLivro (req, res) {
        try {
            const novoLivro = await Livro.create(req.body); // Create no mongoose
            res.status(201).json({ message: "Criado com sucesso", livro: novoLivro });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` });
        }
    };

    static async atualizarLivro (req, res) {
        try {
            const id = req.params.id;
            await Livro.findByIdAndUpdate(id, req.body); 
            res.status(200).json({ message: "Livro atualizado" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na atualização` });
        }
    };

    static async excluirLivro (req, res) {
        try {
            const id = req.params.id;
            await Livro.findByIdAndRemove(id); 
            res.status(200).json({ message: "livro removido com sucesso" });
        } catch {
            res.status(500).json({ message: `${erro.message} - falha ao remover o livro` });
        }
    }
};

export default LivroController;