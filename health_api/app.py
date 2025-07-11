from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pickle
import sys

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all domains (for development)

# Load model and scaler with error handling
def load_model_safe():
    try:
        model = joblib.load("health_risk_model.pkl")
        scaler = joblib.load("scaler.pkl")
        print("✅ Models loaded successfully with joblib")
        return model, scaler
    except Exception as e:
        print(f"❌ Joblib load failed: {e}")
        try:
            with open("health_risk_model.pkl", "rb") as f:
                model = pickle.load(f)
            with open("scaler.pkl", "rb") as f:
                scaler = pickle.load(f)
            print("✅ Models loaded successfully with pickle")
            return model, scaler
        except Exception as e2:
            print(f"❌ Pickle load also failed: {e2}")
            print("⚠️ Please retrain the model in your current environment.")
            return None, None

# Load models
model, scaler = load_model_safe()

# Exit if models failed to load
if model is None or scaler is None:
    print("❌ ERROR: Could not load models. Exiting.")
    print(f"Python version: {sys.version}")
    sys.exit(1)

# Health Risk Prediction Endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        if not data or 'features' not in data:
            return jsonify({'error': 'Invalid input. "features" key missing.'}), 400

        # Convert features to NumPy array and reshape
        features = np.array(data['features']).reshape(1, -1)

        # Scale the input
        scaled_features = scaler.transform(features)

        # Predict
        prediction = model.predict(scaled_features)[0]
        probability = model.predict_proba(scaled_features)[0][1]

        return jsonify({
            'prediction': int(prediction),  # 1 = high risk, 0 = low risk
            'risk_probability': round(float(probability), 4)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'python_version': sys.version,
        'model_loaded': model is not None,
        'scaler_loaded': scaler is not None
    })

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
