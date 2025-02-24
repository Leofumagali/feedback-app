import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="flex-grow-1 flex">
        <Content />
      </div>
      <Footer />
    </div>
  );
};

export default App;