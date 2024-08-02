import { useState } from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { Editor } from '@tinymce/tinymce-react';
import { createBlog, fetchCategories } from '../../api.jsx';
import { useNavigate } from 'react-router-dom';
import styles from './CreateBlog.module.css';
import {
    StyledEditor,
    StyledLink,
    StyledButton,
    StyledFormElement,
    CreateContainer,
    InputError,
    CharactersLeft
} from "../../styles.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import SuccessMessage from "../SuccessMesssage/SuccessMessage.jsx";


const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [tags, setTags] = useState('');
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [seoKeywords, setSeoKeywords] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSucess] = useState(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // fetch categories
    const { data: categories, error: categoriesError, isLoading: categoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories
    })

    const mutation = useMutation({
        mutationFn: createBlog,
        onSuccess: () => {
            setSucess("Blog created successfully!");
            queryClient.invalidateQueries('blogs');
            setTimeout(() => {
                navigate('/user/blogs');
            }, 3000)
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
        if (image) {
            formData.append('image', image);
        }
        mutation.mutate(formData);
    };

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        setSelectedCategories(prev =>
            checked ? [...prev, value] : prev.filter(category => category !== value)
        );
    }

    if (categoriesError) {
        return <ErrorMessage message={error.message} />;
    }

    return (
        <CreateContainer>
            <StyledEditor onSubmit={handleSubmit}>
                {success && <SuccessMessage message={success}/>}
                {error && <ErrorMessage message={error} /> }
                <h1>Create Blog</h1>
                <StyledFormElement>
                    <label htmlFor="title">Blog Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter blog title"
                        maxLength={100}
                        required
                    />
                    {/* Display the amount of characters left */}
                    <CharactersLeft>{100 - title.length} characters left.</CharactersLeft>
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
                    {/* Display the amount of characters left */}
                    <CharactersLeft>{60 - seoTitle.length} characters left.</CharactersLeft>
                    {seoTitle.length >=60 && (
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
                    {/* Display the amount of characters left */}
                    <CharactersLeft>{160 - seoDescription.length} characters left.</CharactersLeft>
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
                    {categoriesLoading ? (
                        <p>Loading categories...</p>
                    ) : (
                        categories.map(category => (
                            <div key={category._id} className={styles.checkboxContainer}>
                                <input
                                    type="checkbox"
                                    id={category._id}
                                    value={category._id}
                                    onChange={handleCategoryChange}
                                />
                                <label htmlFor={category._id}>{category.name}</label>
                            </div>
                        ))
                    )}
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
                </StyledFormElement>
                <StyledButton type="submit">Create Blog</StyledButton>
                <StyledLink to="/user/blogs">
                    <StyledButton type="button">Cancel</StyledButton>
                </StyledLink>
            </StyledEditor>
        </CreateContainer>
    );
};

export default CreateBlog;
