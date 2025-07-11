'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Heart, Calendar, User } from 'lucide-react';
import Link from 'next/link';

export default function ResultPage() {
  const router = useRouter();
  const [prediction, setPrediction] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const result = localStorage.getItem('prediction');
    const prob = localStorage.getItem('probability');

    if (result && prob) {
      setPrediction(parseInt(result));
      setConfidence(parseFloat(prob));
    }

    setLoading(false);
  }, []);

  const getRiskLevel = () => {
    if (prediction === null) return 'Unknown';
    if (prediction === 1) return 'High Risk';
    return 'Low Risk';
  };

  const getRiskColor = () => {
    if (prediction === null) return 'text-gray-600';
    if (prediction === 1) return 'text-red-600';
    return 'text-green-600';
  };

  const getHeartColor = () => {
    if (prediction === null) return 'from-gray-400 to-gray-500';
    if (prediction === 1) return 'from-red-400 to-red-500';
    return 'from-green-400 to-green-500';
  };

  const getAdvice = () => {
    if (prediction === 1) {
      return "Your assessment indicates a high risk of heart disease. It's advisable to consult with a healthcare professional for further evaluation and guidance.";
    } else if (prediction === 0) {
      return "Your assessment indicates a low risk of heart disease. Continue maintaining a healthy lifestyle and regular checkups.";
    }
    return "Please consult with a healthcare professional for proper evaluation.";
  };

  const getConfidencePercentage = () => {
    if (confidence === null) return 0;
    return Math.round(confidence * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your assessment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <Link href="/form" className="mr-4">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-800">Heart Risk Assessment</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Heart Risk Level</h2>
          
          {/* Heart Icon */}
          <div className="mb-6">
            <div className={`w-32 h-32 bg-gradient-to-br ${getHeartColor()} rounded-full flex items-center justify-center mx-auto shadow-lg`}>
              <Heart className="w-16 h-16 text-white fill-current" />
            </div>
          </div>

          {/* Risk Level */}
          <div className="mb-4">
            <span className={`text-3xl font-bold ${getRiskColor()}`}>
              {getRiskLevel()}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            {getAdvice()}
          </p>

          {/* Confidence Score */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Confidence Score</span>
              <span className="text-sm font-bold text-gray-900">{getConfidencePercentage()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getConfidencePercentage()}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-4 mb-8">
          <h3 className="text-xl font-bold text-gray-800">Recommendations</h3>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Consult a Doctor</h4>
                <p className="text-sm text-gray-600">
                  Consider scheduling an appointment with a cardiologist for a comprehensive check-up and personalized advice.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Regular Checkups</h4>
                <p className="text-sm text-gray-600">
                  Maintain regular check-ups and follow a heart-healthy lifestyle.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => router.push('/form')}
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 mt-4 mb-28"
        >
          Take Another Assessment
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex justify-center space-x-8">
            <Link href="/" className="flex flex-col items-center space-y-1">
              <Heart className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-500">Home</span>
            </Link>
            <div className="flex flex-col items-center space-y-1">
              <Heart className="w-6 h-6 text-blue-600 fill-current" />
              <span className="text-xs text-blue-600 font-medium">Assess</span>
            </div>
            <Link href="/about" className="flex flex-col items-center space-y-1">
              <User className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-500">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}