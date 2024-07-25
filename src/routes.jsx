import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "./components/Root/Root.jsx";
import Blogs from "./components/Blogs/Blogs.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import CreateBlog from "./components/CreateBlog/CreateBlog.jsx";
import BlogDetail from "./components/BlogDetails/BlogDetail.jsx";
import UserBlogs from "./components/UserBlogs/UserBlogs.jsx";
import EditBlog from "./components/EditBlog/EditBlog.jsx";
import Categories from "./components/Categories/Categories.jsx";
import CreateCategories from "./components/CreateCategories/CreateCategories.jsx";
import EditCategories from "./components/EditCategories/EditCategories.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <Navigate to="/blogs" />
            },
            {
                path: 'blogs',
                element: <Blogs />
            },
            {
                path: 'blog/:blogId',
                element: <BlogDetail />
            },
            {
                path: 'create-blog',
                element: <CreateBlog />
            },
            {
                path: 'update-blog/:blogId',
                element: <EditBlog />
            },
            {
                path: 'user/blogs',
                element: <UserBlogs />
            },
            {
                path: 'categories',
                element: <Categories/>
            },
            {
                path: 'create-category',
                element: <CreateCategories />
            },
            {
                path: 'edit-category',
                element: <EditCategories />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login />
            }
        ]
    }
]);

export default router;