import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Book } from "@/types/book";
import api from "../services/api";

const BookDetails = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { id } = useParams();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await api.get(`/books/${id}`);
        setBook(data);

        if (data.bookPdf) {
          const pdfDataUrl = `data:application/pdf;base64,${data.bookPdf}`;
          setPdfUrl(pdfDataUrl);
        }
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
              <h1 className="page-title">{book.title}</h1>
              <p className="book-author">por {book.author.name}</p>
              <p className="book-category">Categoria: {book.category.name}</p>
              <p className="book-date">
                Publicado em:{" "}
                {new Date(book.publicationDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="book-description">
            <h2>Descrição</h2>
            <p>{book.description}</p>
          </div>

          {pdfUrl && (
            <div className="pdf-viewer-container">
              <h2>Ler Livro</h2>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <div style={{ height: "750px" }}>
                  <Viewer
                    fileUrl={pdfUrl}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </div>
              </Worker>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
