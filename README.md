📦 vegetables-fruits-store-backend
├── 📁 config/           # Configuration files (e.g., database, environment variables)
│   ├── db.js           # Database connection setup
│   ├── env.js          # Environment variable configurations
│
├── 📁 controllers/      # Route handlers (Business logic)
│   ├── authController.js
│   ├── productController.js
│   ├── orderController.js
│   ├── userController.js
│   ├── adminController.js
│
├── 📁 middleware/       # Middleware (e.g., authentication, validation)
│   ├── authMiddleware.js
│   ├── adminMiddleware.js
│   ├── errorMiddleware.js
│
├── 📁 models/           # Database models (Prisma schema)
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   ├── Admin.js
│
├── 📁 routes/           # API route definitions
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   ├── userRoutes.js
│   ├── adminRoutes.js
│
├── 📁 services/         # Business logic services
│   ├── authService.js
│   ├── productService.js
│   ├── orderService.js
│   ├── userService.js
│   ├── adminService.js
│
├── 📁 utils/            # Utility functions
│   ├── generateToken.js
│   ├── errorHandler.js
│   ├── roleValidator.js
│
├── 📁 validators/       # Input validation schemas
│   ├── authValidator.js
│   ├── productValidator.js
│   ├── orderValidator.js
│   ├── userValidator.js
│   ├── adminValidator.js
│
├── 📁 docs/             # API Documentation (Swagger)
│   ├── swagger.yaml
│
├── 📁 tests/            # Unit and Integration Tests
│   ├── auth.test.js
│   ├── product.test.js
│   ├── order.test.js
│   ├── user.test.js
│   ├── admin.test.js
│
├── app.js              # Main application file (Express setup)
├── server.js           # Server entry point
├── package.json        # Project dependencies and scripts
├── .env               # Environment variables
└── README.md           # Project documentation