import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../../api.jsx";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import styles from "./Blogs.module.css";
import defaultImage from '/default_image.webp'
import {MainTitle} from "../../styles.jsx";
import { FaHeart } from 'react-icons/fa';

const Blogs = () => {
    const navigate = useNavigate();

    const { data, error, isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    })

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <ErrorMessage message={error.message} />;
    }

    return(
        <>
            <MainTitle>All published Blogs</MainTitle>
            <div className={styles.blogsContainer}>
                {data.map((blog) => (
                    <div
                        key={blog._id}
                        className={styles.blogsCard}
                        onClick={() => navigate(`/blog/${blog._id}`)}
                    >
                        {blog.image ? <img src={blog.image} alt={blog.alt} className={styles.blogsImage}/> :
                            <img src={defaultImage} alt="default Image" className={styles.blogsImage}/>}
                        <h2 className={styles.blogsTitle}><Link to={`/blog/${blog._id}`}>{blog.title}</Link></h2>
                        <div className={styles.infoContainer}>
                            <div className={styles.authorContainer}>
                                <span><strong>{blog.author.first_name} {blog.author.family_name}</strong></span>
                                <span><em>{new Date(blog.createdAt).toLocaleDateString()}</em></span>
                            </div>
                            <div className={styles.likesContainer}>
                                <FaHeart className={styles.heartIcon}/>
                                <span className={styles.likesCount}>{blog.likes.length}</span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </>

    );
};

export default Blogs;