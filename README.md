# ⌛ Chronos

**Chronos** is a high-performance, aesthetically-driven time tracking and focus management dashboard. It combines modern 3D visualizations with advanced AI analytics to help you reclaim your schedule and master your focus.

![Chronos Header](https://raw.githubusercontent.com/your-username/chronos/main/public/og-image.png) *(Note: Replace with your actual OG image link)*

---

## ✨ Features

- **🚀 Immersive 3D Experience**: A high-fidelity Three.js clock and interactive elements that set the tone for deep focus.
- **📅 Chronos Grid**: A precise, intuitive weekly logging system to track every hour of your performance.
- **📊 Advanced Analytics**: Real-time data visualization using Recharts to monitor your productivity trends and time distribution.
- **🤖 AI Insights**: Leveraging **Google Gemini AI** to analyze your habits and provide actionable advice to optimize your workflow.
- **💾 Local First**: Your data is yours. Chronos uses local storage for persistence with high security and privacy in mind.
- **🎨 Premium UI**: A brutalist, dark-themed interface built with Tailwind CSS 4, focusing on minimalism and high readability.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **3D Graphics**: [Three.js](https://threejs.org/)

### Intelligence & Data
- **AI Engine**: [Google Generative AI (Gemini)](https://ai.google.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: React Hooks + LocalStorage Persistence

---

## 📂 Folder Structure

```text
chronos/
├── app/                # Next.js App Router (Pages & Layout)
├── components/         # Reusable UI Components
│   ├── grid/           # Grid-specific sub-components
│   ├── AIInsights.tsx  # Gemini AI integration
│   ├── Hero.tsx        # High-end arrival section
│   └── ThreeScene.tsx  # 3D Clock logic
├── hooks/              # Custom React hooks
├── services/           # External API integrations (Gemini)
├── utils/              # Helper functions (Date management, formatting)
├── public/             # Static assets (3D models, textures)
└── types.ts            # TypeScript definitions
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm / yarn / pnpm
- Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/chronos.git
   cd chronos
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see your local instance of Chronos.

---

## 🛡️ Privacy & Security

Chronos is built with a **Privacy-First** approach. By default, all your time logs are stored locally in your browser. AI analysis is performed by sending strictly anonymized data to the Gemini API, ensuring your personal details remain secure.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ for High Performers.
</p>
