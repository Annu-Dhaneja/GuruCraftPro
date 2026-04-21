# Virtual Try – Gurucraftpro

Virtual Try – Gurucraftpro is a premium AI-powered design platform with Virtual Try-On capability.

The project combines a modern Next.js frontend and a scalable FastAPI backend for high-performance AI experiences.

---

# 🚀 Tech Stack

## Frontend
- Framework: Next.js 15+ (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + Shadcn UI
- Animations: Framer Motion
- Icons: Lucide React

## Backend
- Framework: FastAPI (Python)
- Server: Uvicorn
- AI/ML (optional): PyTorch / TensorFlow / OpenCV / Diffusers

---

# 📁 Project Structure

```
virtual-try-gurucraftpro
│
├── frontend
│   ├── app
│   ├── components
│   ├── lib
│   └── public
│
├── backend
│   ├── main.py
│   ├── routes
│   ├── services
│   ├── models
│   └── utils
│
└── README.md
```

---

# 🛠️ Installation & Setup

## Prerequisites
- Node.js >= 18
- Python >= 3.10
- Git

---

# 1️⃣ Backend Setup

```
cd backend
```

Create virtual environment:

```
python -m venv venv
```

Activate:

Windows:
```
venv\Scripts\activate
```

Mac/Linux:
```
source venv/bin/activate
```

Install dependencies:

```
pip install -r requirements.txt
```

Run server:

```
uvicorn main:app --reload
```

Backend runs at:
```
http://localhost:8000
```

Docs:
```
http://localhost:8000/docs
```

---

# 2️⃣ Frontend Setup

```
cd frontend
```

Install dependencies:

```
npm install
```

Run:

```
npm run dev
```

Frontend runs at:
```
http://localhost:3000
```

---

# 🔑 Environment Variables

backend/.env

```
NANO_BANANA_API_KEY=your_api_key_here
CORS_ORIGINS=http://localhost:3000
```

frontend/.env.local

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

# ✨ Features

### AI Design Lab
AI-powered design generation tools.

### Virtual Try-On
Upload image and preview:
- clothing
- accessories
- mockups

### Responsive UI
Works on mobile, tablet, desktop.

### Premium UI
Glassmorphism, smooth animations, modern UX.

### FastAPI Backend
Async endpoints and scalable structure.

---

# 🌐 Deployment

## Backend (Render)

Build:
```
pip install -r requirements.txt
```

Start:
```
uvicorn main:app --host 0.0.0.0 --port $PORT
```

Environment:
```
NANO_BANANA_API_KEY=your_key
CORS_ORIGINS=https://your-frontend-domain.vercel.app
```

---

## Frontend (Vercel)

Add environment variable:

```
NEXT_PUBLIC_API_URL=https://your-render-app.onrender.com
```

Deploy normally.

---

# 📄 License

MIT
