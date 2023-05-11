import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";

type Props = {
  children: JSX.Element;
};

export const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  var jwt_token = token === null ? "token" : token;
  const { decodedToken, isExpired } = useJwt(jwt_token);

  if (isExpired) {
    navigate("/login");
  }

  return children;
};
