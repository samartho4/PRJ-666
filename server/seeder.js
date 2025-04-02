const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Models
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@brewbeans.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10)
  }
];

const products = [
  {
    name: 'Ethiopian Yirgacheffe',
    description: 'Light-roasted Ethiopian coffee with bright acidity and floral, citrusy notes.',
    price: 14.99,
    category: 'Coffee Beans',
    image: '/images/ethiopian.jpg',
    countInStock: 10,
    rating: 4.5,
    numReviews: 12
  },
  {
    name: 'Sumatra Mandheling',
    description: 'Dark-roasted Indonesian coffee with earthy, spicy notes and low acidity.',
    price: 15.99,
    category: 'Coffee Beans',
    image: '/images/sumatra.jpg',
    countInStock: 7,
    rating: 4.0,
    numReviews: 8
  },
  {
    name: 'Colombian Supremo',
    description: 'Medium-roasted Colombian coffee with balanced flavor, sweet caramel notes and mild acidity.',
    price: 13.99,
    category: 'Coffee Beans',
    image: '/images/colombian.jpg',
    countInStock: 5,
    rating: 4.8,
    numReviews: 15
  },
  {
    name: 'Pour-Over Coffee Maker',
    description: 'Elegant glass pour-over coffee maker for a clean, refined brewing process.',
    price: 29.99,
    category: 'Equipment',
    image: '/images/pourover.jpg',
    countInStock: 11,
    rating: 4.2,
    numReviews: 10
  },
  {
    name: 'Burr Coffee Grinder',
    description: 'Premium burr grinder for consistent, precise grinding of coffee beans.',
    price: 79.99,
    category: 'Equipment',
    image: '/images/grinder.jpg',
    countInStock: 7,
    rating: 4.6,
    numReviews: 18
  }
];

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Insert new data
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Destroy data
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run script
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 