import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Book } from "@/types/book";
import api from "../services/api";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
};

const BookDetails = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await api.get(`/books/${id}`);
        setBook(data);
      } catch (error) {
        console.error("Erro ao carregar livro:", error);
        setError("Não foi possível carregar os detalhes do livro");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="content-container">
        <div className="content-box">
          <p className="loading">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="content-container">
        <div className="content-box">
          <p className="error">{error || "Livro não encontrado"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container">
      <div className="content-box">
        <div className="book-details">
          <div className="book-details-header">
            <img
              src={
                book.coverImage
                  ? `data:${book.coverImageType};base64,${book.coverImage}`
                  : "/placeholder-book.jpg"
              }
              alt={book.title}
              className="book-cover"
            />
            <div className="book-info-main">
              <h1>{book.title}</h1>
              <p className="book-author">
                por {book.author?.name || "Autor desconhecido"}
              </p>
              <p className="book-category">
                Categoria: {book.category?.name || "Não categorizado"}
              </p>
              <p className="book-date">
                Publicado em: {formatDate(book.publication_date)}
              </p>
            </div>
          </div>
          <div className="book-description">
            <h2>Descrição</h2>
            <p>{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
