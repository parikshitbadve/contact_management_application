
# Contacts Management Application

## Objective
Develop a full-stack application using **Angular** and **.NET Core** to manage contact information.It allows users to perform **CRUD** (Create, Read, Update, Delete) operations on contact records


## Specifications

### Frontend Specifications
- **Framework**: Angular (Version 18.0.1)
- **Styling**: Tailwind CSS (Latest stable version)
- **State Management**: RxJS (Latest compatible version with Angular 18)
- **Forms**: Implement form handling using Angular Reactive Forms.
- **Component Communication**: Utilize `@Input()` and `@Output()` decorators for component interactions.

### Backend Specifications
- **Framework**: .NET Core (Version 8.0)
- **Data Storage**: Utilize a local JSON file as a mock database.
- **Error Handling**: Implement global error handling and return appropriate error responses to the frontend.

## Functional Requirements
### CRUD Operations
- **Create, Read, Update, and Delete** contacts.
- Implemented additional features such as contact **search, sorting, and pagination**.

### Validation
- Implement validation for each field:
  - IDs must be unique.
  - Emails should be in the correct format.
  - First and Last names are required fields.

### Data Model
- **Id**: Auto-incrementing integer
- **FirstName**: String, required
- **LastName**: String, required
- **Email**: String, required, must be a valid email format

### Performance Considerations
The application is designed to scale with a large number of contacts by using:
- **Asynchronous operations**: This improves responsiveness when interacting with the JSON file.
- **Efficient State Management**: Using RxJS allows handling large data sets in Angular.
- **Pagination and Filtering**: Reduces the load on the frontend by fetching only the data needed for display.

## Testing
### Unit Tests (Optional)
- Write unit tests for both frontend and backend logic to ensure code quality and functionality.

### Integration Tests (Optional)
- Write integration tests to cover the main application workflows, ensuring the frontend and backend work seamlessly together.

## Documentation
### Setup Instructions

#### Prerequisites
- **Node.js** (for Angular)
-- **.NET SDK 8.0**
- **Visual Studio Code** or any other preferred IDE.
- **Swagger** is implemented for API documentation, but you can also use **Postman** or any other tool to test the API.

### Backend Setup
1. **Clone the Repository:**
   ```bash
    git clone https://github.com/parikshitbadve/contact_management_application.git
   cd contact-management-app/backend
   ```

2. **Restore Dependencies:**
   ```bash
   dotnet restore
   ```

3. **Build the Solution:**
   ```bash
   dotnet build
   ```

4. **Run the Application:**
   ```bash
   dotnet run
   ```
   The API will be available at `http://localhost:5000` or the default port set by .NET.

### Frontend Setup
1. **Navigate to the Frontend Folder:**
   ```bash
   cd contact-management-application/client
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Angular Application:**
   ```bash
   ng serve
   ```
   The application will be available at `http://localhost:4200`.

### Design Decisions
- **Layered Architecture**: Separates concerns and makes the application more maintainable and scalable.
- **Tailwind CSS**: Chosen for its flexibility and rapid styling capabilities, making it easy to style components.


## Coding Standards
- Adhere to the recommended coding standards for both Angular and C#.
- Write clean, maintainable, and well-documented code.
- Added necessary instructions for better understnding.


## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## UI Design

![image](https://github.com/user-attachments/assets/2e97a2f7-2b37-4570-b663-5c70cdf84fed)

![image](https://github.com/user-attachments/assets/808727f3-0fe3-4ade-8315-d7bc2f3574b2)

![image](https://github.com/user-attachments/assets/d2ef7940-ef29-434f-a8d9-59fd540ae47d)




