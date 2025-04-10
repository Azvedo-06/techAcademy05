import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          NexoLivro
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/reviews" className="nav-link">
            Reviews
          </Link>
          <Link to="/authors" className="nav-link">
            Autores
          </Link>
          <Link to="/categories" className="nav-link">
            Categorias
          </Link>
        </div>

        <div className="user-menu">
          <span className="user-name">Olá, {user?.name}</span>
          <button onClick={handleLogout} className="btn btn-logout">
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
