# Frontend Presence App - Material UI & Vite.js

## Overview

This project is a frontend application designed for managing presence and various administrative tasks within an internal system. The project is built using **Vite.js** for fast development and build processes, and **Material UI** for a rich and responsive user interface. The application is modular, with clearly separated concerns for different features such as attendance tracking, employee management, and more.

### Key Features:

- **Role-Based Access Control**: Different dashboards and sidebars for Admin and Superadmin users.
- **Dynamic Routing**: Handles navigation and access control based on user roles and authentication status.
- **Form Handling**: Utilizes `react-hook-form` and `Yup` for form validation and management.
- **State Management**: Manages global state using Redux, making it easier to handle complex state logic across the app.

## How to Use

To start using the project, follow these steps:

### 1. Clone the Repository:

```bash 
git clone https://gitlab.cloudias79.com/internal-apps/presence-app/frontend-presence-app.git
cd frontend-presence-app
```

### 2. Install Dependencies:

```bash
npm install
```

### 3. Run the Development Server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

Here’s a general overview of the project structure:

```plaintext
frontend-presence-app/
├── public/                   # Public assets like favicon, images, and index.html
│   └── vite.svg
├── src/                      # Main source code for the application
│   ├── components/           # Reusable UI components
│   │   ├── Forms/            # Forms for various entities like Administrator and Employee
│   │   │   ├── Administrator/
│   │   │   └── Employee/
│   │   ├── Navigation/       # Navigation components like Sidebar and Header
│   │   ├── Copyright.jsx     # Footer component
│   │   ├── CustomButton.jsx  # Custom Button component
│   │   └── CustomModal.jsx   # Custom Modal component
│   ├── constants/            # Global constants like color schemes and messages
│   │   ├── colors.js
│   │   └── messages.js
│   ├── pages/                # Main pages of the application
│   │   ├── Administrators/
│   │   ├── Attendances/
│   │   ├── Auth/
│   │   ├── Companies/
│   │   ├── Dashboard/
│   │   ├── Departments/
│   │   ├── Employees/
│   │   ├── Holidays/
│   │   ├── Leaves/
│   │   ├── PrivateRoute/     # Components for protecting routes that require authentication
│   │   └── Settings/
    │   ├── redux/                # Redux store configuration and slices
    │   │   ├── actions.js        # Redux actions
    │   │   ├── reducers.js       # Root reducer combining all slices
    │   │   ├── selectors.js      # Selector functions for accessing state in the store
    │   │   └── store.js          # Store configuration
    │   ├── services/             # API services and utility functions
    │   │   ├── authProvider.js   # Authentication service provider
    │   │   └── axiosInstance.js  # Axios instance configuration for API calls
│   ├── styles/               # Global styles and Material UI theme configuration
│   │   └── theme.js
│   ├── App.jsx               # Main application component handling routing and layout
│   ├── main.jsx              # Entry point of the application where React is mounted to the DOM
├── .gitignore                # Git ignore file
├── index.html                # Main HTML template
├── package-lock.json         # Auto-generated file for locking dependencies versions
├── package.json              # NPM configuration file for the project
└── README.md                 # Project documentation
```

## The Idea Behind the Project

This project leverages **Vite.js** for fast builds and hot module replacement (HMR), making the development process quick and efficient. **Material UI** is used to provide a consistent, modern, and responsive user interface. By integrating Redux for state management, the application is able to manage complex state logic, while `react-hook-form` ensures that form handling is robust and easy to maintain.

## What's Next?

Now that you have a working frontend application, you can further develop it by:

- Integrating with backend services for data persistence and business logic.
- Expanding the UI/UX to meet the needs of your users.
- Implementing additional features such as reporting, notifications, and more.

For more detailed guidance, refer to the [Material UI documentation](https://mui.com/) and the [Vite.js documentation](https://vitejs.dev/).
