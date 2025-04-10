import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ error: "Token mal formatado" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "Token mal formatado" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "segredo_bem_secreto"
    ) as DecodedToken;

    req.userId = decoded.user.id.toString();
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

export default authMiddleware;
