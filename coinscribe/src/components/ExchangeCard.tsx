import React from 'react';
import { motion } from 'framer-motion';
import { Exchange } from '../types/crypto';
import { CheckCircle, XCircle } from 'lucide-react';

interface Props {
  exchange: Exchange;
}

export const ExchangeCard: React.FC<Props> = ({ exchange }) => {
  return (
    // Updated background and text colors
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-secondary-gray rounded-xl shadow-lg p-6 m-4 w-full max-w-md text-light-text"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-4 mb-4">
        {/* Use a generic exchange icon or fetch real logos if available */}
        <img 
          src={exchange.logo || 'https://via.placeholder.com/48/1a202c/f7fafc?text=Ex'} // Placeholder if no logo
          alt={exchange.name} 
          className="w-12 h-12 rounded-full bg-primary-dark p-1" 
        />
        <div>
          <h3 className="text-xl font-bold text-light-text">{exchange.name}</h3>
          <a 
            href={exchange.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-accent-blue hover:underline"
          >
            Visit Website
          </a>
        </div>
      </div>

      <p className="text-gray-300 mb-4">{exchange.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-light-text mb-2">Pros:</h4>
          <ul className="space-y-1">
            {exchange.pros.map((pro, index) => (
              <li key={index} className="flex items-center text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-light-text mb-2">Cons:</h4>
          <ul className="space-y-1">
            {exchange.cons.map((con, index) => (
              <li key={index} className="flex items-center text-sm text-gray-300">
                <XCircle className="w-4 h-4 mr-2 text-red-400 flex-shrink-0" />
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {exchange.beginner_friendly && (
        <div className="mt-4 text-sm font-medium text-green-400">
          ✓ Beginner Friendly
        </div>
      )}
    </motion.div>
  );
};
