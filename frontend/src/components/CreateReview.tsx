import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { Book } from "@/types/book";

interface CreateReviewProps {
  books: Book[];
  onReviewCreated: () => void;
}

const CreateReview = ({ books, onReviewCreated }: CreateReviewProps) => {
  const { user } = useAuth();
  const [selectedBook, setSelectedBook] = useState("");
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/reviews", {
        BookId: selectedBook,
        rating: parseInt(rating),
        comment: comment,
        userId: user?.id,
      });

      // Limpar formulário
      setSelectedBook("");
      setRating("5");
      setComment("");

      // Atualizar lista de reviews
      onReviewCreated();
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao criar avaliação");
    }
  };

  return (
    <div className="review-form-container">
      <h2 className="review-form-title">Avaliar um Livro</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="book">Livro</label>
          <select
            id="book"
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            required
            className="select-book"
          >
            <option value="">Selecione um livro</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="rating">Nota</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            className="select-rating"
          >
            <option value="5">5 - Excelente</option>
            <option value="4">4 - Muito Bom</option>
            <option value="3">3 - Bom</option>
            <option value="2">2 - Regular</option>
            <option value="1">1 - Ruim</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="comment">Comentário (opcional)</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="textarea-comment"
            rows={4}
            placeholder="Escreva seu comentário aqui..."
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-review">
          Enviar Avaliação
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
