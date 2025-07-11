import numpy as np
import pandas as pd
import os
import sys
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib

# Print current environment info
print(f"Python version: {sys.version}")
print(f"Working directory: {os.getcwd()}")

def download_heart_disease_data():
    """Download the Heart Disease Cleveland UCI dataset if not present"""
    data_dir = "data"
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)
    
    # Check if dataset already exists
    possible_files = [
        os.path.join(data_dir, "heart.csv"),
        os.path.join(data_dir, "heart_disease.csv"),
        os.path.join(data_dir, "processed.cleveland.data"),
        os.path.join(data_dir, "heart_disease_cleveland.csv")
    ]
    
    for file_path in possible_files:
        if os.path.exists(file_path):
            print(f"Found dataset: {file_path}")
            return file_path
    
    print("Dataset not found. Please:")
    print("1. Go to: https://www.kaggle.com/datasets/cherngs/heart-disease-cleveland-uci")
    print("2. Download the dataset")
    print("3. Extract 'heart.csv' to the 'data' folder")
    print("4. Run this script again")
    return None

def load_heart_disease_data():
    """Load the Heart Disease Cleveland UCI dataset"""
    
    data_file = download_heart_disease_data()
    if data_file is None:
        return None, None
    
    try:
        df = pd.read_csv(data_file)
        print(f"Dataset loaded successfully!")
        print(f"Dataset shape: {df.shape}")
        
        # The Heart Disease Cleveland UCI dataset has these columns:
        expected_columns = [
            'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg',
            'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal', 'condition'
        ]
        
        # Check if columns match expected format
        if 'target' in df.columns:
            print("✓ Standard Heart Disease dataset format detected")
        else:
            print("Column names:", list(df.columns))
            # Sometimes the target column has a different name
            if 'num' in df.columns:
                df.rename(columns={'num': 'target'}, inplace=True)
                print("✓ Renamed 'num' column to 'target'")
        
        # Display dataset info
        print(f"Columns: {list(df.columns)}")
        print(f"\nDataset info:")
        print(df.info())
        
        print(f"\nFirst few rows:")
        print(df.head())
        
        # Prepare features and target
        X = df.drop('condition', axis=1)
        y = df['condition']

        
        # For heart disease, often target > 0 means disease present
        # Convert to binary if needed
        if y.max() > 1:
            y = (y > 0).astype(int)
            print("✓ Converted multi-class target to binary (0=no disease, 1=disease)")
        
        print(f"\nFeatures shape: {X.shape}")
        print(f"Target shape: {y.shape}")
        print(f"Target distribution:\n{y.value_counts()}")
        
        # Check for missing values
        if df.isnull().sum().sum() > 0:
            print("\nMissing values found:")
            print(df.isnull().sum())
            # Handle missing values
            df.fillna(df.mean(), inplace=True)
            print("✓ Missing values filled with mean")
        
        return X, y
        
    except Exception as e:
        print(f"Error loading data: {e}")
        return None, None

def train_heart_disease_model():
    """Train the heart disease prediction model"""
    
    print("Heart Disease Cleveland UCI - Model Training")
    print("=" * 50)
    
    # Load data
    X, y = load_heart_disease_data()
    
    if X is None or y is None:
        print("Failed to load data. Please check your dataset.")
        return False
    
    # Feature information for the Heart Disease dataset
    feature_info = {
        'age': 'Age in years',
        'sex': 'Sex (1 = male; 0 = female)',
        'cp': 'Chest pain type (0-3)',
        'trestbps': 'Resting blood pressure (mm Hg)',
        'chol': 'Serum cholesterol (mg/dl)',
        'fbs': 'Fasting blood sugar > 120 mg/dl (1 = true; 0 = false)',
        'restecg': 'Resting electrocardiographic results (0-2)',
        'thalach': 'Maximum heart rate achieved',
        'exang': 'Exercise induced angina (1 = yes; 0 = no)',
        'oldpeak': 'ST depression induced by exercise',
        'slope': 'Slope of the peak exercise ST segment (0-2)',
        'ca': 'Number of major vessels colored by fluoroscopy (0-3)',
        'thal': 'Thalassemia (1 = normal; 2 = fixed defect; 3 = reversible defect)'
    }
    
    print("\nFeature descriptions:")
    for feature, description in feature_info.items():
        if feature in X.columns:
            print(f"  {feature}: {description}")
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    print(f"\nTraining set size: {X_train.shape[0]}")
    print(f"Test set size: {X_test.shape[0]}")
    
    # Create and fit scaler
    print("\nScaling features...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train multiple models
    models = {
        'RandomForest': RandomForestClassifier(
            n_estimators=100, 
            random_state=42, 
            max_depth=10,
            min_samples_split=5
        ),
        'LogisticRegression': LogisticRegression(
            random_state=42, 
            max_iter=1000
        ),
        'SVM': SVC(
            random_state=42, 
            probability=True,
            kernel='rbf'
        )
    }
    
    best_model = None
    best_accuracy = 0
    best_name = ""
    
    print("\nTraining models...")
    for name, model in models.items():
        print(f"\nTraining {name}...")
        model.fit(X_train_scaled, y_train)
        
        y_pred = model.predict(X_test_scaled)
        accuracy = accuracy_score(y_test, y_pred)
        
        print(f"{name} accuracy: {accuracy:.4f}")
        
        if accuracy > best_accuracy:
            best_accuracy = accuracy
            best_model = model
            best_name = name
    
    print(f"\n🏆 Best model: {best_name} with accuracy: {best_accuracy:.4f}")
    
    # Final evaluation
    y_pred_final = best_model.predict(X_test_scaled)
    y_proba_final = best_model.predict_proba(X_test_scaled)
    
    print(f"\nFinal Model Performance:")
    print(f"Accuracy: {accuracy_score(y_test, y_pred_final):.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred_final, 
                              target_names=['No Disease', 'Disease']))
    print("\nConfusion Matrix:")
    print(confusion_matrix(y_test, y_pred_final))
    
    # Feature importance (if available)
    if hasattr(best_model, 'feature_importances_'):
        print("\nTop 5 Most Important Features:")
        feature_importance = pd.DataFrame({
            'feature': X.columns,
            'importance': best_model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        for i, (_, row) in enumerate(feature_importance.head().iterrows()):
            print(f"  {i+1}. {row['feature']}: {row['importance']:.4f}")
    
    # Save the model and scaler
    print("\nSaving model and scaler...")
    joblib.dump(best_model, "health_risk_model.pkl")
    joblib.dump(scaler, "scaler.pkl")
    
    print("✓ Model saved as: health_risk_model.pkl")
    print("✓ Scaler saved as: scaler.pkl")
    
    # Test loading
    print("\nTesting model loading...")
    test_model = joblib.load("health_risk_model.pkl")
    test_scaler = joblib.load("scaler.pkl")
    
    # Test prediction with a sample
    test_sample = X_test_scaled[0].reshape(1, -1)
    test_pred = test_model.predict(test_sample)
    test_proba = test_model.predict_proba(test_sample)
    
    print(f"Test prediction: {test_pred[0]} ({'Disease' if test_pred[0] == 1 else 'No Disease'})")
    print(f"Test probability: {test_proba[0][1]:.4f} (risk of disease)")
    print("✓ Model loading and prediction test successful!")
    
    # Save feature names and info
    feature_names = list(X.columns)
    with open("feature_names.txt", "w") as f:
        f.write("Heart Disease Cleveland UCI Dataset Features:\n")
        f.write("=" * 50 + "\n\n")
        for feature in feature_names:
            description = feature_info.get(feature, "No description")
            f.write(f"{feature}: {description}\n")
    
    print(f"✓ Feature information saved to feature_names.txt")
    
    # Create a sample input for testing your Flask app
    sample_input = X_test.iloc[0].values.tolist()
    print(f"\nSample input for testing your Flask app:")
    print(f"Features: {sample_input}")
    print(f"Expected output: {y_test.iloc[0]} ({'Disease' if y_test.iloc[0] == 1 else 'No Disease'})")
    
    return True

if __name__ == "__main__":
    success = train_heart_disease_model()
    
    if success:
        print("\n🎉 Heart Disease Model Training Completed Successfully!")
        print("\nNext steps:")
        print("1. Your Flask app should now work: python app.py")
        print("2. Test with POST request to /predict endpoint")
        print("3. Use the sample input printed above for testing")
    else:
        print("\n❌ Model training failed. Please check your dataset.")
        print("Make sure you have the heart.csv file in the data/ folder")