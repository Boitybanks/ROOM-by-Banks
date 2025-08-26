import React from 'react';
import { CommunitySpark } from '../types';

interface SparkModalProps {
  spark: CommunitySpark;
  onClose: () => void;
}

const SparkModal: React.FC<SparkModalProps> = ({ spark, onClose }) => {
  return (
    <div 
      className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="spark-title"
    >
      <div 
        className="bg-gray-800 border border-purple-700 rounded-lg p-6 w-full max-w-sm shadow-2xl shadow-purple-500/20" 
        onClick={e => e.stopPropagation()}
      >
        <h2 id="spark-title" className="text-xl font-bold text-purple-300 mb-2">{spark.title}</h2>
        <p className="text-gray-300 whitespace-pre-wrap">{spark.content}</p>
        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg transition-all">
            Cool
          </button>
        </div>
      </div>
    </div>
  );
};

export default SparkModal;
