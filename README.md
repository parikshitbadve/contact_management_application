Overview
This is a Contact Management API built using .NET 8.0. It allows users to perform CRUD (Create, Read, Update, Delete) operations on contact records. 
The API uses a layered architecture, with an API project, a CORE project for business logic, and an Infrastructure project for data access.

Features:
Centralized error handling middleware for consistent error responses.
Dependency Injection to manage services.
CRUD endpoints for managing contacts (GET, POST, PUT, DELETE).
Asynchronous service methods for better scalability.
Table of Contents
Installation
Project Structure
Endpoints
Error Handling
Contributing
License

Installation
Prerequisites:
.NET SDK 8.0
Visual Studio Code or any other preferred IDE.
Swagger is implimented but you can use Postman or any other tool to test the API.

Steps:

1) Clone the Repository:
   git clone https://github.com/parikshitbadve/contact_management_application.git
   cd contact-management-api

2) Restore Dependencies:
    dotnet restore
   
3) Build the Solution:
  dotnet build

4) Run the Application:
   dotnet run --project Api

This will start the API project, and you should be able to access it at http://localhost:5000 or the default port set by .NET.

Project Structure
The project is structured into three layers:

API: Handles incoming HTTP requests and returns responses.
CORE: Contains business logic, service interfaces, and models.
Infrastructure: Handles data access and interacts with external data sources (e.g., files or databases).
   
    
