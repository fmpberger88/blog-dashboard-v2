import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeBlog, unlikeBlog } from "../../api.jsx";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import styles from "./BlogLikeButton.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

const BlogLikeButton = ({ blogId, initialLikes, userId }) => {
    const [isLiked, setIsLiked] = useState(initialLikes.includes(userId));
    const [error, setError] = useState(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        setIsLiked(initialLikes.includes(userId));
    }, [initialLikes, userId]);

    const likeMutation = useMutation({
        mutationFn: () => likeBlog(blogId),
        onMutate: () => {
            setIsLiked(true);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['blog', blogId]);
        },
        onError: (error) => {
            setIsLiked(false); // Revert optimistic update
            setError(error.message);
        }
    });

    const unlikeMutation = useMutation({
        mutationFn: () => unlikeBlog(blogId),
        onMutate: () => {
            setIsLiked(false);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['blog', blogId]);
        },
        onError: (error) => {
            setIsLiked(true); // Revert optimistic update
            setError(error.message);
        }
    });

    const handleLike = () => {
        if (!isLiked) {
            likeMutation.mutate();
        }
    };

    const handleUnlike = () => {
        if (isLiked) {
            unlikeMutation.mutate();
        }
    };

    return (
        <div className={styles.likeButton}>
            {error && <ErrorMessage message={error} />}
            {isLiked ? (
                <FaHeart
                    onClick={handleUnlike}
                    className={unlikeMutation.isLoading ? styles.loading : ''}
                />
            ) : (
                <FaRegHeart
                    onClick={handleLike}
                    className={likeMutation.isLoading ? styles.loading : ''}
                />
            )}
        </div>
    );
};

export default BlogLikeButton;
