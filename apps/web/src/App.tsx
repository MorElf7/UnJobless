import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import "./styles/globals.css";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
