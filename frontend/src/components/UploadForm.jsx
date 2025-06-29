import { useState } from "react";
import axios from "axios";
import "../styles.css";
import { Link } from "react-router-dom";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/upload", formData);
      console.log("Response data:", response.data);
      setResult(response.data);
      setError(null);
      setSuccess(true);
    } catch (err) {
      if (err.response) {
        console.error("Response error:", err.response.data);
        setError(`Ошибка сервера: ${err.response.data.message || JSON.stringify(err.response.data)}`);
      } else if (err.request) {
        console.error("No response:", err.request);
        setError("Нет ответа от сервера");
      } else {
        console.error("Error:", err.message);
        setError("Ошибка загрузки файла");
      }
      setSuccess(false);
    }
  };

  return (
    <div className="page">
      

      <div className="container">
        <h2>Загрузите ваш проект помещения (XML)</h2>

        <input
          type="file"
          accept=".xml"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setResult(null);
            setError(null);
            setSuccess(false);
          }}
        />

        <button onClick={handleUpload}>Загрузить</button>

        {error && <p style={{ color: "red", marginTop: "16px" }}>{error}</p>}
        {success && <p style={{ color: "green", marginTop: "16px" }}>Файл успешно загружен</p>}

        {result && (
          <div className="result">
            <h3>Результаты расчета</h3>
            <p><strong>Название:</strong> {result.name}</p>
            <p><strong>Объем:</strong> {result.volume} м³</p>
            <p><strong>Целевое RT:</strong> {result.target_rt} с</p>
            <p><strong>Рассчитанное RT:</strong> {result.calculated_rt} с</p>
            <p><strong>Отклонение:</strong> {result.deviation} с</p>

            <h4>Покрытия:</h4>
            <ul>
              {result.surfaces.map((s, i) => (
                <li key={i}>
                  <strong>{s.name}</strong>: {s.material} ({s.area} м²)
                </li>
              ))}
            </ul>
          </div>
        )}

        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>

</div>
      </div>
    </div>
  );
}