import os

# Define the folder and file structure
project_structure = {
    "config": ["db.js", "env.js"],
    "controllers": [
        "authController.js", "productController.js",
        "orderController.js", "userController.js", "adminController.js"
    ],
    "middleware": [
        "authMiddleware.js", "adminMiddleware.js", "errorMiddleware.js"
    ],
    "models": ["User.js", "Product.js", "Order.js", "Admin.js"],
    "routes": [
        "authRoutes.js", "productRoutes.js", "orderRoutes.js",
        "userRoutes.js", "adminRoutes.js"
    ],
    "services": [
        "authService.js", "productService.js",
        "orderService.js", "userService.js", "adminService.js"
    ],
    "utils": ["generateToken.js", "errorHandler.js", "roleValidator.js"],
    "validators": [
        "authValidator.js", "productValidator.js",
        "orderValidator.js", "userValidator.js", "adminValidator.js"
    ],
    "docs": ["swagger.yaml"],
    "tests": [
        "auth.test.js", "product.test.js",
        "order.test.js", "user.test.js", "admin.test.js"
    ]
}

# Root-level files
root_files = [
    "app.js", "server.js", "package.json", ".env", "README.md"
]

# Function to create the project structure
def create_project_structure(root_dir="vegetables-fruits-store-backend"):
    # Create the root directory
    os.makedirs(root_dir, exist_ok=True)
    
    # Create folders and files
    for folder, files in project_structure.items():
        folder_path = os.path.join(root_dir, folder)
        os.makedirs(folder_path, exist_ok=True)
        for file in files:
            open(os.path.join(folder_path, file), 'w').close()
    
    # Create root-level files
    for file in root_files:
        open(os.path.join(root_dir, file), 'w').close()
    
    print(f"✅ Project structure created successfully in '{root_dir}'!")

# Run the script
if __name__ == "__main__":
    create_project_structure()
