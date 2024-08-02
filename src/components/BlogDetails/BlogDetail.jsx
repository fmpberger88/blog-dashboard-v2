import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styles from './BlogDetail.module.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBlogById, deleteBlog, fetchComments, deleteComment } from '../../api.jsx';
import DOMPurify from 'dompurify';
import defaultImage from '/default_image.webp';
import Loading from '../Loading/Loading.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import Modal from '../Modal/Modal.jsx';
import AddComment from '../AddComment/AddComment.jsx';
import { Helmet } from 'react-helmet-async';
import {InputError, StyledButton} from "../../styles.jsx";

const BlogDetails = () => {
    const { blogId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const token = localStorage.getItem('token');
    const currentUserId = localStorage.getItem('userId');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);

    const { data: blogs, error: blogsError, isLoading: blogsIsLoading } = useQuery({
        queryKey: ['blog', blogId],
        queryFn: () => fetchBlogById(blogId),
    });

    const { data: comments, error: commentsError, isLoading: commentsIsLoading } = useQuery({
        queryKey: ['comment', blogId],
        queryFn: () => fetchComments(blogId),
    })

    // Delete a Blog
    const mutation = useMutation({
        mutationFn: () => deleteBlog(blogId, token),
        onSuccess: () => {
            queryClient.invalidateQueries('blogs');
            navigate('/blogs');
        },
        onError: (error) => {
            setError(error);
        }
    });

    // Delete a Comment
    const deleteMutation = useMutation({
        mutationFn: (commentId) => deleteComment(blogId, commentId),
        onSuccess: () => {
            queryClient.invalidateQueries(['comment', blogId]);
        },
        onError: (error) => {
            setError(error.message);
        }
    });

    if (blogsIsLoading || commentsIsLoading) {
        return <Loading />;
    }

    if (blogsError) {
        return <ErrorMessage message={blogsError.message} />;
    }

    if (commentsError) {
        return <ErrorMessage message={commentsError.message} />
    }

    // Delete a Blog!
    const handleDelete = () => {
        mutation.mutate();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const confirmDelete = () => {
        closeModal();
        handleDelete();
    };

    // Delete a Comment!
    const handleDeleteComment = (commentId) => {
        deleteMutation.mutate(commentId);
    };

    // Clean html-content
    const cleanContent = DOMPurify.sanitize(blogs.content);

    return (
        <div className={styles.blogContainer}>
            <Helmet>
                <title>{blogs.seoTitle}</title>
                <meta name="description" content={blogs.seoDescription} />
                <meta name="keywords" content={blogs.seoKeywords.join(', ')} />
            </Helmet>
            <h1 className={styles.blogTitle}>{blogs.title}</h1>
            <span className={styles.author}>{blogs.author.first_name} {blogs.author.family_name}</span>
            <span className={styles.published}>Published on: {new Date(blogs.createdAt).toLocaleDateString()}</span>
            {blogs.image ?
                <img
                    src={blogs.image}
                    alt={blogs.title}
                    className={styles.blogImage}
                /> :
                <img
                    src={defaultImage}
                    alt="Default Image"
                    className={styles.blogImage}
                />}
            <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: cleanContent }}
            ></div>
            <span className={styles.views}>Views: {blogs.views}</span>

            {/* Display SEO Elements */}
            <div className={styles.seoSection}>
                <h3>SEO Information</h3>
                <p><strong>SEO Title:</strong> {blogs.seoTitle}</p>
                <p><strong>SEO Description:</strong> {blogs.seoDescription}</p>
                <p><strong>SEO Keywords:</strong> {blogs.seoKeywords.join(', ')}</p>
            </div>

            {/* Display Categories */}
            <div className={styles.categorySection}>
                <h3>Categories</h3>
                {blogs.categories.length > 0 ? (
                    blogs.categories.map(category => (
                        <span key={category._id} className={styles.category}>{category.name}</span>
                    ))
                ) : (
                    <span>No categories!</span>
                )}
            </div>

            {/* Display Tags */}
            <div className={styles.tagSection}>
                <h3>Tags</h3>
                {blogs.tags.length > 0 ? (
                    blogs.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>{tag}</span>
                    ))
                ) : (
                    <span>No tags!</span>
                )}
            </div>

            <div className={styles.buttonContainer}>
                {blogs.author._id === currentUserId && (
                    <>
                        <Link to={`/update-blog/${blogId}`}>
                            <StyledButton>Edit</StyledButton>
                        </Link>
                        <StyledButton onClick={openModal}>Delete Blog</StyledButton>
                    </>
                )}
            </div>

            <h2 className={styles.commentsTitle}>Comments</h2>
            <AddComment />
            {comments.length > 0 ? comments.map(comment => (
                <div key={comment._id} className={styles.commentsCard}>
                    <p className={styles.commentsText}>{comment.text}</p>
                    <small>{new Date(comment.createdAt).toLocaleDateString()}</small>
                    <small>{comment.author ? comment.author.username : "Anonym"}</small>
                    {error && <InputError>{error}</InputError>}
                    {blogs.author._id === currentUserId && (
                        <StyledButton className={styles.deleteCommentButton} onClick={() => handleDeleteComment(comment._id)}>Delete</StyledButton>
                    )}
                </div>
            )) : (<span className={styles.commentsText}>No comments!</span>)}
            <Link to="/blogs">
                <StyledButton>Back</StyledButton>
            </Link>
            <Modal
                open={isModalOpen}
                title="Confirm Delete"
                message="Are you sure you want to delete this blog?"
                onClose={closeModal}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default BlogDetails;
