import { useState, useEffect } from "react";
import api from "../services/api";

interface Author {
  id: number;
  name: string;
  bio: string;
  birth: string;
}

interface AddAuthorFormProps {
  onAuthorAdded: () => void;
  author?: Author;
  mode?: "create" | "edit";
  onCancel?: () => void;
}

const AddAuthorForm = ({
  onAuthorAdded,
  author,
  mode = "create",
  onCancel,
}: AddAuthorFormProps) => {
  const [name, setName] = useState(author?.name || "");
  const [bio, setBio] = useState(author?.bio || "");
  const [birth, setBirth] = useState(author?.birth?.split("T")[0] || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (author) {
      setName(author.name);
      setBio(author.bio);
      setBirth(author.birth.split("T")[0]);
    }
  }, [author]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (mode === "edit" && author) {
        await api.put(`/authors/${author.id}`, {
          name,
          bio,
          birth,
        });
      } else {
        await api.post("/authors", {
          name,
          bio,
          birth,
        });
      }

      // Limpar formulário
      setName("");
      setBio("");
      setBirth("");

      // Atualizar lista de autores
      onAuthorAdded();
      if (mode === "edit" && onCancel) {
        onCancel();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao adicionar autor");
    }
  };

  return (
    <div className="review-form-container">
      <h2 className="review-form-title">
        {mode === "edit" ? "Editar Autor" : "Adicionar Novo Autor"}
      </h2>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="select-book"
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Biografia</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            className="textarea-comment"
          />
        </div>

        <div className="form-group">
          <label htmlFor="birth">Data de Nascimento</label>
          <input
            type="date"
            id="birth"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            required
            className="select-book"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="button-group">
          <button type="submit" className="submit-review">
            {mode === "edit" ? "Atualizar" : "Adicionar"} Autor
          </button>
          {mode === "edit" && (
            <button type="button" onClick={onCancel} className="cancel-button">
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddAuthorForm;
