import React from 'react';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'History',
  description: 'Learn about the history of the women\'s rights movement and the fight'
}

const HistoryPage: React.FC = () => {
  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-white mb-12 mt-16 hover:scale-105 transition-transform duration-300">
          History of Women Empowerment
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg 
              hover:shadow-2xl hover:bg-white/20 hover:scale-105 hover:rotate-1
              transition-all duration-300 cursor-pointer border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-4 hover:text-pink-300">Early Movements</h2>
            <p className="text-gray-100">
              The women&apos;s rights movement began in the 19th century with the fight for suffrage and basic legal rights.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg 
              hover:shadow-2xl hover:bg-white/20 hover:scale-105 hover:-rotate-1
              transition-all duration-300 cursor-pointer border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-4 hover:text-pink-300">Mid-20th Century</h2>
            <p className="text-gray-100">
              The 1960s and 70s saw significant progress in workplace rights, reproductive rights, and educational opportunities.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg 
              hover:shadow-2xl hover:bg-white/20 hover:scale-105 hover:rotate-1
              transition-all duration-300 cursor-pointer border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-4 hover:text-pink-300">Modern Era</h2>
            <p className="text-gray-100">
              Today&apos;s movement focuses on equality in leadership, closing the wage gap, and addressing gender-based discrimination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;




