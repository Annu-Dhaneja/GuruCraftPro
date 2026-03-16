# Virtual Try - Gurucraftpro

A premium AI-Powered Design Platform and Virtual Try-On solution. This project consists of a modern Next.js frontend and a robust FastAPI backend.

## 🚀 Tech Stack

### Frontend
-   **Framework**: Next.js 15+ (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS, Shadcn UI
-   **Animations**: Framer Motion
-   **Icons**: Lucide React

### Backend
-   **Framework**: FastAPI (Python)
-   **Server**: Uvicorn
-   **AI/ML**: (Add specific ML libraries here if applicable, e.g., PyTorch, TensorFlow)

## 🛠️ Installation & Setup

### Prerequisites
-   Node.js (v18 or higher)
-   Python (v3.10 or higher)

### 1. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment:
-   **Windows**: `venv\Scripts\activate`
-   **Mac/Linux**: `source venv/bin/activate`

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the backend server:

```bash
uvicorn main:app --reload
```
The backend API will be available at `http://localhost:8000`.

### 2. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## ✨ Features
-   **AI Design Lab**: Interactive AI-powered design tools.
-   **Virtual Try-On**: (Description of the virtual try-on feature).
-   **Responsive Design**: Strictly optimized for Mobile, Tablet, and Desktop.
-   **Premium UI**: Glassmorphism, smooth animations, and modern aesthetics.

## 🌐 Deployment

### Backend (Render)
1. Set up a Web Service on Render.
2. Build Command: `pip install -r requirements.txt`
3. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables from your `.env` (including `NANO_BANANA_API_KEY`).

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel.
2. Set Environment Variable: `NEXT_PUBLIC_API_URL=https://your-render-app.onrender.com`
3. Vercel will automatically detect the Next.js project and deploy.

## 📄 License
[MIT](LICENSE)
