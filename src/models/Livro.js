import mongoose from "mongoose";

const LivroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: true },
    editora: { type: String },
    paginas: { type: Number},
    preco: { type: Number}
}, { versionKey: false });

const Livro = mongoose.model("Livros", LivroSchema);

export default Livro;