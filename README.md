# Brewbean's Coffee E-commerce Platform

![Brewbean's Coffee](https://img.shields.io/badge/Brewbean's-Coffee-brown?style=for-the-badge)
![Status: In Development](https://img.shields.io/badge/Status-In%20Development-yellow?style=for-the-badge)
![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 📋 Overview

Brewbean's Coffee is a full-stack e-commerce application designed for premium coffee products. The platform allows users to browse coffee beans, equipment, and accessories, manage a shopping cart, place orders, and track delivery status. Administrators can manage products, view and update order statuses, and access sales analytics.

## ✨ Features

- **User Authentication & Profiles**
  - Registration, login, password recovery
  - User profile management
  - Order history tracking

- **Product Management**
  - Browsing by categories
  - Detailed product pages with descriptions, reviews, and ratings
  - Search functionality with filters
  
- **Shopping Experience**
  - Cart management
  - Checkout process
  - Payment integration via Stripe
  - Order tracking

- **Admin Dashboard**
  - Product inventory management
  - Order processing and status updates
  - User management
  - Sales reporting and analytics
  
## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Routing**: [Next.js 15](https://nextjs.org/)
- **State Management**: Context API & Hooks
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [Shadcn UI](https://ui.shadcn.com/)
- **Form Handling**: React Hook Form with Zod validation
- **Data Visualization**: Recharts
- **Deployment**: [Vercel](https://vercel.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Processing**: [Stripe API](https://stripe.com/)

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) instance (local or Atlas)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/<your-username>/brewbeans-coffee.git
   cd brewbeans-coffee
   ```

2. **Set Up Environment Variables**
   
   For the backend:
   ```bash
   cd server
   cp .env.example .env
   ```
   Update the `.env` file with your MongoDB connection string, JWT secret, and other required credentials.

3. **Install Dependencies**
   
   Backend:
   ```bash
   cd server
   npm install
   ```
   
   Frontend:
   ```bash
   cd client
   npm install
   ```

4. **Load Sample Data (Optional)**
   ```bash
   cd server
   npm run data:import
   ```

5. **Start Development Servers**
   
   Backend:
   ```bash
   cd server
   npm run dev
   ```
   
   Frontend:
   ```bash
   cd client
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

## 📁 Project Structure

```
brewbeans-coffee/
├── client/                    # Frontend React application
│   ├── components/            # Reusable UI components
│   ├── pages/                 # Page components
│   ├── public/                # Static assets
│   └── ...                    # Configuration files
│
└── server/                    # Backend Express application
    ├── config/                # Configuration files
    ├── controllers/           # Route controllers
    ├── middleware/            # Custom middleware
    ├── models/                # Mongoose models
    ├── routes/                # API routes
    └── ...                    # Other server files
```

## 🧪 Testing

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd client
npm test
```

## 🚢 Deployment

The application is configured for deployment with:
- Frontend: [Vercel](https://vercel.com/)
- Backend: [Render](https://render.com/) or similar Node.js hosting service
- Database: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## 📈 Roadmap

- **Phase 1** - ✅ Core functionality and MVP
- **Phase 2** - 🔄 User reviews and ratings
- **Phase 3** - 📅 Subscription service

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- Project Link: [GitHub Repository](https://github.com/samartho4/brewbeans-coffee)

---

Made with ☕ by the Brewbean's Coffee Team
