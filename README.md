# Swiss Driving School - Full Stack Application

A modern, full-stack web application for a Swiss driving school with an integrated admin dashboard for content management, SEO optimization, and analytics.

## 🏗️ Project Structure

```
swiss-driving-school/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js/Express backend
│   ├── admin/              # Admin dashboard (React)
│   │   ├── src/
│   │   │   ├── components/ # Admin UI components
│   │   │   ├── pages/      # Admin pages
│   │   │   ├── contexts/   # React contexts
│   │   │   └── utils/      # Admin utilities
│   │   └── package.json
│   ├── config/             # Database and app configuration
│   ├── models/             # MongoDB/Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   ├── utils/              # Backend utilities
│   ├── server.js           # Express server entry point
│   └── package.json
└── package.json            # Root package.json (monorepo)
```

## 🚀 Features

### Frontend (Public Website)
- **Modern React Application** with TypeScript support
- **Responsive Design** with Tailwind CSS
- **Course Catalog** with detailed course information
- **Contact Forms** with validation
- **SEO Optimized** with meta tags and structured data
- **Performance Optimized** with code splitting and lazy loading

### Backend API
- **RESTful API** built with Express.js
- **MongoDB Integration** with Mongoose ODM
- **Authentication & Authorization** with JWT
- **Rate Limiting** and security middleware
- **File Upload** support for images
- **Email Integration** for contact forms
- **Analytics Tracking** and reporting

### Admin Dashboard
- **Content Management System** for website content
- **Course Management** with full CRUD operations
- **SEO Manager** with Google Schema support
- **Analytics Dashboard** with performance metrics
- **User Management** and role-based access
- **Settings Panel** for site configuration
- **Real-time Updates** with React Query

## 🛠️ Technology Stack

### Frontend
- **React 18** with Hooks and Context API
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Hook Form** for form handling
- **Zod** for validation
- **Vite** for build tooling

### Backend
- **Node.js** runtime
- **Express.js** web framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Helmet** for security
- **Compression** for performance
- **Rate Limiting** for API protection

### Admin Dashboard
- **React 18** with modern hooks
- **React Query** for data fetching
- **Headless UI** for accessible components
- **Heroicons** for icons
- **Tailwind CSS** for styling
- **React Hook Form + Zod** for forms

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB** (local or cloud instance)
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/swiss-driving-school.git
cd swiss-driving-school
```

### 2. Install Dependencies
```bash
# Install all dependencies for all workspaces
npm run install:all
```

### 3. Environment Configuration

Create environment files:

**Backend (.env)**
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/swiss-driving-school

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Admin User
ADMIN_EMAIL=admin@swissdrivingschool.com
ADMIN_PASSWORD=admin123

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

### 4. Start Development Servers

**Option 1: Start all services at once**
```bash
npm run dev
```

**Option 2: Start services individually**
```bash
# Terminal 1 - Backend API
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend

# Terminal 3 - Admin Dashboard
npm run dev:admin
```

### 5. Access the Applications

- **Frontend (Public Website)**: http://localhost:5173
- **Admin Dashboard**: http://localhost:3001
- **Backend API**: http://localhost:3000

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - Admin login
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - Logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Content Management
- `GET /api/content` - Get all content
- `POST /api/content` - Create new content
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content
- `PATCH /api/content/:id/toggle` - Toggle content status

### Course Management
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `GET /api/courses/:slug` - Get course by slug

### SEO Management
- `GET /api/seo` - Get SEO settings
- `PUT /api/seo/:page` - Update page SEO
- `GET /api/seo/sitemap` - Generate sitemap data
- `GET /api/seo/robots` - Generate robots.txt

## 🔧 Development

### Code Style
- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for git hooks (optional)

### Testing
```bash
# Run all tests
npm run test

# Run frontend tests
npm run test:frontend

# Run backend tests
npm run test:backend
```

### Linting
```bash
# Lint all code
npm run lint

# Lint frontend
npm run lint:frontend

# Lint admin dashboard
npm run lint:admin
```

## 🏗️ Building for Production

### Build All Applications
```bash
npm run build
```

### Build Individual Applications
```bash
# Build frontend
npm run build:frontend

# Build admin dashboard
npm run build:admin
```

### Start Production Server
```bash
npm start
```

## 🚀 Deployment

### Environment Variables for Production

Ensure all environment variables are properly set:

- Database connection string
- JWT secrets
- Email configuration
- File upload settings
- Rate limiting configuration

### Deployment Options

1. **Traditional VPS/Server**
   - Build applications
   - Copy files to server
   - Configure reverse proxy (Nginx)
   - Set up SSL certificates
   - Configure environment variables

2. **Docker Deployment**
   - Create Dockerfiles for each service
   - Use Docker Compose for orchestration
   - Configure volumes for persistent data

3. **Cloud Platforms**
   - **Vercel/Netlify** for frontend
   - **Railway/Render** for backend
   - **MongoDB Atlas** for database

## 📊 Monitoring and Analytics

### Built-in Analytics
- Page view tracking
- User session analytics
- Course popularity metrics
- Contact form submissions
- SEO performance tracking

### External Integrations
- Google Analytics
- Google Tag Manager
- Facebook Pixel
- Search Console integration

## 🔒 Security Features

- **JWT Authentication** with refresh tokens
- **Rate Limiting** to prevent abuse
- **CORS Configuration** for cross-origin requests
- **Helmet.js** for security headers
- **Input Validation** with Zod schemas
- **SQL Injection Protection** with Mongoose
- **XSS Protection** with sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: support@swissdrivingschool.com
- Documentation: [Project Wiki](https://github.com/your-username/swiss-driving-school/wiki)
- Issues: [GitHub Issues](https://github.com/your-username/swiss-driving-school/issues)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the flexible database
- All open-source contributors who made this project possible

---

**Made with ❤️ for Swiss Driving School**

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
