from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
import numpy as np
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_filename = 'student_risk_model.pkl'
with open(model_filename, 'rb') as file:
    model = pickle.load(file)

@app.get("/")
def home():
    return {"message": "Student Risk Predictor API is running!"}

@app.post("/predict")
def predict_risk(data: dict):
    try:
        input_data = pd.DataFrame([data])
        
        prediction = model.predict(input_data)
        probability = model.predict_proba(input_data)
        
        result = "High Risk" if prediction[0] == 1 else "Safe / Low Risk"
        confidence = float(np.max(probability) * 100)
        
        return {
            "prediction": result,
            "confidence": f"{confidence:.2f}%"
        }
    except Exception as e:
        return {"error": str(e)}