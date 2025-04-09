# Brewbean's Coffee - Code Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Frontend](#frontend)
   - [Setup and Configuration](#frontend-setup-and-configuration)
   - [Key Components](#key-components)
   - [State Management](#state-management)
   - [Routing](#routing)
   - [UI Components](#ui-components)
5. [Backend](#backend)
   - [Setup and Configuration](#backend-setup-and-configuration)
   - [API Endpoints](#api-endpoints)
   - [Controllers](#controllers)
   - [Models](#models)
   - [Middleware](#middleware)
6. [Authentication](#authentication)
7. [Database](#database)
8. [Deployment](#deployment)
9. [Testing](#testing)
10. [Common Issues and Solutions](#common-issues-and-solutions)

## Project Overview

Brewbean's Coffee is a full-stack e-commerce application designed for selling premium coffee products. The platform includes user authentication, product browsing, shopping cart functionality, checkout process, order management, and an admin dashboard.

## Technology Stack

### Frontend
- **Framework**: React 19
- **Routing**: Next.js 15
- **State Management**: Context API & React Hooks
- **Styling**: Tailwind CSS with Shadcn UI
- **Form Handling**: React Hook Form with Zod validation
- **Data Visualization**: Recharts
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)

## Project Structure

The project follows a standard client-server architecture with separate directories for frontend and backend:

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

## Frontend

### Frontend Setup and Configuration

1. **Environment Setup**

   The frontend is built with Next.js 15 and requires Node.js 18+ to run. Key configuration files include:

   - `next.config.mjs`: Next.js configuration
   - `tailwind.config.js`: Tailwind CSS configuration
   - `tsconfig.json`: TypeScript configuration

2. **Dependencies**

   Key dependencies include:
   - React 19 for UI
   - Next.js 15 for routing and SSR
   - Tailwind CSS for styling
   - Shadcn UI for component library
   - React Hook Form for form handling
   - Zod for validation
   - Recharts for data visualization

3. **Starting the Frontend**

   ```bash
   cd client
   npm install
   npm run dev
   ```

   This starts the development server at http://localhost:3000

### Key Components

1. **Context Providers**

   The application uses React Context for state management:

   - `AuthContext`: Manages user authentication state
   - `CartContext`: Handles shopping cart state
   - `ThemeContext`: Manages light/dark mode preferences

   Example usage:

   ```jsx
   // AuthContext.js
   export const AuthContext = createContext();

   export const AuthProvider = ({ children }) => {
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);

     // Authentication logic here

     return (
       <AuthContext.Provider value={{ user, login, logout, register, loading }}>
         {children}
       </AuthContext.Provider>
     );
   };

   // Usage in a component
   const { user, login } = useContext(AuthContext);
   ```

2. **Layout Components**

   The application uses a consistent layout across pages:

   - `Layout`: Main layout wrapper with header, footer, and content area
   - `DashboardLayout`: Admin dashboard layout

3. **Page Components**

   Each route corresponds to a page component in the `pages` directory:

   - `index.js`: Homepage
   - `products/[id].js`: Product detail page
   - `cart.js`: Shopping cart page
   - `checkout.js`: Checkout page
   - `profile.js`: User profile page

### State Management

1. **Context API**

   The application uses React Context for global state management with custom hooks for accessing context:

   ```jsx
   // useAuth.js
   export const useAuth = () => {
     const context = useContext(AuthContext);
     if (context === undefined) {
       throw new Error('useAuth must be used within an AuthProvider');
     }
     return context;
   };
   ```

2. **Local State**

   Component-specific state is managed using React's useState and useReducer hooks:

   ```jsx
   const [quantity, setQuantity] = useState(1);
   ```

### Routing

1. **Next.js Pages Router**

   The application uses Next.js pages router for navigation:

   - Dynamic routes: `products/[id].js`
   - API routes: `pages/api/`
   - Middleware for route protection

2. **Navigation**

   Links and redirects are handled using Next.js components:

   ```jsx
   import Link from 'next/link';
   import { useRouter } from 'next/router';

   // Link example
   <Link href="/products">View Products</Link>

   // Programmatic navigation
   const router = useRouter();
   router.push('/checkout');
   ```

### UI Components

1. **Shadcn UI Components**

   The application leverages Shadcn UI for styled components:

   ```jsx
   import { Button } from '@/components/ui/button';
   import { Input } from '@/components/ui/input';

   <Button variant="primary">Add to Cart</Button>
   ```

2. **Custom Components**

   - `ProductCard`: Displays product information in a grid
   - `CartItem`: Represents an item in the shopping cart
   - `Pagination`: Handles page navigation for product listings
   - `OrderSummary`: Displays order details during checkout

3. **Form Components**

   Forms are built using React Hook Form with Zod validation:

   ```jsx
   import { useForm } from 'react-hook-form';
   import { zodResolver } from '@hookform/resolvers/zod';
   import * as z from 'zod';

   const schema = z.object({
     email: z.string().email(),
     password: z.string().min(6)
   });

   function LoginForm() {
     const { register, handleSubmit, errors } = useForm({
       resolver: zodResolver(schema)
     });

     const onSubmit = (data) => {
       // Handle form submission
     };

     return (
       <form onSubmit={handleSubmit(onSubmit)}>
         <Input {...register('email')} />
         {errors.email && <p>{errors.email.message}</p>}
         <Input type="password" {...register('password')} />
         {errors.password && <p>{errors.password.message}</p>}
         <Button type="submit">Login</Button>
       </form>
     );
   }
   ```

## Backend

### Backend Setup and Configuration

1. **Environment Setup**

   The backend requires Node.js and MongoDB. Key configuration files include:

   - `.env`: Environment variables (not included in the repository)
   - `.env.example`: Template for environment variables

   Required environment variables:
   ```
   PORT=4000
   MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/?retryWrites=true&w=majority&appName=YourAppName
   JWT_SECRET=your_jwt_secret_key
   ```

2. **Dependencies**

   Key dependencies include:
   - Express for the web server
   - Mongoose for MongoDB interactions
   - bcryptjs for password hashing
   - jsonwebtoken for JWT authentication
   - cors for CORS handling

3. **Starting the Backend**

   ```bash
   cd server
   npm install
   npm run dev
   ```

   This starts the development server at http://localhost:4000

### API Endpoints

#### User Routes (`/api/users`)

| Method | Endpoint        | Description                 | Auth Required |
|--------|----------------|-----------------------------|--------------|
| POST   | /register      | Register a new user         | No           |
| POST   | /login         | Authenticate user           | No           |
| GET    | /profile       | Get user profile            | Yes          |
| PUT    | /profile       | Update user profile         | Yes          |

#### Product Routes (`/api/products`)

| Method | Endpoint        | Description                 | Auth Required |
|--------|----------------|-----------------------------|--------------|
| GET    | /              | Get all products            | No           |
| GET    | /:id           | Get product by ID           | No           |
| POST   | /              | Create a new product        | Yes (Admin)  |
| PUT    | /:id           | Update a product            | Yes (Admin)  |
| DELETE | /:id           | Delete a product            | Yes (Admin)  |

#### Order Routes (`/api/orders`)

| Method | Endpoint        | Description                 | Auth Required |
|--------|----------------|-----------------------------|--------------|
| POST   | /              | Create a new order          | Yes          |
| GET    | /              | Get all orders (admin)      | Yes (Admin)  |
| GET    | /myorders      | Get user orders             | Yes          |
| GET    | /:id           | Get order by ID             | Yes          |
| PUT    | /:id/pay       | Update order to paid        | Yes          |
| PUT    | /:id/deliver   | Update order to delivered   | Yes (Admin)  |

### Controllers

Controllers handle the business logic for each route:

1. **User Controller**

   Key functions:
   - `registerUser`: Create a new user account
   - `loginUser`: Authenticate user and generate JWT
   - `getUserProfile`: Retrieve user profile
   - `updateUserProfile`: Update user information

2. **Product Controller**

   Key functions:
   - `getProducts`: Retrieve all products
   - `getProductById`: Get product by ID
   - `createProduct`: Create a new product
   - `updateProduct`: Update existing product
   - `deleteProduct`: Remove a product

3. **Order Controller**

   Key functions:
   - `createOrder`: Create a new order
   - `getOrderById`: Get order by ID
   - `updateOrderToPaid`: Mark order as paid
   - `updateOrderToDelivered`: Mark order as delivered
   - `getMyOrders`: Get orders for logged-in user
   - `getOrders`: Get all orders (admin)

### Models

The application uses Mongoose schemas to define data models:

1. **User Model**

   ```javascript
   const userSchema = new mongoose.Schema({
     name: { type: String, required: true },
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true },
     isAdmin: { type: Boolean, required: true, default: false },
     phone: { type: String },
     address: {
       street: { type: String },
       city: { type: String },
       state: { type: String },
       postalCode: { type: String },
       country: { type: String }
     }
   }, {
     timestamps: true
   });
   ```

2. **Product Model**

   ```javascript
   const productSchema = new mongoose.Schema({
     name: { type: String, required: true },
     description: { type: String, required: true },
     price: { type: Number, required: true },
     category: { type: String, required: true },
     image: { type: String },
     countInStock: { type: Number, default: 0 },
     rating: { type: Number, default: 0 },
     numReviews: { type: Number, default: 0 }
   }, {
     timestamps: true
   });
   ```

3. **Order Model**

   ```javascript
   const orderSchema = new mongoose.Schema({
     user: {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: 'User'
     },
     orderItems: [
       {
         name: { type: String, required: true },
         qty: { type: Number, required: true },
         image: { type: String, required: true },
         price: { type: Number, required: true },
         product: {
           type: mongoose.Schema.Types.ObjectId,
           required: true,
           ref: 'Product'
         }
       }
     ],
     shippingAddress: {
       address: { type: String, required: true },
       city: { type: String, required: true },
       postalCode: { type: String, required: true },
       country: { type: String, required: true }
     },
     paymentMethod: {
       type: String,
       required: true
     },
     paymentResult: {
       id: { type: String },
       status: { type: String },
       update_time: { type: String },
       email_address: { type: String }
     },
     taxPrice: {
       type: Number,
       required: true,
       default: 0.0
     },
     shippingPrice: {
       type: Number,
       required: true,
       default: 0.0
     },
     totalPrice: {
       type: Number,
       required: true,
       default: 0.0
     },
     isPaid: {
       type: Boolean,
       required: true,
       default: false
     },
     paidAt: {
       type: Date
     },
     isDelivered: {
       type: Boolean,
       required: true,
       default: false
     },
     deliveredAt: {
       type: Date
     }
   }, {
     timestamps: true
   });
   ```

### Middleware

1. **Auth Middleware**

   The `protect` middleware verifies the JWT token:

   ```javascript
   exports.protect = async (req, res, next) => {
     let token;

     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
       try {
         token = req.headers.authorization.split(' ')[1];
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         req.user = await User.findById(decoded.id).select('-password');
         next();
       } catch (error) {
         res.status(401).json({ message: 'Not authorized, token failed' });
       }
     }

     if (!token) {
       res.status(401).json({ message: 'Not authorized, no token' });
     }
   };
   ```

2. **Admin Middleware**

   The `admin` middleware ensures the user has admin privileges:

   ```javascript
   exports.admin = (req, res, next) => {
     if (req.user && req.user.isAdmin) {
       next();
     } else {
       res.status(401).json({ message: 'Not authorized as an admin' });
     }
   };
   ```

## Authentication

1. **JWT Authentication**

   The application uses JSON Web Tokens for authentication:

   - Tokens are generated upon login
   - Tokens expire after 30 days
   - Tokens are stored in local storage on the client

   Token generation:

   ```javascript
   const generateToken = (id) => {
     return jwt.sign({ id }, process.env.JWT_SECRET, {
       expiresIn: '30d'
     });
   };
   ```

2. **Password Security**

   Passwords are hashed using bcryptjs before storage:

   ```javascript
   // Hash password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   ```

3. **Protected Routes**

   Routes that require authentication use the `protect` middleware.

## Database

1. **MongoDB Connection**

   The application connects to MongoDB using Mongoose:

   ```javascript
   const connectDB = async () => {
     try {
       await mongoose.connect(process.env.MONGO_URI);
       console.log('MongoDB connected');
     } catch (err) {
       console.error('MongoDB connection error:', err);
       process.exit(1);
     }
   };
   ```

2. **Database Seeding**

   Sample data can be imported using the seeder script:

   ```bash
   npm run data:import    # Import sample data
   npm run data:destroy   # Remove all data
   ```

## Deployment

### Frontend Deployment

The frontend is configured for deployment with Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy using the Vercel dashboard

### Backend Deployment

The backend can be deployed to Render or similar Node.js hosting services:

1. Configure environment variables on the hosting platform
2. Set up MongoDB Atlas connection
3. Deploy the backend code

## Testing

The project includes basic testing scripts:

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd client
npm test
```

Expand test coverage as needed for your specific implementation.

## Common Issues and Solutions

1. **MongoDB Connection Issues**

   - Check that your MongoDB URI is correct
   - Ensure your IP address is whitelisted in MongoDB Atlas
   - Verify network connectivity

2. **Authentication Problems**

   - Check that JWT_SECRET is properly set
   - Ensure tokens are being correctly sent in the Authorization header
   - Verify token expiration

3. **CORS Errors**

   - Ensure the backend has CORS enabled for the frontend URL
   - Check for proper headers in API requests

4. **Environment Variable Issues**

   - Verify that all required environment variables are set
   - Check for typos in variable names
   - Restart the server after changing environment variables
