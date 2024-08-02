import { deleteCategories, fetchCategories } from "../../api.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../Loading/Loading.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import { MainTitle, StyledButton, StyledLink } from "../../styles.jsx";
import styles from "./Categories.module.css";
import { useState, useEffect } from "react";

const Categories = () => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null); // Benutzerobjekt speichern
    const queryClient = useQueryClient();

    // Benutzerobjekt aus localStorage abrufen und setzen
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const { data: categoriesData = [], error: categoriesError, isLoading: categoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    const mutation = useMutation({
        mutationFn: deleteCategories,
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
        },
        onError: (error) => {
            setError(error.message);
        }
    });

    if (categoriesLoading) {
        return <Loading />;
    }

    if (categoriesError) {
        return <ErrorMessage message={categoriesError.message} />;
    }

    const handleDelete = (categoryId) => {
        mutation.mutate(categoryId);
    };

    return (
        <div className={styles.pageContainer}>
            <MainTitle>Blog Categories</MainTitle>
            {error && <ErrorMessage message={error} />}
            {user && user.isAdmin ? (
                <StyledLink className={styles.createButton} to="/create-category">
                    <StyledButton>New Category</StyledButton>
                </StyledLink> ) : (
                    <></>
            )}
            {categoriesData.map((category) => (
                <div className={styles.categoriesContainer} key={category._id}>
                    <h2>{category.name}</h2>
                    <p>{category.description}</p>
                    <div className={styles.buttonContainer}>
                        {user && user.isAdmin ? ( // Prüfen, ob der Benutzer ein Admin ist
                            <>
                                <StyledLink to={`/edit-category/${category._id}`}>
                                    <StyledButton type="button">Edit</StyledButton>
                                </StyledLink>
                                <StyledButton onClick={() => handleDelete(category._id)}>Delete</StyledButton>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Categories;
