import {useState} from "react";
import {useQueryClient, useMutation} from "@tanstack/react-query";
import {createReply} from "../../api.jsx";
import styles from './AddReply.module.css';
import {StyledButton} from "../../styles.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";


const AddReply = ({ commentId }) => {
    const [text, setText] = useState("")
    const [error, setErrorMessage] = useState(null);
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (newReply) => createReply(commentId, newReply),
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', commentId]);
        },
        onError: (error) => {
            setErrorMessage(error.message);
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await mutation.mutateAsync({ text });
        setText("")
    }

    return (
        <div className={styles.addReplyContainer}>
            {error && <ErrorMessage message={error} />}
            <form onSubmit={handleSubmit} className={styles.addReplyForm}>
                <textarea
                    className={styles.addReplyTextarea}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Write a reply..."
                    required
                    minLength={5}
                />
                <StyledButton type="submit">Submit</StyledButton>
            </form>
        </div>
    );
};

export default AddReply;