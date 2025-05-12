
Crypto Intro Web App
MIT Licence 
  
The app is divided into several key sections to guide users through their crypto journey:
Technology Overview  
Explains the foundational technologies behind cryptocurrencies, such as blockchain, in simple terms.
Introduction to Cryptocurrencies  
Showcases the top 5 stablecoins and 5 additional popular cryptocurrencies.  
Each coin is presented with its official favicon and a brief description.
Wallets and Trading Platforms  
Introduces different types of wallets:  
Hot wallets (software-based)  
Cold wallets (hardware-based)
Recommends safe and reputable platforms for trading cryptocurrencies.
AI Assistant  
Powered by Google/Gemma-3-27B via Open Router.  
Provides real-time answers to user questions about purchasing, storing, and safely managing cryptocurrencies.
Tech Stack
Frontend: React  
Backend: Node.js  
AI Integration: Open Router with Google/Gemma-3-27B model  
Other: 
Favicon integration for coin visuals  
Responsive design for mobile and desktop users
Installation
To run this project locally, follow these steps:
Clone the repository:
bash
git clone https://github.com/HeyBattle1/coinscribe.git
cd crypto-intro-web-app
Install dependencies:
bash
npm install
Set up environment variables:
Create a .env file in the root directory.
Add the necessary API keys and configurations (e.g., Open Router API key):
env
OPEN_ROUTER_API_KEY=your-api-key
NODE_ENV=development
Run the application:
bash
npm start
The app will be available at https://coinmuse.tech
Usage
Explore the Technology Section: Learn about the basics of blockchain and crypto technology.  
Discover Cryptocurrencies: Browse the top 5 stablecoins and 5 popular coins, complete with descriptions and favicons.  
Learn About Wallets: Understand the difference between hot and cold wallets and how to choose one.  
Find Trading Platforms: Get recommendations for secure platforms to trade cryptocurrencies.  
Ask the AI Assistant: Use the built-in AI to answer questions about purchasing, storing, or managing crypto assets.
Project Structure
crypto-intro-web-app/
├── public/                 # Static assets (favicons, images, etc.)
├── src/                    # React source files
│   ├── components/         # Reusable React components
│   ├── pages/              # Page components (Technology, Coins, Wallets, etc.)
│   ├── ai/                 # AI assistant integration (Open Router)
│   ├── App.js              # Main app component
│   └── index.js            # Entry point
├── server/                 # Node.js backend
│   ├── routes/             # API routes
│   └── index.js            # Server entry point
├── .env                    # Environment variables (not tracked)
├── package.json            # Project dependencies and scripts
└── README.md               # This file
Contributing
Contributions are welcome! To contribute:
Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit them (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.
Please ensure your code follows the project's coding standards and includes appropriate tests.
License
This project is licensed under the MIT License. See the LICENSE file for details.
Contact
For questions or feedback, feel free to reach out:
Email: bradleeb@hesperides.info 
GitHub: HeyBattle1  
X: @rcsanalytics
