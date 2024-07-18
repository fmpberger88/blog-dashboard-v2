import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserBlogs, publishBlog } from "../../api.jsx";
import {Link, useNavigate} from "react-router-dom";
import styles from "./UserBlogs.module.css";
import Loading from "../Loading/Loading.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import defaultImage from '/default_image.webp'
import {MainTitle} from "../../styles.jsx";

const UserBlogs = () => {
    const queryClient = useQueryClient();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const { data, error, isLoading } = useQuery({
        queryKey: ['userBlogs'],
        queryFn: fetchUserBlogs,
    });

    const mutation = useMutation({
        mutationFn: (blogId) => publishBlog(blogId, token),
        onSuccess: () => {
            queryClient.invalidateQueries('userBlogs');
        }
    });
    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <ErrorMessage message={error.message} />
    }

    const handlePublish = (blogId) => {
        mutation.mutate(blogId);
    };

    return (
        <>
            <MainTitle>Your Blogs</MainTitle>
            <div className={styles.blogsContainer}>
                {data.map(blog => (
                    <div
                        key={blog._id}
                        className={styles.blogsCard}
                        onClick={() => navigate(`/blog/${blog._id}`)}
                    >
                        <h2 className={styles.blogsTitle}><Link to={`/blog/${blog._id}`}>{blog.title}</Link></h2>
                        {blog.image ? <img src={blog.image} alt={blog.alt} className={styles.blogsImage}/> :
                            <img src={defaultImage} alt="default Image" className={styles.blogsImage}/>}
                        {!blog.isPublished && (
                            <button onClick={() => handlePublish(blog._id)}
                                    className={styles.publishButton}>Publish</button>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default UserBlogs;