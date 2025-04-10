import { useEffect, useState } from "react";
import { Review } from "@/types/review";
import { Book } from "@/types/book";
import api from "../services/api";
import CreateReview from "../components/CreateReview";

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      const { data } = await api.get("/reviews");
      setReviews(data);
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
      setError("Erro ao carregar avaliações");
    }
  };

  const fetchBooks = async () => {
    try {
      const { data } = await api.get("/books");
      setBooks(data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      setError("Erro ao carregar livros");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="content-container">
        <div className="content-box">
          <p className="loading">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-container">
        <div className="content-box">
          <p className="error">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container">
      <div className="content-box">
        <h1 className="page-title">Avaliações de Livros</h1>

        {/* Formulário de criação de review */}
        <CreateReview books={books} onReviewCreated={fetchReviews} />

        {/* Lista de reviews */}
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div>
                  <h2 className="book-title">
                    {books.find((b) => b.id === review.bookId)?.title}
                  </h2>
                  <p className="review-author">
                    Avaliado por: {review.user.name}
                  </p>
                </div>
                <span className="review-rating">{review.rating}/5 ★</span>
              </div>
              {review.comment && (
                <p className="review-comment">{review.comment}</p>
              )}
              <p className="review-date">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
