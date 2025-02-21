import { autor } from "../models/Autor.js";

class AutorController {
    
    static async listarAutores (req, res) {
        try {
            const listaAutores = await autor.find({}); 
            res.status(200).json(listaAutores);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
    };

    static async listarAutorPorId (req, res) {
        try {
            const id = req.params.id;
            const listaEncontrado = await autor.findById(id); 
            res.status(200).json(listaEncontrado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do autor` });
        }
    };

    static async cadastrarAutor (req, res) {
        try {
            const novoAutor = await autor.create(req.body); // Create no mongoose
            res.status(201).json({ message: "Criado com sucesso", autor: novoAutor });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar autor` });
        }
    };

    static async atualizarAutor (req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body); 
            res.status(200).json({ message: "Autor atualizado" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na atualização` });
        }
    };

    static async excluirAutor (req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndRemove(id); 
            res.status(200).json({ message: "autor removido com sucesso" });
        } catch {
            res.status(500).json({ message: `${erro.message} - falha ao remover o autor` });
        }
    }
};

export default AutorController;