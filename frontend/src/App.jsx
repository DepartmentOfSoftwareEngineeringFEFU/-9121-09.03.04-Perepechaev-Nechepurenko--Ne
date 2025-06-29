import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadForm from "./pages/UploadForm";
import AbsorptionPage from "./pages/AbsorptionPage"; // Импортируем обновленный компонент AbsorptionPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadForm />} /> {/* <-- Вот этот маршрут отвечает за главную страницу */}
        <Route path="/справочник" element={<AbsorptionPage />} />
      </Routes>
    </Router>
  );
}

export default App; 