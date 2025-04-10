import { Book } from "@/types/book";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface LivroCardProps {
  book: Book;
  onEdit?: (book: Book) => void;
  onDelete?: (id: string) => void;
}

const LivroCard = ({ book, onEdit, onDelete }: LivroCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = () => {
    navigate(`/books/${book.id}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(book);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(book.id);
  };

  return (
    <div className="book-card" onClick={handleClick}>
      <img
        src={
          book.coverImage
            ? `data:${book.coverImageType};base64,${book.coverImage}`
            : "/placeholder-book.jpg"
        }
        alt={book.title}
        className="book-image"
      />
      <div className="book-info">
        <h2 className="book-title">{book.title}</h2>
        <p className="book-author">{book.author.name}</p>
        {user?.isAdmin && (
          <div className="book-actions" onClick={(e) => e.stopPropagation()}>
            <button onClick={handleEditClick} className="edit-button">
              Editar
            </button>
            <button onClick={handleDeleteClick} className="delete-button">
              Excluir
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivroCard;
