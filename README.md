# Billy - AI-Powered Cyberbullying Prevention Platform

Billy is an intelligent, trauma-informed platform leveraging artificial intelligence to prevent cyberbullying, provide real-time emotional support, extract evidence from screenshots, and create safe digital spaces.

---

## 🚀 Key Features

- **AI-Powered Cyberbullying Detection & Support**: Real-time conversational AI trained to provide empathetic, trauma-informed assistance using Google's Gemini models.
- **Multimodal Evidence Analysis (OCR)**: Victims can upload screenshots of abusive messages; Billy parses timestamps, handles, and abusive text automatically.
- **Emergency Escalation & Email Dispatch**: Encrypted and structured incident reporting dispatched to safety counselors and response teams via EmailJS.
- **Incident Transcript Export**: Forensic-ready download of logged chat sessions and distress indexes.
- **Anonymous Reporting**: Complete pseudonymity option to preserve victim privacy and comfort.
- **Telemetry & Transparency Dashboard**: Visualized analytics tracking incident trends, severity distributions, and case resolution rates.
- **Community Leaders Directory**: Connecting victims with peer mentors, researchers, and digital safety advocates.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18, TypeScript, Vite |
| **Routing & Code-Splitting** | React Router DOM v6 with `React.lazy` and `Suspense` |
| **Design System & UI** | Tailwind CSS, Radix UI primitives, Lucide Icons, Tremor Charts |
| **Animations** | Framer Motion |
| **Artificial Intelligence** | Google Generative AI (`@google/generative-ai` with `gemini-1.5-flash`) |
| **Session & Cloud Storage** | Firebase Firestore |
| **Incident Escalation** | EmailJS Client SDK |
| **Code Quality & Typing** | Strict TypeScript (`tsc -b`), ESLint |

---

## 📁 Refactored Project Structure

```
billy-cyberbullying-platform/
├── public/                     # Static assets & team photos
│   └── team/                  # Verified leadership portraits
├── src/
│   ├── config/                # Environment validation & app configuration
│   │   └── env.ts
│   ├── types/                 # Centralized domain TypeScript contracts
│   │   ├── chat.ts            # Chat, message, and profile types
│   │   ├── report.ts          # Incident report and escalation payloads
│   │   ├── statistics.ts      # Analytics KPI and table models
│   │   └── community.ts       # Peer leader profiles
│   ├── services/              # Domain-driven service layer
│   │   ├── gemini/            # AI chat & vision OCR services
│   │   ├── firebase/          # Firestore user profile & session logging
│   │   ├── email/             # EmailJS reporting client
│   │   └── api/               # Backend REST API client & SMS verification
│   ├── hooks/                 # Custom React hooks (useChat, useUserProfile)
│   ├── components/
│   │   ├── chat/              # Chatbot orchestrator, input, message stream, modals
│   │   ├── home/              # Hero, emergency banner, features
│   │   ├── community/         # Peer profile grid & interactive cards
│   │   ├── layout/            # Navbar, footer with crisis lifelines
│   │   ├── common/            # ErrorBoundary, LoadingSpinner
│   │   └── ui/                # Accessible Radix UI components
│   ├── pages/                 # Lazy-loaded route pages
│   │   ├── Home.tsx
│   │   ├── Chat.tsx
│   │   ├── Community.tsx
│   │   ├── Statistics.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx                # App entry with route code-splitting & error boundaries
│   └── main.tsx
├── .env.example               # Developer environment documentation
├── vite.config.ts             # Rollup chunk optimization & path aliases (@/*)
└── package.json
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**
- **Google Gemini API Key**: [Google AI Studio](https://aistudio.google.com/)
- **EmailJS Account**: [EmailJS](https://www.emailjs.com/) (for incident dispatch)

### 2. Environment Setup
Copy `.env.example` to `.env` and fill in your keys:

```bash
cp .env.example .env
```

Ensure the following keys are present:
```ini
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

### 3. Install & Run
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run strict TypeScript typecheck
npm run typecheck

# Production build with chunking
npm run build
```

---

## 🛡️ Security & Privacy Standards
- **Zero Exposed Secrets**: Leaked database connection strings have been purged from client bundles.
- **Client-Side Validation**: All environment configurations are validated at startup to avoid runtime failures.
- **Trauma-Informed Safeguards**: High distress inquiries trigger emergency helpline banners and priority support tags.
- **Forensic Report Integrity**: Transcripts record timestamps and incident details for formal school or legal filing.

---

## 👥 Core Team & Acknowledgments
- **Veerendragouda H** — Project Lead
- **Lokesh J** — Technical Director & AI Engineer
- **Sheetal Ramesh** — Research & Protocol Lead
- **S Yeswanth Sai** — Community Safety Director

*Special thanks to Google's Generative AI team for Gemini, the React/Vite open-source community, and anti-bullying advocates worldwide.*
