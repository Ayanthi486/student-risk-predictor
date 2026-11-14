import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    school: 0, sex: 0, age: 16, address: 1, famsize: 0,
    Pstatus: 1, Medu: 3, Fedu: 3, Mjob: 2, Fjob: 2,
    reason: 0, guardian: 1, traveltime: 1, studytime: 2,
    failures: 0, schoolsup: 0, famsup: 1, paid: 0,
    activities: 1, nursery: 1, higher: 1, internet: 1,
    romantic: 0, famrel: 4, freetime: 3, goout: 3,
    Dalc: 1, Walc: 1, health: 3, absences: 4,
    G1: 12, G2: 13
  });

  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Sending request to FastAPI Backend
      const response = await axios.post('http://127.0.0.1:8000/predict', formData);
      setPredictionResult(response.data);
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Cannot connect to backend server! Please check if the server is running.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial' }}>
      <h2>🎓 Student Performance & Risk Predictor</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px', background: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        
        <div>
          <label><strong>Study Time (1-4):</strong> </label><br/>
          <input type="number" name="studytime" value={formData.studytime} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
        </div>

        <div>
          <label><strong>Failures:</strong> </label><br/>
          <input type="number" name="failures" value={formData.failures} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
        </div>

        <div>
          <label><strong>Absences:</strong> </label><br/>
          <input type="number" name="absences" value={formData.absences} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
        </div>

        <div>
          <label><strong>G1 Marks:</strong> </label><br/>
          <input type="number" name="G1" value={formData.G1} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
        </div>

        <div>
          <label><strong>G2 Marks:</strong> </label><br/>
          <input type="number" name="G2" value={formData.G2} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
        </div>

        <button type="submit" style={{ padding: '12px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {loading ? "Predicting..." : "Predict Student Risk"}
        </button>
      </form>

      {/* Displaying prediction result */}
      {predictionResult && (
        <div style={{ marginTop: '20px', padding: '20px', background: predictionResult.prediction.includes("High") ? '#ffe6e6' : '#e6ffe6', borderRadius: '8px', border: '1px solid #ccc' }}>
          <h3>Prediction Result:</h3>
          <p><strong>Status:</strong> <span style={{ color: predictionResult.prediction.includes("High") ? 'red' : 'green', fontSize: '18px' }}>{predictionResult.prediction}</span></p>
          <p><strong>Confidence:</strong> {predictionResult.confidence}</p>
        </div>
      )}
    </div>
  );
}

export default App;