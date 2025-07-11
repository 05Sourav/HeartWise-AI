# 🫀 HeartWise AI — Heart Disease Risk Predictor

HeartWise AI is a full-stack machine learning web application that predicts the risk of heart disease based on user-provided health data. It utilizes the **UCI Cleveland Heart Disease dataset** to train an ML model, which is served via a **Flask API** and consumed by a modern **Next.js frontend**.

<div align="center">
  <img src="https://img.shields.io/badge/MachineLearning-Scikit--learn-blue" />
  <img src="https://img.shields.io/badge/Backend-Flask-red" />
  <img src="https://img.shields.io/badge/Frontend-Next.js-black" />
  <img src="https://img.shields.io/badge/Status-Active-brightgreen" />
</div>

---

## 🧠 Features

- 🔍 Predicts heart disease risk using trained ML model
- 📊 Returns both classification (Yes/No) and probability
- ⚡ Fast and modern UI built with Next.js
- 🌐 API built using Flask (Python)
- 🛠 Anonymous usage — no login or data storage

---


## 🧱 Tech Stack

| Layer      | Technology             |
|------------|------------------------|
| Frontend   | Next.js (React)        |
| Backend    | Flask (Python)         |
| ML Model   | Scikit-learn (Auto-selects: RandomForest, LogisticRegression, or SVM) |
| Deployment | Vercel / Render        |
| Dataset    | UCI Cleveland Heart Disease Dataset |


---

## 📂 Project Structure

HeartWiseAI/
├── heart-disease-predictor/ # Frontend (Next.js App Router)
│ ├── app/ # App directory with routing
│ │ ├── form/ # Form input page
│ │ ├── result/ # Results page
│ │ ├── about/ # About page
│ │ ├── layout.tsx # Root layout
│ │ └── page.tsx # Home page
│ ├── public/ # Static assets
│ ├── styles/ # Global + module CSS
│ ├── utils/
│ │ └── api.ts # API call utility
│ ├── globals.css
│ └── favicon.ico
├── health_api/ # Backend (Flask + ML model)
│ ├── app.py # Flask app
│ ├── retrain_model.py # Training script
│ ├── model.pkl # Trained model
│ ├── scaler.pkl # Scaler object
│ └── requirements.txt
└── .gitignore

## 🚀 Getting Started

### 🔧 Backend (Flask API)

1. Navigate to the backend folder:
   ```bash
   cd health_api
   pip install -r requirements.txt
python retrain_model.py
python app.py

### 🖥️ Frontend (Next.js App)

    cd heart-disease-predictor
    npm install
    npm run dev
    
## 👨‍💻 Author

**Sourav Singh**  
Passionate about AI and full-stack development  
[GitHub](https://github.com/05Sourav) | [LinkedIn](https://www.linkedin.com/in/souravsingh05/)
