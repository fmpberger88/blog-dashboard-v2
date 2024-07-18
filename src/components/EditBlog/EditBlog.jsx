import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Editor } from '@tinymce/tinymce-react';
import { fetchBlogById, updateBlog } from '../../api.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditBlog.module.css';
import {StyledEditor, StyledFormElement} from "../../styles.jsx";
import Loading from "../Loading/Loading.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import CreateBlog from "../CreateBlog/CreateBlog.jsx";

const EditBlog = () => {
    const {blogId} = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {data, error, isLoading} = useQuery({
        queryKey: ['blog', blogId],
        queryFn: () => fetchBlogById(blogId),
        onSuccess: (data) => {
            setTitle(data.title);
            setContent(data.content);
            setIsPublished(data.isPublished);
            setImage(data.image); // Assuming image is a URL
        }
    });

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [isPublished, setIsPublished] = useState(false);

    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setContent(data.content);
            setIsPublished(data.isPublished);
            setImage(data.image); // Assuming image is a URL
        }
    }, [data]);

    const mutation = useMutation({
        mutationFn: (blog) => updateBlog(blogId, blog),
        onSuccess: () => {
            alert("Successfully updated!");
            queryClient.invalidateQueries('blogs');
            navigate(`/blog/${blogId}`);
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
        if (image && typeof image !== 'string') { // Check if image is a File object
            formData.append('image', image);
        }
        formData.append('isPublished', isPublished);
        mutation.mutate(formData);
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (error) {
        return <ErrorMessage message={error.message}/>;
    }

    return (
        <div className={styles.editBlogContainer}>
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
                <StyledFormElement>
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    {image && typeof image === 'string' && (
                        <img src={image} alt="Current Blog" className={styles.currentImage}/>
                    )}
                </StyledFormElement>
                <StyledFormElement>
                    <label htmlFor="isPublished">Publish</label>
                    <input
                        type="checkbox"
                        id="isPublished"
                        onChange={(e) => setIsPublished(e.target.checked)}
                        checked={isPublished}
                    />
                </StyledFormElement>
                <button type="submit" className={styles.submitButton}>Update Blog</button>
            </StyledEditor>
        </div>
    )
}

export default EditBlog;
