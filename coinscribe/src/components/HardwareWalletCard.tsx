import React from 'react';
import { motion } from 'framer-motion';
import { HardwareWallet } from '../types/crypto';
import { ShieldCheck, ListChecks } from 'lucide-react'; // Icons for features/security

interface Props {
  wallet: HardwareWallet;
}

export const HardwareWalletCard: React.FC<Props> = ({ wallet }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-secondary-gray rounded-xl shadow-lg p-6 m-4 w-full max-w-md text-light-text"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <img 
          src={wallet.logo || 'https://via.placeholder.com/48/1a202c/f7fafc?text=HW'} // Placeholder
          alt={wallet.name} 
          className="w-12 h-12 rounded-full bg-primary-dark p-1" 
        />
        <div>
          <h3 className="text-xl font-bold text-light-text">{wallet.name}</h3>
          <a 
            href={wallet.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-accent-blue hover:underline"
          >
            Visit Website
          </a>
        </div>
      </div>

      <p className="text-gray-300 mb-4">{wallet.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-light-text mb-2 flex items-center">
            <ListChecks className="w-5 h-5 mr-2 text-accent-blue" /> Features:
          </h4>
          <ul className="space-y-1 list-disc list-inside pl-2">
            {wallet.features.map((feature, index) => (
              <li key={index} className="text-sm text-gray-300">
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-light-text mb-2 flex items-center">
             <ShieldCheck className="w-5 h-5 mr-2 text-green-400" /> Security Focus:
          </h4>
          <ul className="space-y-1 list-disc list-inside pl-2">
            {wallet.security_focus.map((focus, index) => (
              <li key={index} className="text-sm text-gray-300">
                {focus}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
