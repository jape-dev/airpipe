import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";

const SECRET_KEY =
  "be5f1733cab0f10fe2b6ad7484cc00f3da94ea1272d3ef83f045f62a41aecf39";

type Props = {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
};

export const ProtectedRoute = ({ children }: Props) => {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate("/login");
      return;
    } else {
      try {
        jwt.verify(token, SECRET_KEY);
        setIsTokenValid(true);
      } catch (error) {
        setIsTokenValid(false);
        navigate("/login");
      }
    }
  }, []);

  return isTokenValid ? <h1>Welcome to the protected route</h1> : null;
};
