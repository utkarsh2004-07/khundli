# TechKundali.pro - Tech Astrology Platform

A mystical AI-powered platform that reveals your tech destiny through Tech Astrology.

## 🚀 Features

### Free Features (Currently All Free!)
- ✨ Tech Zodiac Sign & Fate Number
- 🔮 Daily Skill Horoscope
- 📊 Resume Analysis & ATS Optimization
- 🎯 Job Matching & Keyword Analysis
- 📈 Career Predictions & Roadmaps
- 💼 Interview Preparation
- 🏢 Company Compatibility
- 📝 Optimized Resume Generation

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Cloudflare Workers + TypeScript
- **Database**: Cloudflare D1 (SQLite)
- **AI**: Google Gemini 1.5 Flash
- **Auth**: JWT-based authentication
- **Deployment**: Vercel (Frontend) + Cloudflare (Backend)

## 📦 Installation

### Backend Setup

```bash
# Install dependencies
npm install

# Create D1 database
wrangler d1 create techkundali

# Update wrangler.toml with your database ID
# Run migrations
wrangler d1 execute techkundali --file=./schema.sql

# Set environment variables
wrangler secret put JWT_SECRET
wrangler secret put AI_API_KEY  # Your Gemini API key

# Deploy
wrangler deploy
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set environment variables
echo "NEXT_PUBLIC_API_BASE=https://your-worker.your-subdomain.workers.dev" > .env.local

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔧 Environment Variables

### Backend (.env)
```
JWT_SECRET=your-jwt-secret
AI_API_KEY=your-gemini-api-key
FRONTEND_URL=https://your-frontend-url.com
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_BASE=https://your-worker.your-subdomain.workers.dev
```

## 🗄️ Database Schema

```sql
-- Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  fullName TEXT NOT NULL,
  plan TEXT DEFAULT 'free',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Resume analyses table
CREATE TABLE resume_analyses (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  analysis_data TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Predictions table
CREATE TABLE predictions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  prediction_data TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `GET /api/me` - Get user info

### Resume Analysis
- `POST /api/resume-analysis` - Analyze resume
- `GET /api/resume-analyses` - Get analysis history
- `GET /api/resume-analyses/:id` - Get specific analysis

### Predictions
- `POST /api/predict` - Generate Tech Kundali
- `GET /api/predictions` - Get prediction history
- `GET /api/predictions/:id` - Get specific prediction

## 🚀 Deployment

### Backend (Cloudflare Workers)
```bash
wrangler deploy
```

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

## 📱 Pages

- `/` - Landing page
- `/signup` - User registration
- `/login` - User login
- `/dashboard` - User dashboard
- `/predict` - Generate predictions
- `/resume` - Resume analysis
- `/history` - Analysis history
- `/pricing` - Pricing (currently free)

## 🎯 Key Features

### Resume Analysis
- ATS compatibility scoring
- Keyword optimization
- Job matching analysis
- Interview preparation
- Optimized resume generation

### Tech Predictions
- Personalized career guidance
- Learning roadmaps
- Salary projections
- Company compatibility

## 🔮 AI Integration

Uses Google Gemini 1.5 Flash with custom prompts for:
- Resume analysis and optimization
- Career predictions and guidance
- Interview preparation
- Skill gap analysis

## 🛡️ Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation and sanitization

## 📊 Development

```bash
# Start backend development
npm run dev

# Start frontend development
cd frontend && npm run dev

# Run both simultaneously
npm run start-dev-full
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🎉 Launch Special

All premium features are currently **FREE** during our launch period!

---

Built with ❤️ for the tech community
