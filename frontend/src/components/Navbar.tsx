import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditProfile = () => {
    setShowMenu(false);
    navigate("/profile");
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
          <div style={{ position: "relative" }} ref={menuRef}>
            <FaUserCircle
              size={28}
              style={{ cursor: "pointer" }}
              onClick={() => setShowMenu((v) => !v)}
            />
            {showMenu && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "120%",
                  background: "#222",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  zIndex: 10,
                  minWidth: 140,
                }}
              >
                <button
                  style={{
                    width: "100%",
                    padding: "0.5rem 1rem",
                    background: "none",
                    border: "none",
                    color: "#fff",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                  onClick={handleEditProfile}
                >
                  Editar Perfil
                </button>
                <button
                  style={{
                    width: "100%",
                    padding: "0.5rem 1rem",
                    background: "none",
                    border: "none",
                    color: "#fff",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                  onClick={handleLogout}
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
