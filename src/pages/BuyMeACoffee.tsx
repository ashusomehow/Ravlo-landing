import React from 'react';
import { Coffee, Heart, Star, Zap } from 'lucide-react';

const BuyMeACoffee: React.FC = () => {
  const handleCoffeeClick = () => {
    window.open('https://coff.ee/ashusomehoh', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-32 h-32 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Support Ravlo's Journey
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Help keep Ravlo free and fuel the development of amazing features for the LinkedIn community
            </p>
          </div>

          {/* Main Coffee Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 md:p-12 mb-12 transform hover:scale-105 transition-all duration-300">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <Coffee className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
              Buy Me a Coffee ☕
            </h2>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              If Ravlo has helped you grow your LinkedIn presence, consider buying me a coffee! 
              Every cup helps keep this tool free and supports future development.
            </p>

            <button
              onClick={handleCoffeeClick}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Coffee className="w-5 h-5" />
                Buy Me a Coffee
                <Zap className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                Keep It Free
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Help maintain Ravlo as a completely free tool for everyone
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                New Features
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Support the development of exciting new features and improvements
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                Community
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Join a community of professionals supporting each other's growth
              </p>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl italic text-slate-700 dark:text-slate-200 mb-4">
              "Ravlo has completely transformed my LinkedIn strategy. The AI-generated content is spot-on and the hook templates are pure gold. This tool deserves all the support!"
            </blockquote>
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              — Sarah Chen, Marketing Director
            </p>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-slate-500 dark:text-slate-400">
              Even a small contribution makes a big difference. Thank you for being part of the Ravlo community! ❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyMeACoffee; 