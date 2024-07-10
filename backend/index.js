const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('1', 8),
    role: 'admin',
  },
  {
    id: 2,
    name: 'Regular User',
    email: 'user@gmail.com',
    password: bcrypt.hashSync('1', 8),
    role: 'user',
  },
];

const SECRET_KEY = 'YOUR_SECRET_KEY';
const REFRESH_SECRET_KEY = 'YOUR_REFRESH_SECRET_KEY';

// Generate access and refresh tokens
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
    expiresIn: '2m', // 15 minutes
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, REFRESH_SECRET_KEY, {
    expiresIn: '1d', // 7 days
  });
};

// Endpoint untuk login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  res.status(200).json({ accessToken, refreshToken });
  console.log('Login successfull')
});

// Endpoint untuk refresh token
app.post('/api/auth/refresh-token', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(403).json({ message: 'Refresh token is required' });
  }
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
    const user = users.find(u => u.id === decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const accessToken = generateAccessToken(user);
    res.status(200).json({ accessToken });
    console.log('New accessToken:', accessToken)
  } catch (err) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
});

// Middleware untuk verifikasi token
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

// Endpoint yang dilindungi
app.get('/api/admin', verifyToken, (req, res) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden: Admins only' });
  }
  res.status(200).json({ message: 'Welcome Admin' });
});

app.get('/api/user', verifyToken, (req, res) => {
  res.status(200).json({ message: `Welcome User with role: ${req.userRole}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
