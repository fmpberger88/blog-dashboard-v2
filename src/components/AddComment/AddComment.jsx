import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {createComment} from "../../api.jsx";
import {useParams} from "react-router-dom";
import styles from "./AddComment.module.css";
import {StyledButton} from "../../styles.jsx";


const AddComment = () => {
    const [text, setText] = useState("");
    const { blogId } = useParams();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newComment) => createComment(blogId, newComment),
        onSuccess: () => {
            queryClient.invalidateQueries(["blogId", blogId])
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await mutation.mutateAsync({ text });
        setText("");
    }

    return (
        <div className={styles.addCommentContainer}>
            <form onSubmit={handleSubmit} className={styles.addCommentForm}>
                <textarea
                    className={styles.addCommentTextarea}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Write a comment..."
                    required
                    minLength={5}
                />
                <StyledButton type="submit">Submit</StyledButton>
            </form>
        </div>
    )
};

export default AddComment;