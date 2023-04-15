import React from "react";
import { Navigate } from "react-router";
import { TOKEN } from "./constants/dbConstants";

function Protected({ children }) {
    if (!localStorage.getItem(TOKEN)) return <Navigate to="/login" />
    return children;
}

export default Protected;
