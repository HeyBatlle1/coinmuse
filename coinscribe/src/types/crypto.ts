export interface CryptoInfo {
  id: string;
  name: string;
  symbol: string;
  description: string;
  image: string;
  currentPrice?: number;
  priceChangePercentage24h?: number;
}

export interface Exchange {
  name: string;
  url: string;
  description: string;
  pros: string[];
  cons: string[];
  beginner_friendly: boolean;
  logo: string;
}

export interface HardwareWallet {
  name: string;
  url: string;
  description: string;
  features: string[];
  security_focus: string[];
  logo: string;
}
