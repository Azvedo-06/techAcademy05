import { useState, useEffect } from "react";
import { Book } from "@/types/book";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import BookForm from "../components/AddBookForm";
import LivroCard from "../components/LivroCard";

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const { user } = useAuth();

  const fetchBooks = async () => {
    try {
      const { data } = await api.get("/books");
      console.log("Livros atualizados:", data);
      setBooks(data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      setError("Não foi possível carregar os livros.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookUpdated = async () => {
    try {
      const { data } = await api.get("/books");
      console.log("Livros atualizados após edição:", data);
      setBooks(data);
      setEditingBook(null); // Fecha o formulário de edição
    } catch (error) {
      console.error("Erro ao atualizar lista de livros:", error);
      setError("Erro ao atualizar lista de livros");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este livro?")) return;

    try {
      await api.delete(`/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Erro ao deletar livro:", error);
      setError("Erro ao deletar livro");
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="content-container">
      <div className="content-box">
        <h1 className="page-title">Livros Disponíveis</h1>

        {user?.isAdmin && !editingBook && <BookForm onBookAdded={fetchBooks} />}

        {user?.isAdmin && editingBook && (
          <BookForm
            onBookAdded={handleBookUpdated}
            book={editingBook}
            mode="edit"
            onCancel={handleCancelEdit}
          />
        )}

        <div className="books-grid">
          {books.map((book) => (
            <LivroCard
              key={book.id}
              book={book}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
