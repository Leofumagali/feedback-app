import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import './styles/global.css';

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#f0f0f0' }}>
          <Header />
          <main className="d-flex flex-grow-1 container py-4">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
};