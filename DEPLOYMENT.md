# 🚀 Deployment Guide for API Dashboard

This guide will help you deploy your API Dashboard application on [Render.com](https://render.com/).

## 📋 Prerequisites

- [Git](https://git-scm.com/) installed on your machine
- [GitHub](https://github.com/) or [GitLab](https://gitlab.com/) account
- [Render.com](https://render.com/) account
- Your API Dashboard code ready for deployment

## 🎯 Deployment Options

### Option 1: Manual Deployment (Recommended for beginners)

#### Step 1: Prepare Your Repository

1. **Push your code to GitHub/GitLab**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Ensure these files are in your repository:**
   - `package.json` (with correct dependencies)
   - `index.js` (main application file)
   - `render.yaml` (Render Blueprint configuration)
   - `.gitignore` (exclude node_modules, .env, etc.)

#### Step 2: Create Render Account

1. Go to [render.com](https://render.com/)
2. Sign up with your GitHub/GitLab account
3. Complete the account setup

#### Step 3: Deploy Your Application

1. **Click "New +" in Render Dashboard**
2. **Select "Web Service"**
3. **Connect your repository:**
   - Choose your GitHub/GitLab account
   - Select your API Dashboard repository
   - Click "Connect"

4. **Configure your service:**
   - **Name:** `api-dashboard` (or your preferred name)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Choose "Free" for testing, "Starter" for production

5. **Add Environment Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=your-super-secret-jwt-key-here
   MONGODB_URI=your-mongodb-connection-string
   ```

6. **Click "Create Web Service"**

### Option 2: Blueprint Deployment (Advanced)

If you have the `render.yaml` file in your repository:

1. **Click "New +" in Render Dashboard**
2. **Select "Blueprint"**
3. **Connect your repository**
4. **Render will automatically detect and configure:**
   - Web service
   - Database
   - Environment variables
5. **Click "Apply"**

## 🗄️ Database Setup

### Option A: Render MongoDB (Recommended)

1. **In Render Dashboard, click "New +"**
2. **Select "PostgreSQL" or "MongoDB"**
3. **Configure:**
   - **Name:** `api-dashboard-db`
   - **Database:** `api_dashboard`
   - **User:** `api_dashboard_user`
4. **Copy the connection string**
5. **Add to your web service environment variables:**
   ```
   MONGODB_URI=your-render-mongodb-connection-string
   ```

### Option B: MongoDB Atlas

1. **Create MongoDB Atlas account**
2. **Create a new cluster**
3. **Get connection string**
4. **Add to environment variables:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
   ```

## 🔧 Environment Variables

### Required Variables

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name

# Security
JWT_SECRET=your-super-secret-jwt-key-here

# Server
NODE_ENV=production
PORT=10000
```

### Optional Variables

```bash
# External APIs (if using)
EXTERNAL_API_KEY=your-external-api-key

# Custom configuration
SESSION_SECRET=your-session-secret
```

## 🌐 Custom Domain Setup

1. **In your Render service dashboard:**
   - Go to "Settings" tab
   - Scroll to "Custom Domains"
   - Click "Add Domain"

2. **Add your domain:**
   - Enter your domain (e.g., `api.yourdomain.com`)
   - Click "Add"

3. **Update DNS:**
   - Go to your domain registrar
   - Add CNAME record:
     - **Name:** `api` (or subdomain)
     - **Value:** `your-app-name.onrender.com`

4. **SSL Certificate:**
   - Render automatically provisions SSL certificates
   - Wait 24-48 hours for propagation

## 🔒 Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env` files to Git
- ✅ Use strong, random JWT secrets
- ✅ Rotate secrets regularly

### 2. Database Security
- ✅ Use connection strings with authentication
- ✅ Enable network access controls
- ✅ Regular backups

### 3. Application Security
- ✅ Always use HTTPS in production
- ✅ Implement rate limiting
- ✅ Validate all inputs

## 📊 Monitoring & Logs

### View Logs
1. **In Render Dashboard:**
   - Go to your service
   - Click "Logs" tab
   - View real-time logs

### Monitor Performance
1. **Metrics available:**
   - Response times
   - Error rates
   - Request volume
   - Resource usage

## 🔄 Automatic Deployments

### Enable Auto-Deploy
1. **In service settings:**
   - Go to "Settings" tab
   - Enable "Auto-Deploy"
   - Choose branch (usually `main`)

### Manual Deploy
1. **Trigger deployment:**
   - Go to "Manual Deploy" tab
   - Click "Deploy latest commit"

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Check build logs for:
- Missing dependencies
- Syntax errors
- Environment variable issues
```

#### 2. Database Connection Issues
```bash
# Verify:
- MONGODB_URI is correct
- Database is accessible
- Network permissions
```

#### 3. Application Crashes
```bash
# Check:
- Start command is correct
- Port configuration
- Environment variables
```

### Debug Steps

1. **Check Build Logs:**
   - Go to service dashboard
   - Click "Logs" tab
   - Look for error messages

2. **Verify Environment Variables:**
   - Go to "Environment" tab
   - Ensure all required variables are set

3. **Test Locally:**
   ```bash
   npm install
   npm start
   ```

## 📈 Scaling

### Free Tier Limitations
- 750 hours/month
- Sleeps after 15 minutes of inactivity
- Limited resources

### Upgrading to Paid Plans
1. **Starter Plan ($7/month):**
   - Always on
   - Better performance
   - Custom domains

2. **Standard Plan ($25/month):**
   - More resources
   - Better reliability
   - Priority support

## 🎉 Success!

Once deployed, your API Dashboard will be available at:
```
https://your-app-name.onrender.com
```

### Next Steps
1. **Test all features:**
   - User registration/login
   - Data creation
   - API endpoints
   - File uploads

2. **Set up monitoring:**
   - Enable logging
   - Set up alerts
   - Monitor performance

3. **Optimize:**
   - Database indexing
   - Caching strategies
   - Performance tuning

## 📞 Support

- **Render Documentation:** [docs.render.com](https://docs.render.com/)
- **Render Support:** [render.com/support](https://render.com/support)
- **Community:** [Render Community](https://community.render.com/)

---

**Happy Deploying! 🚀**
