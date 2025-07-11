import React from 'react';
import { ChevronLeft, Database, Brain, Target, Twitter, Instagram, Facebook } from 'lucide-react';

export default function AIModelExplanation() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <button className="mr-4">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">AI Model Explanation</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* How Our AI Model Works */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How Our AI Model Works</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Our AI model is trained using a large dataset of anonymized patient records, including various 
            health metrics like age, blood pressure, cholesterol levels, and lifestyle factors. The model 
            learns patterns and relationships within this data to predict the likelihood of heart disease. 
            It's a complex process involving machine learning algorithms that iteratively refine their predictions 
            based on feedback from the data.
          </p>
        </div>

        {/* Data Used */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Used</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The model utilizes the <strong>Heart Disease Cleveland UCI dataset</strong>, a comprehensive collection that includes 
            demographic information, medical history, physical examination results, and laboratory test results. 
            This dataset is widely recognized in the medical research community and contains anonymized patient 
            records from the Cleveland Clinic Foundation. The data is carefully curated and preprocessed to ensure 
            accuracy and relevance. We prioritize data privacy and adhere to strict ethical guidelines to protect 
            patient confidentiality.
          </p>
        </div>

        {/* Limitations and Disclaimers */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Limitations and Disclaimers</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            It's important to understand that our AI model is a predictive tool and not a substitute for professional 
            medical advice. The predictions provided should be discussed with a qualified healthcare provider. 
            The model's accuracy is dependent on the quality and representativeness of the training data, and it 
            may not be applicable to all individuals or populations. We continuously work to improve the 
            model's performance and expand its capabilities.
          </p>
        </div>

        {/* ML Process Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">ML Process Overview</h3>
          
          <div className="relative">
            {/* Vertical line connecting all icons */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-6">
              {/* Data Collection & Preprocessing */}
              <div className="flex items-start space-x-4 relative">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center relative z-10">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Data Collection & Preprocessing</h4>
                  <p className="text-gray-600">Gathering and cleaning patient data</p>
                </div>
              </div>

              {/* Model Training & Validation */}
              <div className="flex items-start space-x-4 relative">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center relative z-10">
                  <Brain className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Model Training & Validation</h4>
                  <p className="text-gray-600">Iterative learning and testing</p>
                </div>
              </div>

              {/* Prediction & Refinement */}
              <div className="flex items-start space-x-4 relative">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center relative z-10">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Prediction & Refinement</h4>
                  <p className="text-gray-600">Continuous improvement based on feedback</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Footer Links */}
          <div className="flex flex-wrap justify-center space-x-8 mb-6">
            <button className="text-gray-600 hover:text-gray-800 font-medium">Home</button>
            <button className="text-gray-600 hover:text-gray-800 font-medium">About</button>
            <button className="text-gray-600 hover:text-gray-800 font-medium">Terms</button>
            <button className="text-gray-600 hover:text-gray-800 font-medium">Privacy Policy</button>
            <button className="text-gray-600 hover:text-gray-800 font-medium">Contact</button>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 mb-6">
            <button className="text-gray-400 hover:text-gray-600">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <Instagram className="w-5 h-5" />
            </button>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">© 2024 Health Insights Co. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}