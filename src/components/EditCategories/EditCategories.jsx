import {
    CharactersLeft,
    CreateContainer,
    InputError,
    StyledButton,
    StyledEditor,
    StyledFormElement, StyledLink
} from "../../styles.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchCategoryById, updateCategories} from "../../api.jsx";
import {useEffect, useState} from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import Loading from "../Loading/Loading.jsx";
import SuccessMessage from "../SuccessMesssage/SuccessMessage.jsx";

const EditCategories = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {data: categoryData, error: categoryError, isLoading: categoryLoading } = useQuery({
        queryKey: ['category', categoryId],
        queryFn: () => fetchCategoryById(categoryId)
    });

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (categoryData) {
            setName(categoryData.name);
            setDescription(categoryData.description);
        }
    }, [categoryData]);

    const mutation = useMutation({
        mutationFn: (category) => updateCategories(categoryId, category),
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
            setSuccess('Category updated successfully');
            setError(null);
            setTimeout(() => {
                navigate('/categories');
            }, 3000); // Redirect after showing success message
        },
        onError: (error) => {
            setError(error.message);
            setSuccess(null);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ name, description });
    };

    if (categoryLoading) {
        return <Loading />;
    }

    return (
        <CreateContainer>
            <StyledEditor onSubmit={handleSubmit}>
                {success && <SuccessMessage message={success} />}
                {error && <ErrorMessage message={error} />}
                <h1>Edit Categories</h1>
                <StyledFormElement>
                    <label htmlFor="name">Name of Category</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={50}
                        required
                    />
                    <CharactersLeft>{50 - name.length} characters left</CharactersLeft>
                    {name.length >= 50 && (
                        <InputError>You reached the maximum of 50 characters</InputError>
                    )}
                </StyledFormElement>
                <StyledFormElement>
                    <label htmlFor="description">Description</label>
                    <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={200}
                        required
                    />
                    <CharactersLeft>{200 - description.length} characters left</CharactersLeft>
                    {description.length >= 200 && (
                        <InputError>You reached the maximum of 200 characters</InputError>
                    )}
                </StyledFormElement>
                <StyledButton type="submit">Update Category</StyledButton>
                <StyledLink to="/categories">
                    <StyledButton type="sumbit">Cancel</StyledButton>
                </StyledLink>
            </StyledEditor>
        </CreateContainer>
    )
};

export default EditCategories;
