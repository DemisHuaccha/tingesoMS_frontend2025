
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./services/keycloak";

// 1. Definimos las opciones de inicialización
const keycloakInitOptions = {
  onLoad: 'login-required',
  checkLoginIframe: false, // <--- ESTO detiene el refresco de cada 5 segundos
  pkceMethod: 'S256'       // Recomendado para mayor seguridad en apps modernas
};

createRoot(document.getElementById("root")).render(
  // 2. Pasamos las opciones al Provider mediante la prop 'initOptions'
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={keycloakInitOptions}
  >
    <App />
  </ReactKeycloakProvider>
);