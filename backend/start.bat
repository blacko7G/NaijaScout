@echo off
echo ========================================
echo    NaijaScout Backend Setup Script
echo ========================================
echo.

echo 1. Creating .env file from template...
if not exist .env (
    copy env.example .env
    echo ✅ .env file created successfully!
) else (
    echo ⚠️  .env file already exists, skipping...
)
echo.

echo 2. Installing dependencies...
npm install
echo.

echo 3. Starting MongoDB (if not already running)...
echo    Please ensure MongoDB is running on your system
echo    If using MongoDB Atlas, update your .env file with the connection string
echo.

echo 4. Seeding database with sample data...
node seedData.js
echo.

echo 5. Starting the server...
echo    Server will be available at: http://localhost:5000
echo    API endpoints: http://localhost:5000/api
echo    Health check: http://localhost:5000/api/health
echo.
echo    Press Ctrl+C to stop the server
echo.

npm run dev






