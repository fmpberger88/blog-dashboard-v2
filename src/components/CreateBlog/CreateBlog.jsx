import { useState } from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { Editor } from '@tinymce/tinymce-react';
import { createBlog, fetchCategories } from '../../api.jsx';
import { useNavigate } from 'react-router-dom';
import styles from './CreateBlog.module.css';
import {StyledEditor} from "../../styles.jsx";


const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [tags, setTags] = useState('');
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [seoKeywords, setSeoKeywords] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // fetch categories
    const { data: categories, error, isLoading: categoriesLoading } = useQuery({
        queryKey: 'categories',
        queryFn: fetchCategories
    })

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
        formData.append('categories', selectedCategories);
        formData.append('tags', tags.split(',').map(tag => tag.trim()));
        formData.append('seoTitle', seoTitle);
        formData.append('seoDescription', seoDescription);
        formData.append('seoKeywords', seoKeywords.split(',').map(keyword => keyword.trim()));
        if (image) {
            formData.append('image', image);
        }
        mutation.mutate(formData);
    };

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        selectedCategories(prev =>
            checked ? [...prev, value] : prev.filter(category => category !== value)
        );
    }

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
                <p>Please add information about the blog for Search Engine Optimization (SEO)</p>
                <div>
                    <input
                        type="text"
                        id="seoTitle"
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        placeholder="Seo Title"
                        required
                    />
                </div>
                <div>
                    <textarea
                        id="seoDescription"
                        value={seoDescription}
                        onChange={(e) => setSeoDescription(e.target.value)}
                        placeholder="SEO Description"
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="seoKeywords"
                        value={seoKeywords}
                        onChange={(e) => setSeoKeywords(e.target.value)}
                        placeholder="SEO Keywords (comma seperated"
                        required
                    />
                </div>
                <div>
                    <label>Categories:</label>
                    {categoriesLoading ? (
                        <p>Loading categories...</p>
                    ) : (
                        categories.map(category => (
                            <div>
                                <input
                                    type="checkbox"
                                    id={categories._id}
                                    value={categories._id}
                                    onChange={handleCategoryChange}
                                />
                                <label htmlFor={category._id}>{category.name}</label>
                            </div>
                        ))
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Tags (comma seperated)"
                        required
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
