import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Reviews from "./pages/Reviews";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/Navbar";
import Categories from "./pages/Categories";
import Authors from "./pages/Authors";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";

const AppContent = () => {
  const location = useLocation();
  const { authenticated } = useAuth();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  // Não mostrar o Navbar em páginas de autenticação
  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }

  return (
    <>
      {authenticated && <NavBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Books />} />
          <Route path="/home" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
