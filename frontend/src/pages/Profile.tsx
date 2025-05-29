import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [cpf] = useState(user?.cpf || "");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [showCpf, setShowCpf] = useState(false);

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (!user) {
        setError("Usuário não autenticado.");
        return;
      }
      const payload: any = { name, email };
      if (password) payload.password = password;

      const response = await api.put(`/users/${user.id}`, payload);
      setUser({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        cpf: response.data.cpf,
        isAdmin: response.data.isAdmin,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          cpf: response.data.cpf,
          isAdmin: response.data.isAdmin,
        })
      );
      setName(response.data.name);
      setEmail(response.data.email);
      setSuccess("Perfil atualizado com sucesso!");
      setEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao atualizar perfil");
    }
  };

  return (
    <div className="content-container">
      <div className="content-box" style={{ maxWidth: 500, margin: "0 auto" }}>
        <h1 className="page-title">Meu Perfil</h1>
        {!editing ? (
          <div>
            <p><strong>Nome:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <strong>CPF:</strong>
              <span style={{ letterSpacing: 2 }}>
                {showCpf ? user?.cpf : user?.cpf?.replace(/.(?=.{3})/g, "*")}
              </span>
              <button
                type="button"
                onClick={() => setShowCpf((v) => !v)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#4caf50",
                  marginLeft: 4,
                  fontSize: 18,
                }}
                aria-label={showCpf ? "Ocultar CPF" : "Mostrar CPF"}
              >
                {showCpf ? <FaEyeSlash /> : <FaEye />}
              </button>
            </p>
            <button className="edit-button" onClick={() => setEditing(true)}>
              Editar Perfil
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="review-form">
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="select-book"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="select-book"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <input
                id="cpf"
                value={cpf}
                disabled
                className="select-book"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Nova Senha</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Deixe em branco para não alterar"
                className="select-book"
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <div className="button-group">
              <button type="submit" className="submit-review">Salvar</button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setEditing(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;