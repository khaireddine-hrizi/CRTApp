import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./AuthContext";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
