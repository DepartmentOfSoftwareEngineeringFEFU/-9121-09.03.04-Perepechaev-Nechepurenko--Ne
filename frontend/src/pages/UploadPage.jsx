import UploadForm from "../components/UploadForm";
import { Link } from "react-router-dom";

export default function UploadPage() {
  return (
    <div className="page">
      <h1 className="title">Загрузка проекта помещения</h1>
      <UploadForm />
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Link to="/">← Вернуться на главную</Link>
      </div>
    </div>
  );
}