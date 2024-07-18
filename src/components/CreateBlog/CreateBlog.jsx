import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Editor } from '@tinymce/tinymce-react';
import { createBlog } from '../../api.jsx';
import { useNavigate } from 'react-router-dom';
import styles from './CreateBlog.module.css';
import {StyledEditor} from "../../styles.jsx";


const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createBlog,
        onSuccess: () => {
            alert("Blog created successfully!");
            queryClient.invalidateQueries('blogs');
            navigate('/user/blogs');
        },
        onError: (error) => {
            alert(error.message);
        }
    });

    const handleEditorChange = (content, editor) => {
        setContent(content);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }
        mutation.mutate(formData);
    };

    return (
        <div className={styles.createBlogContainer}>
            <StyledEditor onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Blog Title"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <Editor
                        apiKey={import.meta.env.VITE_TINY_MCE_KEY}
                        value={content}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={handleEditorChange}
                    />
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Create Blog</button>
            </StyledEditor>
        </div>
    );
};

export default CreateBlog;
