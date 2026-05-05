# VibeBox - Ultra-Fast Interactive Party App

🎉 **VibeBox** is a premium, real-time interactive party app with an electric night-mode aesthetic, built with Next.js, Tailwind CSS, Framer Motion, and Supabase.

## 🎨 Features

### Core Gameplay
- **Age-Gating System**: Automatic age verification on first entry
- **Room Engine**: Host creates rooms; guests join with Name & Email
- **Real-Time Sync**: Turn-based gameplay with live player updates
- **Multiple Event Types**: Birthday, Anniversary, Friends Night, Wild Date, Family/Kids
- **Interactive Missions**: Text responses or photo uploads
- **Hall of Fame**: Final summary with game stats and best photos

### Design System
- **Premium Night Mode Aesthetic**: Dark background with electric purple, gold, and neon pink accents
- **RTL Support**: Full Hebrew interface with proper text direction
- **Glassmorphism UI**: Modern glass-effect cards and animations
- **Framer Motion Animations**: Smooth, snappy transitions for zero-lag feel

### Admin Features (Hidden Dashboard)
- Access via 5 rapid taps on app logo
- View all user emails and chat history
- Browse uploaded image gallery
- Community task suggestions

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ (App Router), React 18
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Supabase (Auth, Database, Realtime, Storage)
- **Language**: TypeScript
- **Internationalization**: Hebrew (RTL)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sqrmkrrm25-boop/Vibebox.git
cd vibebox
```

2. Install dependencies:
```bash
npm install
```

3. Configure Supabase:
```bash
cp .env.local.example .env.local
# Add your Supabase URL and Anonymous Key
```

4. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
vibebox/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with RTL support
│   ├── globals.css              # Global styles
│   └── page.tsx                 # Main entry point
├── components/                   # Reusable React components
│   ├── AgeVerification.tsx       # Age-gating component
│   └── LandingPage.tsx           # Landing page with event selection
├── lib/
│   ├── constants.ts             # Hebrew translations and config
│   └── supabase.ts              # Supabase client and helpers
├── package.json                 # Dependencies
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── .env.local.example           # Environment variables template
```

## 🎯 Database Schema

### profiles
- `id`: UUID (Primary Key)
- `email`: String
- `name`: String
- `birth_year`: Integer
- `created_at`: Timestamp

### rooms
- `id`: UUID (Primary Key)
- `code`: String (Unique, 6-char)
- `host_id`: UUID (Foreign Key)
- `mode`: Enum ('physical' | 'virtual')
- `event_type`: String
- `current_turn`: Integer
- `created_at`: Timestamp
- `updated_at`: Timestamp

### guests
- `id`: UUID (Primary Key)
- `room_id`: UUID (Foreign Key)
- `email`: String
- `name`: String
- `joined_at`: Timestamp

### game_logs
- `id`: UUID (Primary Key)
- `room_id`: UUID (Foreign Key)
- `user_id`: UUID (Foreign Key)
- `content`: String (Text or image_url)
- `task_id`: UUID (Foreign Key)
- `created_at`: Timestamp

### task_bank
- `id`: UUID (Primary Key)
- `instruction`: String (Hebrew)
- `category`: Enum ('kids' | 'adult')
- `type`: Enum ('physical' | 'virtual')
- `vibe`: Enum ('funny' | 'sexy' | 'quirky' | 'daring')
- `created_at`: Timestamp

## 🎨 Color Palette

- **Electric Purple**: `#6D28D9`
- **Gold**: `#F59E0B`
- **Neon Pink**: `#FF1493`
- **Dark Background**: `#0F0F1E`
- **Darker Background**: `#050508`

## 🌐 Internationalization

The app is built with full Hebrew support (RTL):
- All UI text in Hebrew with witty, bold tone
- Proper text direction handling
- RTL-optimized component layouts

## 📝 Initial Task Bank

Coming soon: 50+ curated Hebrew tasks across categories:
- **Funny**: Light-hearted, humorous tasks
- **Sexy**: Flirty, provocative challenges
- **Quirky**: Unique, unexpected missions
- **Daring**: Bold, adrenaline-pumping activities

## 🔒 Security & Privacy

- Age verification required for adult content
- User data encrypted and secured
- Supabase Row Level Security (RLS) for access control
- No data sharing without consent

## 📱 Performance

- Mobile-first responsive design
- Optimized animations for 60fps performance
- Lazy loading for images
- Zero-lag real-time updates with Supabase Realtime

## 🚦 Development Status

- [x] Project initialization
- [x] Age verification system
- [x] Landing page with event selection
- [ ] Room creation and joining
- [ ] Real-time turn engine
- [ ] Task bank with 50+ missions
- [ ] Admin dashboard
- [ ] Hall of Fame summary
- [ ] Photo upload to Supabase Storage
- [ ] Live chat integration

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## 📄 License

MIT License - feel free to use this project for your party needs!

## 💬 Support

For issues or questions, please open a GitHub issue or contact the development team.

---

**VibeBox** © 2026 | מה שקורה ב-VibeBox נשאר ב-VibeBox 🎉
