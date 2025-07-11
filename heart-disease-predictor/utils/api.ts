export const getPrediction = async (form: any) => {
  try {
    // Ensure all form values are properly converted to numbers
    const features = [
      parseFloat(form.age),
      parseFloat(form.gender),
      parseFloat(form.chestPain),
      parseFloat(form.restingBP),
      parseFloat(form.cholesterol),
      parseFloat(form.fastingBS),
      parseFloat(form.ecg),
      parseFloat(form.maxHR),
      parseFloat(form.angina),
      parseFloat(form.stDepression),
      parseFloat(form.slope),
      parseFloat(form.vessels),
      parseFloat(form.thal),
    ];

    // Validate that all features are valid numbers
    if (features.some(feature => isNaN(feature))) {
      throw new Error('Invalid input data: some fields contain non-numeric values');
    }

    console.log('Sending features to API:', features);

    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ features }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('API Response:', result);

    return {
      result: result.prediction === 1 ? "High Risk" : "Low Risk",
      confidence: result.risk_probability || 0,
    };
  } catch (error) {
    console.error('Error while fetching prediction:', error);
    
    // Return a more detailed error response
    return {
      result: "Error",
      confidence: 0,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};