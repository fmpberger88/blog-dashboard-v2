# 📝 Blog Frontend 📝

A React-based frontend for the Blog API, providing a user-friendly interface for creating, updating, and viewing blog posts and comments.

## 🌟 Features

- ✏️ Users can create, update, and delete blog posts.
- 💬 Users can comment on blog posts.
- 📅 Blog posts and comments are displayed in a user-friendly manner.
- 🔐 Authentication and authorization using JWT tokens stored in localStorage.
- 🖼️ Users can upload images for their blog posts using Cloudinary.
- 🖥️ Rich text editing with TinyMCE.

## 🛠️ Getting Started

### Prerequisites

- 🟢 Node.js and npm installed.

### Installation

1. 📥 Clone the repository:
    ```bash
    git clone https://github.com/yourusername/blog-frontend.git
    cd blog-frontend
    ```

2. 📦 Install the dependencies:
    ```bash
    npm install
    ```

3. 🗝️ Create a `.env` file in the root directory and add your environment variables:
    ```env
    VITE_API_URL=http://localhost:5000/api/v1
    VITE_TINY_MCE_KEY=YourTinyMCEAPIKey
    ```

4. 🚀 Start the application:
    ```bash
    npm run dev
    ```

### Usage

1. 🌐 Open your browser and navigate to `http://localhost:5173`.
2. 🔑 Register a new user using the `/register` route.
3. 🔓 Log in using the `/login` route to receive a JWT token.
4. 📝 Create, update, and delete blog posts and comments.

## Project Structure

```plaintext
src/
├── api.jsx                # API interaction functions
├── components/            # React components
│   ├── AddComment/        # AddComment component
│   ├── BlogDetail/        # BlogDetail component
│   ├── Blogs/             # Blogs component
│   ├── CreateBlog/        # CreateBlog component
│   ├── EditBlog/          # EditBlog component
│   ├── SuccessMessage/      # SuccessMessage component
│   ├── Header/            # Header component
│   ├── Loading/           # Loading component
│   ├── Modal/             # Modal component
│   └── Register/          # Register component
├── styles/                # Shared styled components
│   └── styles.jsx
├── App.jsx                # Main application component
├── main.jsx               # Entry point for the React application
├── index.css              # Global CSS styles
└── routes.js              # React Router configuration
````

## Available Scripts
In the project directory, you can run:

```bash
npm run dev
```
Runs the app in the development mode. Open http://localhost:5173 to view it in the browser.
```bash
npm run build
```
Builds the app for production to the dist folder.

```bash
npm run server
```
Serves the built app from the dist folder.

## Dependencies
- react - A JavaScript library for building user interfaces.
- react-router-dom - Declarative routing for React.
- @tanstack/react-query - Hooks for fetching, caching, and updating asynchronous data in React.
- axios - Promise based HTTP client for the browser and node.js.
- tinymce - Rich text editor.
- dotenv - Loads environment variables from a .env file.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
Inspired by the need to create a modern, full-featured blog application.
Thanks to all the open-source contributors whose libraries and tools made this project possible.