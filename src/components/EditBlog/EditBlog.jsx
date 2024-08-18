import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Editor } from '@tinymce/tinymce-react';
import {fetchBlogById, fetchCategories, updateBlog} from '../../api.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditBlog.module.css';
import {
    CharactersLeft,
    CreateContainer,
    InputError,
    StyledButton,
    StyledEditor,
    StyledFormElement, StyledLink
} from "../../styles.jsx";
import Loading from "../Loading/Loading.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import SuccessMessage from "../SuccessMesssage/SuccessMessage.jsx";

const EditBlog = () => {
    const {blogId} = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {data: blogData, error: blogError, isLoading: blogLoading} = useQuery({
        queryKey: ['blog', blogId],
        queryFn: () => fetchBlogById(blogId),
        onSuccess: (blogData) => {
            setTitle(blogData.title);
            setContent(blogData.content);
            setSelectedCategories(blogData.categories.map(category => category._id));
            setTags(blogData.tags.join(', ')); // Ensure tags are set as a string
            setSeoTitle(blogData.seoTitle);
            setSeoDescription(blogData.seoDescription);
            setSeoKeywords(blogData.seoKeywords.join(', ')); // Ensure keywords are set as a string
            setIsPublished(blogData.isPublished);
            setImage(blogData.image);
        }
    });

    const { data: categories, error: categoriesError, isLoading: categoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories
    });

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [tags, setTags] = useState('');
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [seoKeywords, setSeoKeywords] = useState('');
    const [image, setImage] = useState(null);
    const [isPublished, setIsPublished] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (blogData) {
            setTitle(blogData.title);
            setContent(blogData.content);
            setSelectedCategories(blogData.categories.map(category => category._id));
            setTags(blogData.tags.join(', ')); // Ensure tags are set as a string
            setSeoTitle(blogData.seoTitle);
            setSeoDescription(blogData.seoDescription);
            setSeoKeywords(blogData.seoKeywords.join(', ')); // Ensure keywords are set as a string
            setIsPublished(blogData.isPublished);
            setImage(blogData.image); // Assuming image is a URL
        }
    }, [blogData]);

    const mutation = useMutation({
        mutationFn: (blog) => updateBlog(blogId, blog),
        onSuccess: () => {
            setSuccess("Successfully updated!");
            queryClient.invalidateQueries('blogs');
            setTimeout(() => {
                navigate(`/blog/${blogId}`);
            }, 3000);
        },
        onError: (error) => {
            setError(error.message);
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
        formData.append('categories', JSON.stringify(selectedCategories));
        formData.append('tags', JSON.stringify(tags.split(',').map(tag => tag.trim())));
        formData.append('seoTitle', seoTitle);
        formData.append('seoDescription', seoDescription);
        formData.append('seoKeywords', JSON.stringify(seoKeywords.split(',').map(keyword => keyword.trim())));
        if (image && typeof image !== 'string') { // Check if image is a File object
            formData.append('image', image);
        }
        formData.append('isPublished', isPublished);
        mutation.mutate(formData);
    };

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        setSelectedCategories(prev =>
            checked ? [...prev, value] : prev.filter(category => category !== value)
        );
    };

    if (blogLoading || categoriesLoading) {
        return <Loading />;
    }

    if (blogError || categoriesError) {
        return <ErrorMessage message={blogError ? blogError.message : categoriesError.message} />;
    }

    return (
        <CreateContainer>
            <StyledEditor onSubmit={handleSubmit}>
                {success && <SuccessMessage message={success} />}
                {error && <ErrorMessage message={error} />}
                <h1>Edit Blog</h1>
                <StyledFormElement>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter blog title"
                        maxLength={100}
                        required
                    />
                    <CharactersLeft>{100 - title.length} characters left</CharactersLeft>
                    {title.length >= 100 && (
                        <InputError>You reached the maximum of 100 characters</InputError>
                    )}
                </StyledFormElement>
                <StyledFormElement>
                    <label htmlFor="content">Content</label>
                    <Editor
                        apiKey={import.meta.env.VITE_TINY_MCE_KEY}
                        value={content}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect fontselect fontsizeselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help',
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                        onEditorChange={handleEditorChange}
                    />
                </StyledFormElement>
                <p>Please add information about the blog for Search Engine Optimization (SEO)</p>
                <StyledFormElement>
                    <label htmlFor="seoTitle">SEO Title</label>
                    <input
                        type="text"
                        id="seoTitle"
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        placeholder="Enter SEO title"
                        maxLength={60}
                        required
                    />
                    <CharactersLeft>{60 - seoTitle.length} characters left</CharactersLeft>
                    {seoTitle.length >= 60 && (
                        <InputError>You reached the maximum of 60 characters</InputError>
                    )}
                </StyledFormElement>
                <StyledFormElement>
                    <label htmlFor="seoDescription">SEO Description</label>
                    <textarea
                        id="seoDescription"
                        value={seoDescription}
                        onChange={(e) => setSeoDescription(e.target.value)}
                        maxLength={160}
                        placeholder="Enter SEO description"
                        required
                    />
                    <CharactersLeft>{160 - seoDescription.length} characters left</CharactersLeft>
                    {seoDescription.length >= 160 && (
                        <InputError>You reached the maximum of 160 characters</InputError>
                    )}
                </StyledFormElement>
                <StyledFormElement>
                    <label htmlFor="seoKeywords">SEO Keywords</label>
                    <input
                        type="text"
                        id="seoKeywords"
                        value={seoKeywords}
                        onChange={(e) => setSeoKeywords(e.target.value)}
                        placeholder="Enter SEO keywords (comma separated)"
                        required
                    />
                </StyledFormElement>
                <StyledFormElement>
                    <label>Categories</label>
                    {categories.map(category => (
                        <div key={category._id} className={styles.checkboxContainer}>
                            <input
                                type="checkbox"
                                id={category._id}
                                value={category._id}
                                onChange={handleCategoryChange}
                                checked={selectedCategories.includes(category._id)}
                            />
                            <label htmlFor={category._id}>{category.name}</label>
                        </div>
                    ))}
                </StyledFormElement>
                <StyledFormElement>
                    <label htmlFor="tags">Tags</label>
                    <input
                        type="text"
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Enter tags (comma separated)"
                        required
                    />
                </StyledFormElement>
                <StyledFormElement>
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    {image && typeof image === 'string' && (
                        <img src={image} alt="Current Blog" className={styles.currentImage} />
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
                <StyledButton type="submit">Update Blog</StyledButton>
                <StyledLink to="/user/blogs">
                    <StyledButton type="button">Cancel</StyledButton>
                </StyledLink>
            </StyledEditor>
        </CreateContainer>
    );
};

export default EditBlog;
