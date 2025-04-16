# BrewBeans Coffee E-Commerce - Code Documentation

## Overview

This document provides technical documentation for developers working on the BrewBeans Coffee E-Commerce platform. It covers the codebase structure, key components, and implementation details.

## Technology Stack

### Frontend
- **Framework**: Next.js 15+
- **State Management**: React Hooks and Context API
- **Styling**: Tailwind CSS
- **API Integration**: Axios
- **Form Handling**: React Hook Form

### Backend
- **Server**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT
- **API Structure**: RESTful

## Project Structure

```
PRJ-666-main/
├── client/                 # Frontend application
│   ├── app/                # Next.js app directory
│   ├── components/         # React components
│   │   ├── chatbot/        # AI chatbot components
│   │   └── ui/             # UI components
│   ├── lib/                # Utility functions & API services
│   └── public/             # Static assets
│
└── server/                 # Backend application
    ├── config/             # Configuration files
    ├── controllers/        # Request handlers
    ├── models/             # Database models
    └── routes/             # API routes
```

## Frontend Implementation

### Component Architecture

The frontend follows a component-based architecture with:

1. **Page Components**: Located in `client/app/` directory
2. **Reusable UI Components**: Located in `client/components/ui/`
3. **Feature Components**: Located in respective feature directories

### State Management

State is managed using React Hooks and Context API:

```jsx
// Example of context setup (client/lib/context/CartContext.js)
import { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
```

### API Integration

API calls are handled using Axios with custom hook wrappers:

```jsx
// Example API service (client/lib/api/products.js)
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts() {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
```

## AI Chatbot Implementation

### Chatbot Architecture

The chatbot consists of several components:

1. **ChatbotContainer**: Main wrapper component that manages state
2. **ChatbotHeader**: Contains title and close button
3. **ChatbotMessages**: Displays conversation history
4. **ChatbotInput**: Handles user input and voice recognition

### Voice Input Implementation

Voice input uses the Web Speech API and optional Whisper ASR:

```jsx
// Simplified example from client/components/chatbot/VoiceInput.js
import { useState, useRef } from 'react';

export function VoiceInput({ onTranscript }) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };
      
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current);
        const formData = new FormData();
        formData.append('audio', audioBlob);
        
        try {
          const response = await fetch('/api/whisper', {
            method: 'POST',
            body: formData,
          });
          
          const data = await response.json();
          onTranscript(data.text);
        } catch (error) {
          console.error('Error transcribing audio:', error);
        }
        
        chunksRef.current = [];
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  return (
    <button
      onClick={isRecording ? stopRecording : startRecording}
      className={`p-2 rounded-full ${isRecording ? 'bg-red-500' : 'bg-blue-500'}`}
    >
      <MicrophoneIcon className="w-5 h-5 text-white" />
    </button>
  );
}
```

### Chatbot Response Generation

The chatbot uses either simple keyword matching or Hugging Face models:

```jsx
// Example implementation of response generation
async function generateResponse(message, useHuggingFace = false) {
  if (useHuggingFace && process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY) {
    try {
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${MODEL_ID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
          },
          body: JSON.stringify({ inputs: message }),
        }
      );
      
      const data = await response.json();
      return data[0].generated_text;
    } catch (error) {
      console.error('Error with Hugging Face API:', error);
      return fallbackResponse(message);
    }
  } else {
    return fallbackResponse(message);
  }
}

function fallbackResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return 'Hello! How can I help you with your coffee shopping today?';
  } else if (lowerMessage.includes('product') || lowerMessage.includes('coffee')) {
    return 'We have a variety of coffee products. Are you looking for beans, equipment, or accessories?';
  }
  // More keyword matching logic...
  
  return "I'm not sure how to help with that. Would you like to browse our featured products?";
}
```

## Backend Implementation

### Server Setup

```javascript
// Example from server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/products', require('./routes/product'));
app.use('/api/users', require('./routes/user'));
app.use('/api/orders', require('./routes/order'));
app.use('/api/chatbot', require('./routes/chatbot'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Database Models

```javascript
// Example from server/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['beans', 'equipment', 'accessories']
  },
  image: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: function() {
      return this.category === 'beans';
    }
  },
  roastLevel: {
    type: String,
    enum: ['light', 'medium', 'dark', 'none'],
    default: 'none'
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
```

### API Controllers

```javascript
// Example from server/controllers/productController.js
const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};
```

## Authentication

JWT-based authentication is implemented:

```javascript
// Example from server/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

exports.admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as admin' });
  }
};
```

## Whisper ASR Integration

```javascript
// Example from server/routes/whisper.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('audio'), async (req, res) => {
  try {
    const audioPath = req.file.path;
    
    // Option 1: Mock response for development
    const transcription = "How much is the Ethiopian coffee?";
    res.json({ text: transcription });
    
    // Option 2: Using Whisper API (implementation depends on setup)
    /*
    const formData = new FormData();
    formData.append('file', fs.createReadStream(audioPath));
    formData.append('model', 'whisper-1');
    
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: formData
    });
    
    const data = await response.json();
    res.json({ text: data.text });
    */
    
    // Clean up uploaded file
    fs.unlinkSync(audioPath);
  } catch (error) {
    console.error('Error transcribing audio:', error);
    res.status(500).json({ message: 'Error processing audio' });
  }
});

module.exports = router;
```

## Testing

Unit tests are implemented using Jest:

```javascript
// Example test for product API
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Product = require('../models/Product');

describe('Product API', () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_URI_TEST);
  });
  
  afterAll(async () => {
    // Disconnect from test database
    await mongoose.connection.close();
  });
  
  beforeEach(async () => {
    // Clear test database
    await Product.deleteMany({});
  });
  
  it('should get all products', async () => {
    // Add test products
    await Product.create([
      { name: 'Test Coffee 1', price: 12.99, category: 'beans', description: 'Test description', image: 'test.jpg' },
      { name: 'Test Coffee 2', price: 14.99, category: 'beans', description: 'Test description', image: 'test.jpg' }
    ]);
    
    const res = await request(app).get('/api/products');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
    expect(res.body[0]).toHaveProperty('name');
  });
});
```

## Deployment

The application is configured for deployment on various platforms:

### Frontend (Vercel/Netlify)
- Configuration in `next.config.js`
- Environment variables set in platform dashboard

### Backend (Heroku/AWS)
- Procfile for Heroku: `web: node server/index.js`
- PM2 configuration for AWS/VPS deployment

## Contributing Guidelines

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Follow code style and patterns in existing files
4. Write tests for new features
5. Submit pull request with detailed description

## Troubleshooting Common Issues

- **API Connection Issues**: Check environment variables and CORS settings
- **Database Errors**: Verify MongoDB connection string and schema validation
- **Authentication Problems**: Check JWT expiration and token verification
- **Build Failures**: Check for dependency conflicts or version issues
