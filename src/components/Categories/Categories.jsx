import {deleteCategories, fetchCategories} from "../../api.jsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import Loading from "../Loading/Loading.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import {MainTitle, StyledButton, StyledLink} from "../../styles.jsx";
import styles from "./Categories.module.css";

const Categories = () => {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    })

    const mutation = useMutation({
        mutationFn: deleteCategories,
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
        }
    })

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <ErrorMessage message={error.message} />
    }

    const handleDelete = (categoryId) => {
        mutation.mutate(categoryId);
    }

    return (
        <div className={styles.pageContainer}>
            <MainTitle>Blog Categories</MainTitle>
            <StyledLink className={styles.createButton} to="/create-category">
                <StyledButton>New Category</StyledButton>
            </StyledLink>
            { data.map(category => (
                <div className={styles.categoriesContainer} key={category._id}>
                    <h2>{category.name}</h2>
                    <p>{category.description}</p>
                    <div className={styles.buttonContainer}>
                        {category.author.isAdmin && (
                            <>
                                <StyledLink to={`/edit-category/${category._id}`}>
                                    <StyledButton type="button">Edit</StyledButton>
                                </StyledLink>
                                <StyledButton onClick={() => handleDelete(category._id)}>Delete</StyledButton>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Categories;