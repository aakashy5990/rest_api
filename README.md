# 🚀 API Dashboard - Complete REST API Management Platform

A comprehensive web application for creating, managing, and consuming REST APIs with user authentication, data management, and external API integration.

## ✨ Features

- **🔐 User Authentication**: Secure login system with JWT tokens
- **📊 Data Management**: Full CRUD operations for custom datasets
- **🔗 API Generation**: Automatic API endpoint generation for your data
- **🌐 External Integration**: Fetch data from third-party APIs
- **📱 Responsive Design**: Modern, mobile-friendly interface
- **🛡️ Security**: Per-user data isolation and authentication middleware
- **📚 Documentation**: Built-in comprehensive API documentation

## 🏗️ Architecture

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating engine with Bootstrap 5
- **Authentication**: JWT-based with cookie storage
- **File Uploads**: Multer middleware for handling multipart data

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn** package manager

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd RestApi
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# MongoDB Connection String
MongoUrl=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Server Port (optional, defaults to 3000)
PORT=8000

# JWT Secret (optional, defaults to a random string)
JWT_SECRET=your-secret-key-here
```

### 4. Database Setup

Ensure MongoDB is running and accessible. The application will automatically:
- Connect to the specified database
- Create necessary collections
- Set up indexes for optimal performance

### 5. Start the Application

```bash
# Development mode
npm start

# Or with nodemon for auto-restart
npm run dev
```

The application will be available at `http://localhost:8000` (or your specified PORT).

## 📁 Project Structure

```
RestApi/
├── controllers/          # Business logic controllers
│   ├── dataset.js       # Dataset management
│   ├── externalapi.js   # External API handling
│   ├── internalapi.js   # Internal API endpoints
│   └── user.js          # User authentication
├── middlewares/         # Express middleware
│   ├── auth.js          # Authentication middleware
│   └── maintenanceMiddleware.js
├── models/              # Database models
│   ├── dataset.js       # Dataset schema
│   └── user.js          # User schema
├── routes/              # API route definitions
│   ├── externalapi.js   # External API routes
│   ├── internalapi.js   # Internal API routes
│   ├── staticRoutes.js  # Static page routes
│   └── user.js          # User and dataset routes
├── service/             # Business services
│   └── auth.js          # Authentication service
├── views/               # EJS templates
│   ├── partials/        # Reusable template components
│   ├── users/           # User-specific pages
│   └── *.ejs            # Main page templates
├── public/              # Static assets
├── index.js             # Main application entry point
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## 🔧 Configuration

### MongoDB Connection

The application uses Mongoose to connect to MongoDB. Configure your connection string in the `.env` file:

```env
MongoUrl=mongodb+srv://username:password@cluster.mongodb.net/database
```

### Port Configuration

Set the server port in your `.env` file:

```env
PORT=8000
```

### File Uploads

The application automatically creates a `public/uploads` directory for file storage. Ensure the application has write permissions to this directory.

## 📚 API Documentation

### Authentication

Most endpoints require authentication. Include your JWT token in the request headers:

```http
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

### Core Endpoints

#### Dataset Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/adddata` | Create a new dataset |
| `GET` | `/api/data/{slug}` | Retrieve a dataset |
| `GET` | `/my/datasets` | List user's datasets |
| `POST` | `/my/datasets/update` | Update dataset title |
| `POST` | `/my/datasets/update-data` | Update dataset JSON data |
| `POST` | `/my/datasets/delete` | Delete a dataset |

#### External APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/external` | External API dashboard |
| `GET` | `/external/nusers` | Fetch external API data |

#### User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users` | Access local user data |
| `GET` | `/api/users/{id}` | Get specific user by ID |

### Example Usage

#### Creating a Dataset

```javascript
const formData = new FormData();
formData.append('title', 'My Sample Data');
formData.append('data', JSON.stringify({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
}));

const response = await fetch('/adddata', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log('Dataset created:', result);
```

#### Fetching a Dataset

```javascript
const response = await fetch('/api/data/my-sample-data');
const data = await response.json();
console.log('Dataset:', data);
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Data Isolation**: Users can only access their own data
- **Input Validation**: Comprehensive input sanitization
- **Rate Limiting**: Built-in rate limiting for API endpoints
- **CORS Protection**: Configurable CORS settings

## 🚀 Deployment

### Production Deployment

1. **Environment Variables**: Ensure all production environment variables are set
2. **Database**: Use a production MongoDB instance
3. **Process Manager**: Use PM2 or similar for process management
4. **Reverse Proxy**: Configure Nginx or Apache as a reverse proxy
5. **SSL**: Enable HTTPS with SSL certificates

### PM2 Configuration

```bash
# Install PM2
npm install -g pm2

# Start the application
pm2 start index.js --name "api-dashboard"

# Monitor the application
pm2 monit

# View logs
pm2 logs api-dashboard
```

### Docker Deployment

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
```

## 🧪 Testing

### Manual Testing

1. **User Registration**: Test account creation and verification
2. **Authentication**: Test login/logout functionality
3. **Data Operations**: Test CRUD operations for datasets
4. **API Endpoints**: Test all API endpoints with various data
5. **Error Handling**: Test error scenarios and edge cases

### API Testing Tools

- **Postman**: For testing API endpoints
- **Insomnia**: Alternative API testing tool
- **cURL**: Command-line API testing

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Failed

```bash
# Check MongoDB status
sudo systemctl status mongod

# Restart MongoDB
sudo systemctl restart mongod

# Check connection string format
MongoUrl=mongodb+srv://username:password@cluster.mongodb.net/database
```

#### Port Already in Use

```bash
# Find process using the port
lsof -i :8000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=8001 npm start
```

#### File Upload Issues

```bash
# Check directory permissions
ls -la public/uploads

# Fix permissions if needed
chmod 755 public/uploads
```

### Debug Mode

Enable debug logging by setting the environment variable:

```env
DEBUG=app:*
```

## 📈 Performance Optimization

### Database Optimization

- **Indexing**: Ensure proper indexes on frequently queried fields
- **Connection Pooling**: Optimize MongoDB connection settings
- **Query Optimization**: Use efficient queries and projections

### Application Optimization

- **Caching**: Implement Redis for session and data caching
- **Compression**: Enable gzip compression for responses
- **Static Assets**: Use CDN for static file delivery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Install development dependencies
npm install --save-dev

# Run in development mode
npm run dev

# Run tests
npm test

# Lint code
npm run lint
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Visit `/docs` in the application
- **Issues**: Report bugs and feature requests via GitHub Issues
- **Email**: support@apidashboard.com
- **Community**: Join our developer community forum

## 🙏 Acknowledgments

- **Express.js** team for the excellent web framework
- **MongoDB** for the powerful database
- **Bootstrap** for the beautiful UI components
- **Font Awesome** for the amazing icons

---

**Made with ❤️ for developers**

For more information, visit the [Documentation Page](/docs) in the application.