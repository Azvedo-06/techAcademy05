import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  // Função para validar o CPF
  const validateCpf = (cpf: string): boolean => {
    const cpfClean = cpf.replace(/\D/g, "");
    if (cpfClean.length !== 11 || /^(\d)\1{10}$/.test(cpfClean)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpfClean.charAt(i)) * (10 - i);
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpfClean.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpfClean.charAt(i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    return remainder === parseInt(cpfClean.charAt(10));
  };

  // Função para validar o e-mail
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Função para validar a senha
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validações
    if (!name.trim()) {
      setError("O nome é obrigatório.");
      return;
    }
    if (!validateEmail(email)) {
      setError("E-mail inválido.");
      return;
    }
    if (!validatePassword(password)) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (!validateCpf(cpf)) {
      setError("CPF inválido.");
      return;
    }

    try {
      await api.post("/users", {
        name,
        email,
        password,
        cpf: cpf.replace(/\D/g, ""),
      });
      setSuccess(
        "Cadastro realizado com sucesso! Redirecionando para login..."
      );
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: any) {
      console.error("Erro ao registrar usuário:", err.response?.data || err);
      setError(
        err.response?.data?.error ||
          "Erro ao registrar. Verifique os dados e tente novamente."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Crie sua conta</h1>
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
              required
            />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>
          <div>
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Digite seu CPF"
              required
            />
          </div>
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
          {success && (
            <p style={{ color: "green", fontSize: "14px" }}>{success}</p>
          )}
          <button type="submit">Registrar</button>
        </form>
        <p>
          Já tem uma conta? <Link to="/login">Faça login aqui</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
