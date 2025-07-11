'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Activity, Shield } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    console.log('Button clicked successfully!');
    router.push('/form');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 pb-4 text-center">
        {/* Background Circle - Using fixed positioning to avoid click blocking */}
        <div 
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <div className="w-96 h-96 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full opacity-20 blur-3xl"></div>
        </div>
        
        {/* Heart Icon */}
        <div className="relative mb-8" style={{ zIndex: 10 }}>
          <div className="w-48 h-48 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
            <Heart className="w-24 h-24 text-white fill-current" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-800 mb-4 relative" style={{ zIndex: 10 }}>
          HeartWise AI
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-8 max-w-md relative" style={{ zIndex: 10 }}>
          Check your heart health instantly using AI.
        </p>

        {/* Button Container */}
        <div className=" py-4 space-y-4 relative" style={{ zIndex: 9999 }}>
          {/* Method 1: useRouter with button */}
          <button 
            onClick={handleClick}
            className="block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
            style={{ position: 'relative', zIndex: 10000 }}
          >
            Check Your Risk Now
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-8 px-8 relative" style={{ zIndex: 5 }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 text-gray-800">Benefits</h2>
          <p className="text-center text-gray-600 py-1 mb-12 max-w-2xl mx-auto">
            Our AI-powered tool provides a comprehensive heart health assessment.
          </p>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Easy & Free Assessment</h3>
              <p className="text-gray-600">
                Quickly assess your heart health with our user-friendly tool, at no cost.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Backed by Machine Learning</h3>
              <p className="text-gray-600">
                Our tool uses advanced AI/ML models for accurate risk prediction.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Instant Results & Recommendations</h3>
              <p className="text-gray-600">
                Get immediate insights and personalized recommendations to improve your heart health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}