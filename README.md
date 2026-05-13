# 💎 GuruCraft Pro - Premium AI Fashion & Design Ecosystem

GuruCraft Pro is a production-grade, full-stack AI platform designed for high-end fashion consultation, virtual try-ons, and dynamic design automation. Built with a focus on luxury aesthetics and robust security, it provides a seamless bridge between creative vision and technical execution.

---

## ✨ Core Features

### 🎨 AI Design Lab
- **Virtual Try-On**: Advanced AI analysis of fit, style, and color compatibility.
- **AI Photo Editor**: Studio-quality background removal, upscaling, and relighting.
- **Outfit Generator**: Context-aware fashion generation for various styles and occasions.

### 👗 Smart Fashion Matrix
- **7-Day Wardrobe Planning**: AI-driven outfit scheduling based on gender, age, and style preferences.
- **Luxury Wardrobe Management**: Centralized repository for high-end clothing assets.

### 🛡️ Production-Grade Security
- **JWT-Based Authentication**: Secure session management for users and administrators.
- **Role-Based Access Control (RBAC)**: Strict separation between public, registered, and administrative endpoints.
- **Authenticated API Client**: Centralized `fetchWithAuth` pattern for secure frontend-backend communication.

### ⚙️ Admin Control System (CMS)
- **Dynamic Site Management**: Real-time control over landing pages, services, and blog content.
- **Project Intake Pipeline**: Professional lead management with budget and timeline tracking.
- **Email Notifications**: Instant Gmail integration for project requests and booking confirmations.

---

## 🚀 Technology Stack

### Frontend
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + Shadcn UI + Framer Motion
- **State Management**: React Hooks & Context API

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **Database**: SQLAlchemy (PostgreSQL in production, SQLite for local dev)
- **Authentication**: Python-Jose (JWT) + Passlib (Bcrypt)
- **Email Service**: SMTP (Gmail App Passwords)

---

## 🛠️ Quick Start

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# Activate venv: venv\Scripts\activate (Windows) or source venv/bin/activate (Unix)
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Deployment Configuration

### Environment Variables
**Backend (.env)**
- `DATABASE_URL`: Production PostgreSQL DSN
- `JWT_SECRET_KEY`: Secure random string
- `SMTP_EMAIL`: Sender Gmail address
- `SMTP_PASSWORD`: 16-digit Gmail App Password
- `GOOGLE_API_KEY`: Gemini AI integration key

**Frontend (.env.local)**
- `NEXT_PUBLIC_API_URL`: Your deployed backend URL

---

## 📄 License
MIT License - Developed by GuruCraft Engineering Team.
