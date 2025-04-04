import React from 'react';
import { motion } from 'framer-motion';
import { CryptoInfo } from '../types/crypto';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  crypto: CryptoInfo;
}

export const CryptoCard: React.FC<Props> = ({ crypto }) => {
  return (
    // Updated background and text colors
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-secondary-gray rounded-xl shadow-lg p-6 m-4 w-full max-w-md text-light-text" 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-4">
        <img src={crypto.image} alt={crypto.name} className="w-12 h-12 rounded-full" /> {/* Added rounded-full */}
        <div>
          <h3 className="text-xl font-bold text-light-text">{crypto.name}</h3>
          <p className="text-gray-400">{crypto.symbol}</p> {/* Adjusted text color */}
        </div>
      </div>
      
      <p className="mt-4 text-gray-300 leading-relaxed">{crypto.description}</p> {/* Adjusted text color */}
      
      {crypto.currentPrice && (
        <div className="mt-4 flex items-center space-x-2">
          <span className="font-semibold text-light-text">${crypto.currentPrice.toLocaleString()}</span>
          {crypto.priceChangePercentage24h && (
            // Keep original green/red for price change indication
            <span className={`flex items-center ${
              crypto.priceChangePercentage24h > 0 ? 'text-green-400' : 'text-red-400' 
            }`}>
              {crypto.priceChangePercentage24h > 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {Math.abs(crypto.priceChangePercentage24h).toFixed(2)}%
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};
