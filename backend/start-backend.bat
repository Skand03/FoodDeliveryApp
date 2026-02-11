@echo off
echo Starting Food Delivery Backend...
echo.
echo Make sure you have Java 17 or higher installed.
echo.

REM Check if Java is installed
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java 17 or higher
    pause
    exit /b 1
)

echo Java is installed. Starting the application...
echo.

REM Start the Spring Boot application
mvnw.cmd spring-boot:run

pause