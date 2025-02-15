# WildSpire 🏔️

> A modern adventure activity booking platform built with Node.js and MongoDB

![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![MongoDB Version](https://img.shields.io/badge/mongodb-%3E%3D4.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🌟 Overview
WildSpire is a full-stack web application designed for discovering and booking adventure activities. Users can explore locations, leave reviews, and manage their bookings with ease.

## ✨ Key Features
- **User Authentication**: Secure login/signup with Passport.js
- **Activity Management**: Create, edit, and delete adventure activities
- **Image Handling**: Multiple image uploads with gallery view (Cloudinary)
- **Location Services**: Interactive maps with Mapbox integration
- **Review System**: User ratings and reviews for activities
- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Security**: Input validation, XSS protection, rate limiting
- **Data Persistence**: MongoDB with Mongoose ODM

## 🛠️ Built With
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Frontend**: EJS, Bootstrap 5
- **APIs**: Mapbox, Cloudinary
- **Authentication**: Passport.js
- **Security**: Helmet, Express-Rate-Limit, MongoDB-Sanitize

## 📋 Prerequisites
- **Node.js** (>= 14.x)
- **MongoDB** (>= 4.x)
- **Cloudinary Account** (for image uploads)
- **Mapbox Account** (for interactive maps)

## 🚀 Getting Started

### 1. Clone & Install
```bash
# Clone repository
git clone https://github.com/yourusername/wildspire.git
cd wildspire

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Environment Setup
1. Copy `.env.example` to `.env`:
```env
NODE_ENV=development
PORT=8080
MONGO_URI=your_mongodb_uri
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
MAP_TOKEN=your_mapbox_token
SESSION_SECRET=your_session_secret
```

## 📁 Project Structure
```
wildspire/
├── controllers/   # Route handlers
├── middleware/    # Custom middleware
├── models/        # Database schemas
├── public/        # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── routes/        # Route definitions
├── utils/         # Helper functions
└── views/         # EJS templates
```

## 🔒 Security Features
- **CSRF Protection**
- **XSS Prevention**
- **Rate Limiting**
- **Input Validation**
- **Secure Sessions**
- **Image Upload Validation**

## 🧪 Testing
Run tests with:
```bash
npm test
```

## 🚀 Deployment
WildSpire is ready for deployment on:
- **Render**
- **Heroku**
- **AWS**

## 🤝 Contributing
Contributions are welcome! To contribute:
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature-name`)
3. **Commit** your changes (`git commit -m 'Add feature'`)
4. **Push** to the branch (`git push origin feature-name`)
5. **Open a pull request**

## 🐛 Bug Reports
To report a bug, open an issue with:
- **Bug description**
- **Steps to reproduce**
- **Expected vs actual behavior**

## 📝 License
WildSpire is licensed under the **MIT License**. See [LICENSE](./LICENSE) for details.
