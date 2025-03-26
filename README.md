# Task Management Frontend (task-management-fe)

## Overview
The **Task Management Frontend** (`task-management-fe`) is a React-based application that provides a user-friendly interface for managing tasks. It integrates with a backend API to handle task creation, updating, deletion, and user authentication.

## Features
- **User Authentication**: Login and logout functionality.
- **Task Management**: Create, update, delete, and view tasks.
- **Admin Dashboard**: Manage tasks and users (if applicable).
- **State Management**: Uses Redux for efficient state handling.
- **Notifications**: Displays success/error messages using toast notifications.
- **Responsive UI**: Designed with Tailwind CSS for a seamless user experience across devices.

## Tech Stack
- **Frontend**: React.js, Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Backend Integration**: Fetch API / Axios
- **Deployment**: AWS ec2 manual deployment (NGINX HTTP SERVER)

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.x)
- npm or yarn

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/task-management-fe.git
   cd task-management-fe
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```

## Project Structure
```
📂 task-management-fe
│-- 📂 src
│   │-- 📂 components  # Reusable UI components
│   │   │-- AdminTasks.jsx
│   │   │-- Body.jsx
│   │   │-- CreateTask.jsx
│   │   │-- Footer.jsx
│   │   │-- Login.jsx
│   │   │-- Navbar.jsx
│   │   │-- Task.jsx
│   │   │-- Tasks.jsx
│   │-- 📂 utils
│   │   │-- appStore.js
│   │   │-- constants.js
│   │   │-- tasksSlice.js
│   │   │-- userSlice.js
│   │-- 📜 App.jsx     # Main app component
│   │-- 📜 index.css   # Global styles
│   │-- 📜 index.html  # Main HTML file
│   │-- 📜 main.js     # Entry point
│-- 📜 .env            # Environment variables
│-- 📜 .gitignore      # Git ignore file
│-- 📜 eslint.config.js # ESLint configuration
│-- 📜 package.json    # Project dependencies
│-- 📜 package-lock.json # Dependency lock file
│-- 📜 postcss.config.js # PostCSS configuration
│-- 📜 README.md       # Project documentation
│-- 📜 tailwind.config.js  # Tailwind CSS configuration
```

## Usage
- **Creating a Task**: Navigate to the "Create Task" page, fill in the form, and submit.
- **Editing a Task**: Click on a task and modify its details.
- **Deleting a Task**: Select a task and press delete.



## Deployment
1. Build the project:
   ```sh
   npm run build  # or yarn build
   ```
2. Deploy using AWS ec2 and Nginx http server
  

## Contributing
Feel free to fork the project and submit pull requests. Ensure you follow the coding standards and commit message guidelines.

## License
This project is licensed under the MIT License.

---
Developed by **Sooraj** 🚀

