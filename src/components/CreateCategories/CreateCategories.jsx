import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategories } from "../../api.jsx";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import {
    CharactersLeft,
    CreateContainer, InputError,
    StyledButton,
    StyledEditor,
    StyledFormElement,
    StyledLink
} from "../../styles.jsx";
import SuccessMessage from "../SuccessMesssage/SuccessMessage.jsx";

const CreateCategories = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const mutation = useMutation({
        mutationFn: createCategories,
        onSuccess: () => {
            setSuccess(`Successfully created category ${name}`)
            queryClient.invalidateQueries('categories');
            setTimeout(() => {
                navigate('/categories');
            }, 3000)
        },
        onError: (error) => {
            setError(error.message);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name,
            description,
        }
        mutation.mutate(formData);
    }

    return (
        <CreateContainer>
            <StyledEditor onSubmit={handleSubmit} >
                {success && <SuccessMessage message={success} />}
                {error && <ErrorMessage message={error} />}
                <h1>Create Category</h1>
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
                <button type="submit">Create Category</button>
                <StyledLink to="/categories">
                    <StyledButton type="button">Cancel</StyledButton>
                </StyledLink>
            </StyledEditor>
        </CreateContainer>
    )
}

export default CreateCategories;
