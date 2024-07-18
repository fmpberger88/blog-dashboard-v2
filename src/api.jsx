import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const handleError = (error) => {
    if (error.response) {
        console.error(`Error: ${error.response.status} - ${error.response.data.message}`);
        throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
        console.error('Error: No response received from server');
        throw new Error('No response received from server');
    } else {
        console.error('Error:', error.message);
        throw new Error(error.message);
    }
};

export const fetchBlogs = async () => {
    try {
        const response = await axiosInstance.get('/blogs');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const fetchBlogById = async (id) => {
    try {
        const response = await axiosInstance.get(`/blogs/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const createBlog = async (blog) => {
    try {
        const response = await axiosInstance.post('/blogs', blog);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateBlog = async (id, blog) => {
    try {
        const response = await axiosInstance.put(`/blogs/${id}`, blog);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteBlog = async (id) => {
    try {
        const response = await axiosInstance.delete(`/blogs/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const fetchComments = async (blogId) => {
    try {
        const response = await axiosInstance.get(`/comments/${blogId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const createComment = async (blogId, comment) => {
    try {
        const response = await axiosInstance.post(`/comments/${blogId}`, comment);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteComment = async (commentId) => {
    try {
        const response = await axiosInstance.delete(`/comments/${commentId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const fetchUserBlogs = async () => {
    try {
        const response = await axiosInstance.get('/blogs/users-blogs');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const publishBlog = async (id) => {
    try {
        const response = await axiosInstance.put(`/blogs/${id}/publish`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
