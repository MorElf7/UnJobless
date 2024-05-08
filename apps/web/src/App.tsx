import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./routes/Router";
import "./styles/globals.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> 
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;