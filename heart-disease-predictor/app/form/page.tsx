'use client';

import { JSX, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Heart, Activity, Stethoscope, BarChart3, TestTube } from 'lucide-react';
import { getPrediction } from '@/utils/api'; // Import your API function

export default function HeartHealthForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const totalSteps = 5;

  const [form, setForm] = useState({
    age: '',
    gender: '',
    chestPain: '',
    restingBP: '',
    cholesterol: '',
    fastingBS: '',
    ecg: '',
    maxHR: '',
    angina: '',
    stDepression: '',
    slope: '',
    vessels: '',
    thal: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsAnalyzing(true);
    
    try {
      // Use your actual API function
      const result = await getPrediction(form);
      
      // Store results consistently
      const results = {
        prediction: result.result === "High Risk" ? 1 : 0,
        probability: result.confidence,
        formData: form,
        timestamp: new Date().toISOString()
      };
      
      // Use localStorage consistently
      if (typeof window !== 'undefined') {
        localStorage.setItem('prediction', results.prediction.toString());
        localStorage.setItem('probability', results.probability.toString());
        localStorage.setItem('heartAssessmentResults', JSON.stringify(results));
      }
      
      // Navigate to result page
      router.push('/result');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error analyzing your data. Please try again.');
      setIsAnalyzing(false);
    }
  };

  // Rest of your component code remains the same...
  const progressPercentage = (currentStep / totalSteps) * 100;

  const stepIcons: Record<number, JSX.Element> = {
    1: <Heart className="w-5 h-5" />,
    2: <Activity className="w-5 h-5" />,
    3: <Stethoscope className="w-5 h-5" />,
    4: <BarChart3 className="w-5 h-5" />,
    5: <TestTube className="w-5 h-5" />
  };

  const stepTitles: Record<number, string> = {
    1: "Basic Information",
    2: "Symptoms & Pain",
    3: "Vital Signs",
    4: "Heart Activity",
    5: "Advanced Tests"
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return form.age && form.gender;
      case 2:
        return form.chestPain && form.angina;
      case 3:
        return form.restingBP && form.cholesterol && form.fastingBS;
      case 4:
        return form.ecg && form.maxHR && form.stDepression;
      case 5:
        return form.slope && form.vessels && form.thal;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Let's start with basics</h2>
              <p className="text-gray-600">Tell us about yourself</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">What's your age?</label>
              <input
                type="number"
                name="age"
                placeholder="Enter your age"
                value={form.age}
                onChange={handleChange}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors text-gray-800 placeholder-gray-500"
                min="1"
                max="120"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Gender</label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  form.gender === '1' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-400 text-gray-500 hover:border-gray-500'
                }`}>
                  <input
                    type="radio"
                    name="gender"
                    value="1"
                    checked={form.gender === '1'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="font-medium hover:border-gray-400 ">Male</span>
                </label>
                <label className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  form.gender === '0' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-400 text-gray-500 hover:border-gray-500 "'
                }`}>
                  <input
                    type="radio"
                    name="gender"
                    value="0"
                    checked={form.gender === '0'}
                    onChange={handleChange}
                    className="sr-only "
                  />
                  <span className="font-medium">Female</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Symptoms & Pain</h2>
              <p className="text-gray-600">Help us understand your symptoms</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Chest Pain Type</label>
              <select 
                name="chestPain" 
                value={form.chestPain}
                onChange={handleChange} 
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors text-gray-600 placeholder-gray-500"
                required
              >
                <option value="">Select type</option>
                <option value="0">Typical Angina</option>
                <option value="1">Atypical Angina</option>
                <option value="2">Non-anginal Pain</option>
                <option value="3">Asymptomatic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Exercise Induced Angina</label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  form.angina === '1' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-400 text-gray-500 hover:border-gray-500'
                }`}>
                  <input
                    type="radio"
                    name="angina"
                    value="1"
                    checked={form.angina === '1'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="font-medium">Yes</span>
                </label>
                <label className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  form.angina === '0' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-400 text-gray-500 hover:border-gray-500'
                }`}>
                  <input
                    type="radio"
                    name="angina"
                    value="0"
                    checked={form.angina === '0'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="font-medium">No</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Vital Signs</h2>
              <p className="text-gray-600">Your basic health metrics</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Resting Blood Pressure (mmHg)</label>
              <input
                type="number"
                name="restingBP"
                placeholder="e.g., 120"
                value={form.restingBP}
                onChange={handleChange}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors text-gray-800 placeholder-gray-500"
                min="50"
                max="250"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Cholesterol (mg/dl)</label>
              <input
                type="number"
                name="cholesterol"
                placeholder="e.g., 200"
                value={form.cholesterol}
                onChange={handleChange}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors text-gray-800 placeholder-gray-500"
                min="100"
                max="600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Fasting Blood Sugar {'>'} 120 mg/dl</label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  form.fastingBS === '1' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-400 text-gray-500 hover:border-gray-500'
                }`}>
                  <input
                    type="radio"
                    name="fastingBS"
                    value="1"
                    checked={form.fastingBS === '1'}
                    onChange={handleChange}
                    className="sr-only text-gray-800 placeholder-gray-500"
                  />
                  <span className="font-medium">Yes</span>
                </label>
                <label className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  form.fastingBS === '0' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-400 text-gray-500 hover:border-gray-500'
                }`}>
                  <input
                    type="radio"
                    name="fastingBS"
                    value="0"
                    checked={form.fastingBS === '0'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="font-medium">No</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Heart Activity</h2>
              <p className="text-gray-600">Heart function measurements</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Resting ECG Results</label>
              <select 
                name="ecg" 
                value={form.ecg}
                onChange={handleChange} 
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors text-gray-500 bg-white placeholder-gray-800"
                required
              >
                <option value="">Select result</option>
                <option value="0">Normal</option>
                <option value="1">ST-T Abnormality</option>
                <option value="2">Left Ventricular Hypertrophy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Maximum Heart Rate Achieved</label>
              <input
                type="number"
                name="maxHR"
                placeholder="e.g., 150"
                value={form.maxHR}
                onChange={handleChange}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors text-gray-800 placeholder-gray-500"
                min="60"
                max="220"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">ST Depression</label>
              <input
                type="number"
                name="stDepression"
                placeholder="e.g., 1.5"
                value={form.stDepression}
                onChange={handleChange}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors text-gray-800 placeholder-gray-500"
                step="0.1"
                min="0"
                max="10"
                required
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TestTube className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Advanced Tests</h2>
              <p className="text-gray-600">Final specialized measurements</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Slope of Peak Exercise ST Segment</label>
              <select 
                name="slope" 
                value={form.slope}
                onChange={handleChange} 
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors text-gray-600 placeholder-gray-500"
                required
              >
                <option value="">Select slope</option>
                <option value="0">Upsloping</option>
                <option value="1">Flat</option>
                <option value="2">Downsloping</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Major Vessels (Fluoroscopy)</label>
              <input
                type="number"
                name="vessels"
                placeholder="0-4"
                value={form.vessels}
                onChange={handleChange}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors text-gray-800 placeholder-gray-500"
                min="0"
                max="4"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Thalassemia Type</label>
              <select 
                name="thal" 
                value={form.thal}
                onChange={handleChange} 
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors text-gray-600 placeholder-gray-500"
                required
              >
                <option value="">Select type</option>
                <option value="1">Normal</option>
                <option value="2">Fixed Defect</option>
                <option value="3">Reversible Defect</option>
              </select>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => currentStep > 1 && handlePrev()}
                className={`p-2 rounded-full transition-colors ${
                  currentStep > 1 
                    ? 'text-gray-600 hover:bg-gray-100' 
                    : 'text-gray-300 cursor-not-allowed'
                }`}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Heart Health Assessment</h1>
                <p className="text-sm text-gray-600">{stepTitles[currentStep]}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              {stepIcons[currentStep]}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-lg mx-auto px-6 py-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="max-w-lg mx-auto px-6 py-4">
        <div className="flex justify-between">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div 
              key={step} 
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step < currentStep 
                  ? 'bg-green-500 text-white' 
                  : step === currentStep 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step < currentStep ? '✓' : step}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-lg mx-auto px-6 pb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {renderStep()}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="max-w-lg mx-auto px-6 pb-8">
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handlePrev}
            className={`flex-1 py-4 rounded-xl font-semibold transition-colors ${
              currentStep > 1 
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            disabled={currentStep === 1}
          >
            Previous
          </button>
          
          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className={`flex-1 py-4 rounded-xl font-semibold transition-colors ${
                isStepValid() 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!isStepValid()}
            >
              <div className="flex items-center justify-center space-x-2">
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isStepValid() || isAnalyzing}
              className={`flex-1 py-4 rounded-xl font-semibold transition-colors ${
                isStepValid() && !isAnalyzing
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isAnalyzing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                'Complete Assessment'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}