import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import AddAuthorForm from "../components/AddAuthorForm";

interface Author {
  id: number;
  name: string;
  bio: string;
  birth: string;
}

const Authors: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const { user } = useAuth();

  const fetchAuthors = async () => {
    try {
      const { data } = await api.get("/authors");
      setAuthors(data);
    } catch (error: any) {
      console.error("Erro detalhado:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      setError(
        `Erro: ${
          error.response?.data?.message ||
          error.message ||
          "Não foi possível carregar os autores"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este autor?")) return;

    try {
      await api.delete(`/authors/${id}`);
      fetchAuthors();
    } catch (error) {
      console.error("Erro ao deletar autor:", error);
      setError("Erro ao deletar autor");
    }
  };

  const handleEdit = (author: Author) => {
    setEditingAuthor(author);
  };

  const handleCancelEdit = () => {
    setEditingAuthor(null);
  };

  if (loading) {
    return (
      <div className="content-container">
        <div className="content-box">
          <p className="text-center">Carregando autores...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-container">
        <div className="content-box">
          <h1 className="page-title">Erro</h1>
          <p className="text-center text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container">
      <div className="content-box">
        <h1 className="page-title">Autores</h1>

        {user?.isAdmin && !editingAuthor && (
          <AddAuthorForm onAuthorAdded={fetchAuthors} />
        )}

        {user?.isAdmin && editingAuthor && (
          <AddAuthorForm
            onAuthorAdded={fetchAuthors}
            author={editingAuthor}
            mode="edit"
            onCancel={handleCancelEdit}
          />
        )}

        <div className="grid-list">
          {authors.map((author) => (
            <div key={author.id} className="list-item">
              <h2 className="book-title">{author.name}</h2>
              <p className="text-gray-300">{author.bio}</p>
              <p className="text-gray-400 mt-2">
                Nascimento: {new Date(author.birth).toLocaleDateString()}
              </p>
              {user?.isAdmin && (
                <div className="book-actions">
                  <button
                    onClick={() => handleEdit(author)}
                    className="edit-button"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(author.id)}
                    className="delete-button"
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Authors;
