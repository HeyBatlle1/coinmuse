import { CryptoInfo, Exchange, HardwareWallet } from '../types/crypto'; // Added HardwareWallet

export const topCryptos: CryptoInfo[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    description: 'The original cryptocurrency, often seen as digital gold. It\'s the largest and most well-known, operating on a decentralized network.',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    description: 'More than just money, Ethereum is a platform for decentralized applications (dApps) and smart contracts. It powers much of the NFT and DeFi space.',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
  },
  {
    id: 'tether',
    name: 'Tether',
    symbol: 'USDT',
    description: 'A stablecoin pegged to the US dollar. It aims to maintain a stable value, making it useful for trading and holding value without crypto volatility.',
    image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png'
  },
  {
    id: 'binancecoin',
    name: 'BNB',
    symbol: 'BNB',
    description: 'The native token of the Binance ecosystem, used for paying trading fees on the exchange and participating in the BNB Chain network.',
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png'
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    description: 'Known for its high speed and low transaction costs, Solana is a popular platform for dApps, NFTs, and DeFi projects requiring fast performance.',
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png'
  },
  {
    id: 'usd-coin',
    name: 'USD Coin',
    symbol: 'USDC',
    description: 'Another major stablecoin pegged to the US dollar, known for its transparency and regulatory compliance. Widely used in DeFi.',
    image: 'https://assets.coingecko.com/coins/images/6319/large/usdc.png'
  },
  {
    id: 'ripple',
    name: 'XRP',
    symbol: 'XRP',
    description: 'Designed for fast and cheap international payments, XRP Ledger aims to facilitate cross-border transactions for financial institutions.',
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png'
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    description: 'A proof-of-stake blockchain platform focusing on peer-reviewed research and a methodical approach to development for security and sustainability.',
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png'
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    description: 'Started as a meme, Dogecoin has a large and active community. Often used for tipping and charitable causes online.',
    image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png'
  },
  {
    id: 'avalanche-2', // Note: CoinGecko ID for Avalanche is 'avalanche-2'
    name: 'Avalanche',
    symbol: 'AVAX',
    description: 'A fast platform for dApps and custom blockchains, known for its sub-second transaction finality and scalability.',
    image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png'
  }
];

export const recommendedExchanges: Exchange[] = [
  {
    name: 'Coinbase',
    url: 'https://www.coinbase.com',
    description: 'Popular, user-friendly exchange, great starting point for beginners in many countries.',
    pros: ['Easy to use interface', 'Insured USD balances', 'Educational resources'],
    cons: ['Higher fees compared to others', 'Limited coin selection vs largest exchanges'],
    beginner_friendly: true,
    logo: 'https://via.placeholder.com/48/0052FF/FFFFFF?text=CB' // Placeholder
  },
  {
    name: 'Gemini',
    url: 'https://www.gemini.com',
    description: 'Security-focused exchange, regulated in the US, good for safety-conscious users.',
    pros: ['Strong security measures', 'Regulated (NYDFS)', 'Simple interface'],
    cons: ['Limited coin selection', 'Can have higher fees depending on usage'],
    beginner_friendly: true,
    logo: 'https://via.placeholder.com/48/00DCFA/000000?text=G' // Placeholder
  },
  {
    name: 'Crypto.com',
    url: 'https://crypto.com',
    description: 'Offers a wide range of cryptocurrencies and features, including a popular Visa card.',
    pros: ['Extensive coin selection', 'Crypto-linked Visa card', 'Mobile app focused'],
    cons: ['Complex fee structure', 'Spread can be high on app trades'],
    beginner_friendly: true, // App is relatively friendly
    logo: 'https://via.placeholder.com/48/11101A/FFFFFF?text=C' // Placeholder
  },
  {
    name: 'Robinhood',
    url: 'https://robinhood.com/us/en/about/crypto/',
    description: 'Known for commission-free stock trading, also offers basic crypto buying/selling.',
    pros: ['Simple interface', 'Familiar to stock traders', 'Commission-free trades'],
    cons: ['Limited crypto features (no transfers out for many)', 'Not a dedicated crypto exchange', 'Past controversies'],
    beginner_friendly: true,
    logo: 'https://via.placeholder.com/48/00C805/FFFFFF?text=RH' // Placeholder
  },
   {
    name: 'PayPal',
    url: 'https://www.paypal.com/us/digital-wallet/manage-money/crypto',
    description: 'Allows buying, selling, and holding a few major cryptocurrencies directly within PayPal.',
    pros: ['Convenient for existing users', 'Simple process'],
    cons: ['Cannot transfer crypto out', 'Fees can be high', 'Very limited coin selection'],
    beginner_friendly: true,
    logo: 'https://via.placeholder.com/48/0070BA/FFFFFF?text=PP' // Placeholder
  },
  {
    name: 'Cash App',
    url: 'https://cash.app/help/us/en-us/topics/bitcoin',
    description: 'Popular payment app that allows buying, selling, and withdrawing Bitcoin.',
    pros: ['Easy for existing users', 'Allows Bitcoin withdrawals'],
    cons: ['Only supports Bitcoin', 'Fees apply', 'Primarily a payment app'],
    beginner_friendly: true,
    logo: 'https://via.placeholder.com/48/00D632/000000?text=CSH' // Placeholder
  },
   {
    name: 'Venmo',
    url: 'https://venmo.com/about/crypto/',
    description: 'Social payment app (owned by PayPal) offering basic crypto buying/selling features.',
    pros: ['Convenient for existing users', 'Social features'],
    cons: ['Cannot transfer crypto out', 'Fees apply', 'Limited coin selection'],
    beginner_friendly: true,
    logo: 'https://via.placeholder.com/48/008CFF/FFFFFF?text=V' // Placeholder
  }
  // Note: Binance.US could be added for US users, Kraken is another major option.
];

// New Hardware Wallets section
export const hardwareWallets: HardwareWallet[] = [
  {
    name: 'Ledger',
    url: 'https://www.ledger.com/',
    description: 'A leading hardware wallet provider offering various models (Nano S Plus, Nano X, Stax) to keep crypto keys offline.',
    features: ['Secure Element chip', 'Supports thousands of assets', 'Bluetooth connectivity (Nano X)', 'Ledger Live companion app'],
    security_focus: ['Offline key storage', 'PIN protection', 'Recovery phrase backup'],
    logo: 'https://via.placeholder.com/48/1A1A1A/FFFFFF?text=L' // Placeholder
  },
  {
    name: 'Trezor',
    url: 'https://trezor.io/',
    description: 'Another top hardware wallet brand known for its open-source approach and security focus (Model One, Model T).',
    features: ['Open-source firmware', 'Supports many assets', 'Touchscreen (Model T)', 'Password manager integration'],
    security_focus: ['Offline key storage', 'PIN protection', 'Recovery phrase backup (Shamir Backup option)'],
    logo: 'https://via.placeholder.com/48/000000/FFFFFF?text=T' // Placeholder
  }
];
