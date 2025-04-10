import { useState, useEffect } from "react";
import api from "../services/api";
import { Book } from "@/types/book";

interface BookFormProps {
  onBookAdded: () => void;
  book?: Book;
  mode?: "create" | "edit";
  onCancel?: () => void;
}

const BookForm = ({
  onBookAdded,
  book,
  mode = "create",
  onCancel,
}: BookFormProps) => {
  const [title, setTitle] = useState(book?.title || "");
  const [description, setDescription] = useState(book?.description || "");
  const [publicationDate, setPublicationDate] = useState(
    book?.publicationDate || ""
  );
  const [authorId, setAuthorId] = useState(book?.author.id || "");
  const [categoryId, setCategoryId] = useState(book?.category.id || "");
  const [authors, setAuthors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [bookPdf, setBookPdf] = useState<File | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [authorsRes, categoriesRes] = await Promise.all([
        api.get("/authors"),
        api.get("/categorys"),
      ]);
      setAuthors(authorsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setError("Erro ao carregar autores e categorias");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBookPdf(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("publication_date", publicationDate);
      formData.append("authorId", authorId);
      formData.append("categoryId", categoryId);

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      if (bookPdf) {
        formData.append("bookPdf", bookPdf);
      }

      if (mode === "edit" && book) {
        await api.put(`/books/${book.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await api.post("/books", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      resetForm();
      onBookAdded();
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          `Erro ao ${mode === "edit" ? "atualizar" : "adicionar"} livro`
      );
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPublicationDate("");
    setAuthorId("");
    setCategoryId("");
    setCoverImage(null);
    setBookPdf(null);
  };

  return (
    <div className="review-form-container">
      <h2 className="review-form-title">
        {mode === "edit" ? "Editar Livro" : "Adicionar Novo Livro"}
      </h2>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="select-book"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="textarea-comment"
          />
        </div>

        <div className="form-group">
          <label htmlFor="publicationDate">Data de Publicação</label>
          <input
            type="date"
            id="publicationDate"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            required
            className="select-book"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Autor</label>
          <select
            id="author"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            required
            className="select-book"
          >
            <option value="">Selecione um autor</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="select-book"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="coverImage">Capa do Livro</label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={handleImageChange}
            className="select-book"
          />
        </div>

        <div className="form-group">
          <label htmlFor="bookPdf">PDF do Livro</label>
          <input
            type="file"
            id="bookPdf"
            accept="application/pdf"
            onChange={handlePdfChange}
            className="select-book"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="button-group">
          <button type="submit" className="submit-review">
            {mode === "edit" ? "Atualizar" : "Adicionar"} Livro
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

export default BookForm;
