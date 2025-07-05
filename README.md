# 🎰 Betting Frontend – Aviator & Color Games

This is a modern betting frontend built with **Next.js**, featuring two popular games: **Aviator** and **Color Betting**. Designed with performance, responsiveness, and Web3 compatibility in mind.

## 🚀 Features

- 🎮 Aviator betting game
- 🎨 Color betting game (e.g., red/green/blue)
- ⚡️ Fast & SEO-friendly frontend using Next.js
- 🪙 Web3 wallet integration (MetaMask, WalletConnect, etc.)
- 📈 Real-time updates via WebSockets
- 📱 Fully responsive UI
- 🎨 Modern design using Tailwind CSS (or your preferred styling library)

## 🧱 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **State Management:** Zustand / Redux (based on your implementation)
- **Web3:** Wagmi / Ethers.js / Web3.js
- **Styling:** Tailwind CSS / Styled Components
- **Realtime:** Socket.IO / WebSocket (depending on backend)
- **Deployment:** Vercel / Netlify / Custom (your choice)

## 📂 Project Structure

- **/components → Reusable UI components**
- **/pages → Next.js pages for each route**
- **/public → Static assets**
- **/styles → Global and component-level styles**
- **/utils → Helper functions and constants**
- **/game/aviator → Aviator game components and logic**
- **/game/color → Color betting game components and logic**

## ⚙️ Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/betting-frontend.git
cd betting-frontend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env.local
# Update the .env.local file with your backend/socket/web3 config

# 4. Run the development server
npm run dev
```

## 🕹 Game Descriptions
### ✈️ Aviator
Place bets before the plane flies away! The longer it flies, the higher the multiplier — but don’t wait too long or you’ll lose your bet.

### 🎨 Color Betting
Choose a color and place your bet. When the round ends, a random color is selected. Win based on matching your color to the outcome!

## 📦 Dependencies
- **next**
- **react / react-dom**
- **socket.io-client**
- **tailwindcss**
- **radix-ui**