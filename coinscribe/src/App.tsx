import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CryptoCard } from './components/CryptoCard';
import { ExchangeCard } from './components/ExchangeCard';
import { ChatBot } from './components/ChatBot'; // Import ChatBot
import { HardwareWalletCard } from './components/HardwareWalletCard'; // Import HardwareWalletCard
import { topCryptos, recommendedExchanges, hardwareWallets } from './data/cryptoData'; // Import hardwareWallets data
import { Bitcoin, Wallet, BookOpen, MessageCircle, HardDrive } from 'lucide-react'; // Import HardDrive icon
import axios from 'axios';

// Define interface for CoinGecko price data for a single coin
interface CoinGeckoPriceData {
  usd: number;
  usd_24h_change: number;
}

// Define interface for the overall CoinGecko API response
interface CoinGeckoResponse {
  [key: string]: CoinGeckoPriceData;
}

function App() {
  const [activeSection, setActiveSection] = useState('intro');
  const [prices, setPrices] = useState<{[key: string]: number}>({});
  const [priceChanges, setPriceChanges] = useState<{[key: string]: number}>({});

  useEffect(() => {
    // Combine IDs from both crypto and hardware wallets if needed for pricing,
    // though hardware wallets don't have prices. Only fetch for topCryptos.
    const cryptoIds = topCryptos.map(crypto => crypto.id).join(',');

    const fetchPrices = async () => {
      if (!cryptoIds) return; // Don't fetch if no crypto IDs
      try {
        const response = await axios.get<CoinGeckoResponse>(
          `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=usd&include_24hr_change=true`
        );
        
        const newPrices: {[key: string]: number} = {};
        const newChanges: {[key: string]: number} = {};
        
        Object.entries(response.data).forEach(([id, data]) => {
          newPrices[id] = data.usd;
          newChanges[id] = data.usd_24h_change;
        });
        
        setPrices(newPrices);
        setPriceChanges(newChanges);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []); // Dependency array is empty, runs once on mount and sets interval

  const updatedCryptos = topCryptos.map(crypto => ({
    ...crypto,
    currentPrice: prices[crypto.id],
    priceChangePercentage24h: priceChanges[crypto.id]
  }));

  return (
    <div className="min-h-screen"> 
      <nav className="bg-primary-dark shadow-lg sticky top-0 z-50"> {/* Made nav sticky */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              {/* Intro Button */}
              <button
                onClick={() => setActiveSection('intro')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-150 ${
                  activeSection === 'intro'
                    ? 'border-accent-blue text-light-text' 
                    : 'border-transparent text-gray-400 hover:border-gray-500 hover:text-light-text'
                }`}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Introduction
              </button>
              {/* Cryptocurrencies Button */}
              <button
                onClick={() => setActiveSection('cryptocurrencies')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-150 ${
                  activeSection === 'cryptocurrencies'
                    ? 'border-accent-blue text-light-text'
                    : 'border-transparent text-gray-400 hover:border-gray-500 hover:text-light-text'
                }`}
              >
                <Bitcoin className="w-5 h-5 mr-2" />
                Top Cryptocurrencies
              </button>
              {/* Exchanges Button */}
              <button
                onClick={() => setActiveSection('exchanges')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-150 ${
                  activeSection === 'exchanges'
                    ? 'border-accent-blue text-light-text'
                    : 'border-transparent text-gray-400 hover:border-gray-500 hover:text-light-text'
                }`}
              >
                <Wallet className="w-5 h-5 mr-2" />
                Exchanges & Platforms
              </button>
               {/* Hardware Wallets Button */}
              <button
                onClick={() => setActiveSection('hardwareWallets')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-150 ${
                  activeSection === 'hardwareWallets'
                    ? 'border-accent-blue text-light-text'
                    : 'border-transparent text-gray-400 hover:border-gray-500 hover:text-light-text'
                }`}
              >
                <HardDrive className="w-5 h-5 mr-2" />
                Hardware Wallets
              </button>
              {/* Ask AI Button */}
              <button
                onClick={() => setActiveSection('chat')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-150 ${
                  activeSection === 'chat'
                    ? 'border-accent-blue text-light-text'
                    : 'border-transparent text-gray-400 hover:border-gray-500 hover:text-light-text'
                }`}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Ask AI
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro Section */}
        {activeSection === 'intro' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-none text-light-text" 
          >
            <h1 className="text-4xl font-bold text-light-text mb-8">Welcome to Your Crypto Journey!</h1>
            <div className="bg-secondary-gray rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-light-text mb-4">What is Cryptocurrency? (And Why Should You Care?)</h2>
              <p className="text-gray-300 leading-relaxed mb-4"> 
                Think of cryptocurrency as digital or virtual money secured by cryptography (that's the 'crypto' part!). Unlike traditional money issued by governments (like dollars or euros), cryptocurrencies typically operate on a technology called <strong className="text-accent-blue">blockchain</strong>. Imagine a shared, unchangeable digital ledger that records every transaction across many computers. This makes it transparent and resistant to control by any single entity, like a bank or government.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Why is this exciting? Cryptocurrencies can offer faster, cheaper global transactions, give people more control over their own money (especially in places with unstable financial systems), and power new kinds of internet applications (sometimes called Web3). Bitcoin was the first, but now there are thousands, each with different goals and technologies!
              </p>
              <h3 className="text-xl font-semibold mb-4">How This App Helps You</h3>
               <p className="text-gray-300 leading-relaxed mb-6">
                Navigating the world of crypto can feel overwhelming at first. This app is designed to be your friendly guide:
               </p>
               <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
                 <li><strong>Learn the Basics:</strong> Understand core concepts in simple terms.</li>
                 <li><strong>Discover Top Coins:</strong> Explore some of the most popular and established cryptocurrencies.</li>
                 <li><strong>Find Exchanges & Platforms:</strong> Learn about places where you can buy, sell, or hold crypto.</li>
                 <li><strong>Understand Hardware Wallets:</strong> Discover secure offline storage options.</li>
                 <li><strong className="text-light-text">Ask Questions:</strong> Use our AI assistant to get answers to your specific crypto questions.</li>
               </ul>
              <h3 className="text-xl font-semibold text-light-text mb-4">Getting Started: Your First Steps</h3>
              <p className="text-gray-300 leading-relaxed mb-4">Ready to dip your toes in? Here's a general roadmap (remember to always prioritize safety and research!):</p>
              <ol className="list-decimal list-inside space-y-4 text-gray-300">
                <li>Choose a trusted exchange or platform (we list some!)</li>
                <li>Create an account and verify your identity (required by most)</li>
                <li>Secure your account (strong password, 2-Factor Authentication)</li>
                <li>Connect your bank account or debit card (optional)</li>
                <li>Start with a small amount you are comfortable potentially losing</li>
                <li>Buy your first cryptocurrency!</li>
                <li>Consider a hardware wallet for long-term storage if investing significantly.</li>
              </ol>
            </div>
            <div className="bg-secondary-gray rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-light-text mb-4">Important Security Tips</h2>
              <ul className="space-y-4 text-gray-300">
                <li>• <strong className="text-light-text">Not Your Keys, Not Your Coins:</strong> Understand that holding crypto on an exchange means you don't control the private keys. For large amounts, consider self-custody with a hardware wallet.</li>
                <li>• <strong className="text-light-text">Secure Your Recovery Phrase:</strong> If using a self-custody wallet (like a hardware wallet), guard your recovery phrase (seed phrase) offline and never share it. It's the master key to your funds.</li>
                <li>• <strong className="text-light-text">Beware of Scams:</strong> Be skeptical of unsolicited messages, giveaways, or investment schemes promising high returns. Phishing attempts are common.</li>
                <li>• <strong className="text-light-text">Use Strong, Unique Passwords & 2FA:</strong> Protect your exchange accounts like you would your bank account.</li>
                <li>• <strong className="text-light-text">Start Small & Research:</strong> Never invest more than you can afford to lose. Understand the specific cryptocurrency you are buying.</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Cryptocurrencies Section */}
        {activeSection === 'cryptocurrencies' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-light-text mb-8">Top Cryptocurrencies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {updatedCryptos.map((crypto) => (
                <CryptoCard key={crypto.id} crypto={crypto} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Exchanges Section */}
        {activeSection === 'exchanges' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-light-text mb-8">Exchanges & Platforms</h2>
             <p className="text-gray-300 mb-6">These are platforms where you can buy, sell, or sometimes hold cryptocurrencies. Features and fees vary significantly.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendedExchanges.map((exchange) => (
                <ExchangeCard key={exchange.name} exchange={exchange} />
              ))}
            </div>
          </motion.div>
        )}

         {/* Hardware Wallets Section */}
        {activeSection === 'hardwareWallets' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-light-text mb-8">Hardware Wallets (Cold Storage)</h2>
             <p className="text-gray-300 mb-6">Hardware wallets are physical devices that keep your private keys offline, providing a high level of security against online threats. They are recommended for storing significant amounts of cryptocurrency long-term.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6"> {/* Adjusted grid */}
              {hardwareWallets.map((wallet) => (
                <HardwareWalletCard key={wallet.name} wallet={wallet} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Chat Section */}
        {activeSection === 'chat' && (
          <div className="flex justify-center"> 
            <ChatBot />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
